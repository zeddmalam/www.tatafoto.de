import * as moment from 'moment';
import { Component, HostListener } from "@angular/core";

@Component({
	template:''
})
export class HideableComponent{
	visible: boolean = true;
	lastMouseMoveTimestamp = 0;
	timerId: any;
	timerDuration = 10000;
	disableAutohide: boolean = false;


	ngOnInit() {
		this.updateAutoHide()
	}

	@HostListener('document:click', ['$event'])
	@HostListener('document:mousemove', ['$event'])
	onAutohideEvent(event) {
		event.preventDefault();
		this.updateAutoHide()
	}

	updateAutoHide() {
		let timestamp = moment().unix();

		if (timestamp === this.lastMouseMoveTimestamp || this.disableAutohide) {
			return;
		}

		this.lastMouseMoveTimestamp = timestamp;

		clearTimeout(this.timerId);

		let self = this;
		this.timerId = setTimeout(() => {
			if (self.disableAutohide) {
				self.visible = true;
				return;
			}
			self.visible = false;
		}, this.timerDuration);

		if (!this.visible) {
			this.visible = true;
		}
	}
}
