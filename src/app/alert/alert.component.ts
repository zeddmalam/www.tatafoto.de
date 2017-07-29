import { Component, OnInit, Input, style, state, animate, transition, trigger } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({opacity:0}),
				animate(200, style({opacity:1})) 
			]),
			transition(':leave', [
				animate(200, style({opacity:0})) 
			])
		])
	]
})
export class AlertComponent implements OnInit {
	_message:string;
	visible = false;
	timerId: any;
	timerDuration = 10000;

  constructor() { }

  ngOnInit() {
  }

	@Input('message')
	set message(val: string) {
		if('' === val){
			this.visible = false;
			return;
		}
		
		this._message = val;
		
		this.visible = true;
		clearTimeout(this.timerId);
		let self = this;
		this.timerId = setTimeout(() => {
			self.visible = false;
		}, this.timerDuration);
	}
}
