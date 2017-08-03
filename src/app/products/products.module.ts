import { NgModule } from '@angular/core';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './product/product.component';
import { AlertComponent } from '../alert/alert.component';
import { createTranslateLoader } from "app/app.module";
import { SharedModule } from "app/module/shared.module";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";

@NgModule({
  declarations: [
    ProductsComponent,
    AlertComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule,
    ProductsRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [ProductsComponent]
})
export class ProductsModule { }
