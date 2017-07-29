import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeadComponent } from './head/head.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsModule }     from './products/products.module';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent
  ],
  imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		ProductsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
