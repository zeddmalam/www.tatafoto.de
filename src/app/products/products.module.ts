import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';
import { OrderFormComponent } from '../order-form/order-form.component';
import { AlertComponent } from '../alert/alert.component';

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
		ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ProductsComponent]
})
export class ProductsModule { }
