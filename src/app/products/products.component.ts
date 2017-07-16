import { Component, OnInit, Input, style, state, animate, transition, trigger } from '@angular/core';
import { Package }  from '../model/Package';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [   // :enter is alias to 'void => *'
				style({opacity:0}),
				animate(200, style({opacity:1})) 
			]),
			transition(':leave', [   // :leave is alias to '* => void'
				animate(200, style({opacity:0})) 
			])
		])
	]
})
export class ProductsComponent implements OnInit {
	@Input('packages') packages: any;
	@Input('visible') visible: boolean;
	
  constructor() { }

  ngOnInit() {
  }

}
