import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostAndSearchPage } from './post-and-search.page';

const routes: Routes = [
  {
    path: '',
    component: PostAndSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostAndSearchPageRoutingModule {}
