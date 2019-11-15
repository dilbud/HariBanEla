import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryCreateComponent} from '@modules/category/category-create/category-create.component'

const routes: Routes = [
  {path:"admin/category/:id",
  component:CategoryCreateComponent,
  // canActivate: [AdminGuard]},
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
