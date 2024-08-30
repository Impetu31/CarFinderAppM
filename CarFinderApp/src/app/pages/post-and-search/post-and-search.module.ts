import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostAndSearchPageRoutingModule } from './post-and-search-routing.module';

import { PostAndSearchPage } from './post-and-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostAndSearchPageRoutingModule
  ],
  declarations: [PostAndSearchPage]
})
export class PostAndSearchPageModule {}
