import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '@modules/signup/signup.component';
import { AuthGuardService } from './data/services/auth-guard.service';


const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
