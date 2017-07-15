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
	providers: [HeadComponent],
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
	lambda: any = null;

	constructor(private head: HeadComponent) {
	}
	
	ngOnInit() {
		AWS.config.update({region: 'eu-west-1'});
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'eu-west-1:48a38394-ff07-4e72-b1e4-f930eda2708e'});
		this.lambda = new AWS.Lambda();

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

		this.lastMouseMoveTimestamp = timestamp;
		
		clearTimeout(this.timerId);
		
		let self = this;
		this.timerId = setTimeout(() => {
			self.headVisible = false;
		}, this.timerDuration);
		
		if(!this.head.visible){
			this.headVisible = true;
		}
	}
	
	toggleProducts() {
		
		this.lambda.invoke({
			FunctionName: "products"
		}, (err, data) => {
			console.log('products', err, JSON.parse(data.Payload));
		});
	}
}
