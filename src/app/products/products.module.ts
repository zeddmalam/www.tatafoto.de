import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';
import { OrderFormComponent } from '../order-form/order-form.component';
import { AlertComponent } from '../alert/alert.component';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { createTranslateLoader } from "app/app.module";

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    OrderFormComponent,
    AlertComponent
  ],
  imports: [
		ProductsRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [ProductsComponent]
})
export class ProductsModule { }
