import { Component, OnInit, Input, trigger, transition, style, animate, HostListener } from '@angular/core';
import { Album } from "app/model/Album";
import { AwsService } from "app/service/aws.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { HideableComponent } from "app/component/hideable.component";
declare var jquery: any;
declare var $: any;

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP_ARROW = 38
}

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(200, style({ opacity: 0 }))
      ])
    ]),
    trigger('fadeInOut2', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(0, style({ opacity: 0, width: 0 }))
      ])
    ])
  ]
})
export class AlbumComponent extends HideableComponent implements OnInit {

  @Input('album') album;

  constructor(private route: ActivatedRoute, private location: Location, private awsService: AwsService) { 
    super();
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.awsService.getAlbum(params.get('id'));
      })
      .subscribe(album => {
        this.album = album;

        let slides = [];
        this.album.properties.photos.forEach(photo => slides.push({ src: photo }));

        $(() => {
          $('body').vegas('destroy');
          $('body').vegas({
            slides: slides,
            animation: 'random',
            delay: 10000
          })
        })
      });
		super.ngOnInit();
  }

  goBack(): void {
    $('body').vegas('destroy');
    $('body').vegas({
      slides: this.awsService.getGlobalSlides(),
      animation: 'random',
      delay: 10000
    })
    this.location.back();
  }

  prev() {
    $('body').vegas('previous');
  }

  next() {
    $('body').vegas('next');
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.next();
    } else if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.prev();
    } else if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.goBack();
    }
  }
}
