import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

//import { ProductsComponent } from './products/products.component';

const appRoutes: Routes = [
/*  { path: ':id/albums',	component: ProductsComponent },
  { path: 'products',	component: ProductsComponent },
  { path: 'ru',			component: LanguageComponent,	data: { locle: 'RU' }},
  { path: 'de',			component: LanguageComponent,	data: { locle: 'DE' }},
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {};
