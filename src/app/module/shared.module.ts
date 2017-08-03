import { NgModule } from '@angular/core';
import { OrderFormComponent } from "app/order-form/order-form.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { createTranslateLoader } from "app/app.module";
import { HttpClient } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "app/products/product/product.component";

@NgModule({
	imports: [
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		}),
		CommonModule,
		FormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule
	],
	declarations: [
		OrderFormComponent,
		ProductComponent
	],
	exports: [
		OrderFormComponent,
		ProductComponent
	]
})
export class SharedModule { }