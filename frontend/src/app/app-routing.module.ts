import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatsListComponent } from './components/cats-list/cats-list.component';
import { CatDetailsComponent } from './components/cat-details/cat-details.component';
import { AddCatComponent } from './components/add-cat/add-cat.component';

const routes: Routes = [
  { path: '', redirectTo: 'api/v1/cats', pathMatch: 'full' },
  { path: 'api/v1/cats', component: CatsListComponent },
  { path: 'api/v1/cats/:id', component: CatDetailsComponent },
  { path: 'api/v1/cats', component: AddCatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
