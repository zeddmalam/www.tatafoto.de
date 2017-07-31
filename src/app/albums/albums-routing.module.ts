import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { AlbumsComponent } from './albums.component';
import { AlbumComponent } from './album/album.component';

const appRoutes: Routes = [
  { path: 'albums',	component: AlbumsComponent }/*,
  { path: 'albums/:id',	component: AlbumComponent }*/
];

@NgModule({
  imports: [
    RouterModule.forChild( appRoutes )
  ],
  exports: [
    RouterModule
  ]
})
export class AlbumsRoutingModule {};
