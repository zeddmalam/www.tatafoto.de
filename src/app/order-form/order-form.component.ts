import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {OrderForm} from '../model/OrderForm';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
	@Output('emitter') emitter:EventEmitter<any> = new EventEmitter<any>();
	form: OrderForm = new OrderForm();

  constructor() { }

  ngOnInit() {
  }
	
	onSubmit() {
		this.emitter.emit({
			type:'SUBMIT_ORDER_FORM',
      form: this.form
    });
	}
	
	get diagnostic() { return JSON.stringify(this.form); }

}
