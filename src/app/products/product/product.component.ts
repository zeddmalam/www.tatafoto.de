import { Component, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Package } from 'app/model/Package';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	@Input('package') public package: Package;
	@Output('emitter') public emitter:EventEmitter<any> = new EventEmitter<any>();
	
	additionalPrice = 0;
	formVisible = false;

	constructor(private translate: TranslateService) {
	}

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
