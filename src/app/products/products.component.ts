import { Component, OnInit, OnDestroy, Input, style, state, animate, transition, trigger, Output, EventEmitter } from '@angular/core';
import { Package }  from '../model/Package';
import { AlertComponent } from '../alert/alert.component';
import { OrderFormComponent } from '../order-form/order-form.component';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router }  from '@angular/router';
import { AwsService } from "app/service/aws.service";

@Component({
	templateUrl: './products.component.html',
	providers: [],
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
	selectedPackage: Package = null;
	formVisible: boolean = false;
	orderSentVisible: boolean = false;
	placeOrderStatus: string;
	onLangChangeSubscription: any;
	
	constructor(private router: Router, private translate: TranslateService, private awsService: AwsService) {
	}

	ngOnInit() {
		this.updateProducts();

		let self = this;
		this.translate.get('PRODUCTS.COMPONENT.SENDING_DATA').subscribe((res: string) => {
			self.placeOrderStatus = res;
		});
		this.onLangChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if(this.router.url !== '/products'){
				return;
			}
			self.updateProducts();
		});
	}

	ngOnDestroy(): void {
		this.onLangChangeSubscription.unsubscribe();
	}

	updateProducts() {
		let self = this;
		this.awsService.getProducts(this.translate.currentLang)
		.then( packages => {
			self.packages = packages;
		});
	}
	
	onEvent(event: any){
		console.log(event);
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
				console.log('send notification');
				this.awsService.sendNotification(JSON.stringify(payload, null, 2), 'Message from www.TataFoto.de')
				.then(data => {
					self.translate.get('PRODUCTS.COMPONENT.SENDING_DATA_SUCCEED').subscribe((res: string) => {
						self.placeOrderStatus = res;
					});
				}, error => {
					self.translate.get('PRODUCTS.COMPONENT.SENDING_DATA_FAILED').subscribe((res: string) => {
						self.placeOrderStatus = res;
					});
				}).catch(err => {
					console.log(err);
				});
				break;
		}
	}

}
