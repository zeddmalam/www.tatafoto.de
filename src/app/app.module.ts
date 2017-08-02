import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeadComponent } from './head/head.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsModule }     from './products/products.module';
import { AlbumsModule }     from './albums/albums.module';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AwsService } from './service/aws.service';
import { AlbumComponent } from "app/albums/album/album.component";
import { HideableComponent } from "app/component/hideable.component";

export function createTranslateLoader(http: HttpClient) {
    //return new TranslateHttpLoader(http, './assets/i18n/', '.json');
    return new TranslateHttpLoader(http, 'https://lvczm1v4al.execute-api.eu-west-1.amazonaws.com/PROD/lang/', '');
}

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    AlbumComponent,
    HideableComponent
  ],
  imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
    ProductsModule,
    AlbumsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })],
  providers: [
    AwsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
