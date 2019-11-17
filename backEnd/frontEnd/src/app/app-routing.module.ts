import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from '@modules/update/update.component';
import { AuthGuardService } from './data/services/auth-guard.service';


const routes: Routes = [
  { path: 'update', component: UpdateComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
