import { Component, OnInit, style, state, animate, transition, trigger  } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
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
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
