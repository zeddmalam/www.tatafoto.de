/// <reference types="aws-sdk" /> 

import { Component, style, state, animate, transition, trigger } from '@angular/core';
import { HeadComponent } from './head/head.component';
import { ProductsComponent } from './products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
	providers: [
		HeadComponent,
		ProductsComponent
	],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [   // :enter is alias to 'void => *'
				style({opacity:0}),
				animate(1000, style({opacity:1})) 
			]),
			transition(':leave', [   // :leave is alias to '* => void'
				animate(1000, style({opacity:0})) 
			])
		])
	]
})
export class AppComponent {
	apptitle = "apptitle";
	lastMouseMoveTimestamp = 0;
	timerId: any;
	timerDuration = 10000;
	headVisible = true;
	packagesVisible = false;
	lambda: any = null;
	sns: any = null;
	packages: any = [];

	constructor(private head: HeadComponent, private products: ProductsComponent) {
	}
	
	ngOnInit() {
		AWS.config.update({region: 'eu-west-1'});
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'eu-west-1:48a38394-ff07-4e72-b1e4-f930eda2708e'});
		this.lambda = new AWS.Lambda();
		this.sns = new AWS.SNS();

		this.updateAutoHide()
  }

	mouseMove(event) {
    event.preventDefault();
		this.updateAutoHide()
  }
	
	updateAutoHide() {
		let timestamp = moment().unix();
		
		if(timestamp === this.lastMouseMoveTimestamp){
			return;
		}
		
		if(this.packagesVisible){
			this.headVisible = true;
			return;
		}

		this.lastMouseMoveTimestamp = timestamp;
		
		clearTimeout(this.timerId);
		
		let self = this;
		this.timerId = setTimeout(() => {
			if(this.packagesVisible){
				return;
			}
			self.headVisible = false;
		}, this.timerDuration);
		
		if(!this.head.visible){
			this.headVisible = true;
		}
	}
	
	toggleProducts() {
		if(this.packagesVisible){
			this.packagesVisible = false;
			return;
		}
		
		this.lambda.invoke({
			FunctionName: "products"
		}, (err, data) => {
			//console.log('products', err, JSON.parse(data.Payload));
			this.packages = JSON.parse(data.Payload).packages;
			this.packagesVisible = true;
		});
	}
	
	onEvent(event:any){
		console.log('need to send form', event);
		switch(event.type){
			case 'SUBMIT_ORDER_FORM':
				this.packagesVisible = false;
				var payload = {
					default:{
						event: event
					}
				}

				this.sns.publish({
					Message: JSON.stringify(payload, null, 2),
					Subject:"Message from www.TataFoto.de",
					TargetArn: 'arn:aws:sns:eu-west-1:596757887524:www-tatafoto-de'
				}, function (err, data) {
					console.log('publishAlarm', err, data);
					if (err) {
						console.log(err.stack);
						return;
					}

					console.log('push sent');
					console.log(data);
				});
			break;
		}
	}
}
