import { Component, OnInit, OnDestroy, Input, style, state, animate, transition, trigger, Output, EventEmitter } from '@angular/core';
import { Package }  from '../model/Package';
import { AlertComponent } from '../alert/alert.component';
import { OrderFormComponent } from '../order-form/order-form.component';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router }  from '@angular/router';
import * as AWS from 'aws-sdk';

@Component({
	templateUrl: './products.component.html',
	providers: [
		AlertComponent
	],
	styleUrls: ['./products.component.css'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({opacity:0}),
				animate(200, style({opacity:1})) 
			]),
			transition(':leave', [
				animate(200, style({opacity:0})) 
			])
		]),
		trigger('fadeInOut2', [
			transition(':enter', [
				style({opacity:0}),
				animate(250, style({opacity:1})) 
			]),
			transition(':leave', [
				animate(0, style({opacity:0, width:0})) 
			])
		])
	]
})
export class ProductsComponent implements OnInit, OnDestroy {
	@Input('packages') packages: any;
	_visible: boolean;
	@Output('emitter') emitter:EventEmitter<any> = new EventEmitter<any>();
	
	@Input('visible') set visible(value){
		this._visible = value;
		this.formVisible = false;
	}
	
	alertMessage = '';
	lambda: any = null;
	sns: any = null;
	selectedPackage: Package = null;
	formVisible: boolean = false;
	orderSentVisible: boolean = false;
	placeOrderStatus: string;
	onLangChangeSubscription: any;
	
	constructor(private router: Router, private translate: TranslateService) {
	}



	ngOnInit() {
		AWS.config.update({region: 'eu-west-1'});
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'eu-west-1:48a38394-ff07-4e72-b1e4-f930eda2708e'});
		this.lambda = new AWS.Lambda();
		this.sns = new AWS.SNS();
		this.updateProducts();

		let self = this;
		this.translate.get('PRODUCTS.COMPONENT.SENDING_DATA').subscribe((res: string) => {
			self.placeOrderStatus = res;
		});
		console.log('subscribed');
		this.onLangChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if(this.router.url !== '/products'){
				return;
			}
			self.updateProducts();
		});
	}

	ngOnDestroy(): void {
		console.log('UNsubscribed');
		this.onLangChangeSubscription.unsubscribe();
	}

	updateProducts() {
		let self = this;
		this.lambda.invoke({
			FunctionName: "products",
			Payload: JSON.stringify({locale: this.translate.currentLang})
		}, (err, data) => {
			self.packages = JSON.parse(data.Payload).packages;
		});
	}
	
	onEvent(event: any){
		switch(event.type){
			case 'SHOW_FORM':
				this.packages.forEach(pack => {
					if(pack.id !== event.package.id){
						pack.visible = false;
					}
				});
				this.formVisible = true;
				this.selectedPackage = event.package;
				break;
			case 'CANCEL_FORM':
				this.packages.forEach(pack => {
						pack.visible = true;
				});
				this.selectedPackage = null;
				this.formVisible = false;
				break;
			case 'SUBMIT_ORDER_FORM':
				this.formVisible = false;
				event.package = this.selectedPackage;
				var payload = {
					default:{
						event: event
					}
				}
				
				var self = this;

				this.orderSentVisible = true;
				this.sns.publish({
					Message: JSON.stringify(payload, null, 2),
					Subject:"Message from www.TataFoto.de",
					TargetArn: 'arn:aws:sns:eu-west-1:596757887524:www-tatafoto-de'
				}, function (err, data) {
					if (err) {
						console.log(err.stack);
						self.translate.get('PRODUCTS.COMPONENT.SENDING_DATA_FAILED').subscribe((res: string) => {
							self.placeOrderStatus = res;
						});
					} else {
						self.translate.get('PRODUCTS.COMPONENT.SENDING_DATA_SUCCEED').subscribe((res: string) => {
							self.placeOrderStatus = res;
						});
					}

				});
				break;
		}
	}

}
