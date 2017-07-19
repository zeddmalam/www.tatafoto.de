import { Component, OnInit, Input, style, state, animate, transition, trigger, Output, EventEmitter } from '@angular/core';
import { Package }  from '../model/Package';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
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
export class ProductsComponent implements OnInit {
	@Input('packages') packages: any;
	@Input('visible') visible: boolean;
	@Output('emitter') emitter:EventEmitter<any> = new EventEmitter<any>();

	selectedPackage: Package = null;
	formVisible: boolean = false;
	
  constructor() { }

  ngOnInit() {
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
				event.package = this.selectedPackage;
				this.emitter.emit(event);
				break;
		}
	}

}
