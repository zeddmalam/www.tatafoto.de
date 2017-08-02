/// <reference types="aws-sdk" /> 

import { Component, style, state, animate, transition, trigger, OnDestroy } from '@angular/core';
import { HeadComponent } from './head/head.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AwsService } from "app/service/aws.service";
import { HideableComponent } from "app/component/hideable.component";
declare var jquery: any;
declare var $: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [
		HeadComponent
	],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [   // :enter is alias to 'void => *'
				style({ opacity: 0 }),
				animate(250, style({ opacity: 1 }))
			]),
			transition(':leave', [   // :leave is alias to '* => void'
				animate(250, style({ opacity: 0 }))
			])
		])
	]
})
export class AppComponent extends HideableComponent implements OnDestroy {
	lastMouseMoveTimestamp = 0;
	timerId: any;
	timerDuration = 10000;
	visible = true;
	packagesVisible = false;
	packages: any = [];
	url: string;
	urlChangeSubscribtion: any;

	constructor(private head: HeadComponent, private router: Router, private translate: TranslateService, private awsService: AwsService) {
		super();
		translate.addLangs(["en", "ru", "de"]);
		translate.setDefaultLang('ru');
		translate.use(translate.getBrowserLang());
	}

	ngOnInit() {
		this.urlChangeSubscribtion = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.url = this.router.url;
				if (this.url === '/') {
					$(() => {
						$('body').vegas('options', 'delay', 10000).vegas('next');
					})
				} else if(/^\/albums\/\n+$/.test(this.router.url)) {
				} else {
					$(() => {
						$('body').vegas('options', 'delay', 60000).vegas('next');
					})
				}
			}
		});
		super.ngOnInit();
	}

	ngOnDestroy(): void {
		this.urlChangeSubscribtion.unsubscribe();
	}

	onLangChange(lang: string) {
		this.translate.use(lang);
	}
}
