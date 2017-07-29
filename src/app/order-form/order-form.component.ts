import { Component, OnInit, Output, EventEmitter, ViewChild, Renderer, ElementRef } from '@angular/core';
import { OrderForm } from '../model/OrderForm';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
	@Output('emitter') emitter:EventEmitter<any> = new EventEmitter<any>();
	form: OrderForm = new OrderForm();
	
	@ViewChild('email') email: ElementRef;
	@ViewChild('phone') phone: ElementRef;
	
	//formBuilder: FormBuilder;
	orderFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private renderer: Renderer, private translate: TranslateService) {
		translate.setDefaultLang('ru');
		translate.use('ru');
  }

  ngOnInit() {
		this.orderFormGroup = this.formBuilder.group({
			email:['', [
				Validators.required
			]],
			phone:['', [
				Validators.required
			]],
			comments:'',
		});
	}
	
	onSubmit() {
		if(this.orderFormGroup.valid){
			return this.emitter.emit({
				type:'SUBMIT_ORDER_FORM',
				form: this.form
			});
		}

		if(this.orderFormGroup.controls.email.invalid){
			this.orderFormGroup.controls.email.markAsTouched();
			return this.renderer.invokeElementMethod(this.email.nativeElement, 'focus');
		}
		
		if(this.orderFormGroup.controls.phone.invalid){
			this.orderFormGroup.controls.phone.markAsTouched();
			return this.renderer.invokeElementMethod(this.phone.nativeElement, 'focus');
		}
	}
	
	get diagnostic() { return JSON.stringify(this.form); }

}
