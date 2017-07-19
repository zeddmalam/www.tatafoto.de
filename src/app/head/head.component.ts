import { Component, OnInit, Input, style, state, animate, transition, trigger } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
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
export class HeadComponent implements OnInit {
  title = 'Tanya Bukhanets';
	subtitle = 'Photographer in Berlin';
	email = 'tanya@tatafoto.de';
	phone = '+49 152 59056226';
	_visible = false;

	@Input('visible')
  set visible(value) {
		this._visible = value;
  }
	
	ngOnInit() {
  }

}
