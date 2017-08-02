import { AwsService } from "app/service/aws.service";
import { Album } from "app/model/Album";
import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({opacity:0}),
				animate(200, style({opacity:1})) 
			]),
			transition(':leave', [
				animate(200, style({opacity:0})) 
			])
		]),
		trigger('fadeInOut2', [
			transition(':enter', [
				style({opacity:0}),
				animate(250, style({opacity:1})) 
			]),
			transition(':leave', [
				animate(0, style({opacity:0, width:0})) 
			])
		])
	]
})
export class AlbumsComponent implements OnInit {
  albums: any;

  constructor(private awsService: AwsService) { }

  ngOnInit() {
    let self = this;
    this.awsService.getAlbums().then(albums => {
      self.albums = albums;
    });
  }
}
