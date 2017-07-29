import { Component, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Package} from '../../model/Package';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	@Input('package') package: Package;
	@Output('emitter') emitter:EventEmitter<any> = new EventEmitter<any>();
	
	additionalPrice = 0;
	formVisible = false;

	constructor() { }

	ngOnInit() {
	}

	updatePrice() {
		this.additionalPrice++;
		this.additionalPrice = 0;
		this.package.features.forEach(feature => {
			if(feature.checked){
				this.additionalPrice += feature.price;
			}
		});
	}
	
	wantItNowClick(){
		this.formVisible = true;
		this.emitter.emit({
			type:'SHOW_FORM',
			package: this.package
		});
	}
	
	cancelClick(){
		this.formVisible = false;
		this.emitter.emit({
			type:'CANCEL_FORM',
			package: this.package
		});
	}
}
