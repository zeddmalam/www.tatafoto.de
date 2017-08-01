import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from './albums.component';
import { AlbumComponent } from './album/album.component';
import { AlbumsRoutingModule } from './albums-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { createTranslateLoader } from "app/app.module";
import { Btoa } from "app/pipe/btoa.pipe";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    AlbumsRoutingModule,
    CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    AlbumsComponent, 
    AlbumComponent,
    Btoa
  ],
  bootstrap: [AlbumsComponent]
})
export class AlbumsModule { }
