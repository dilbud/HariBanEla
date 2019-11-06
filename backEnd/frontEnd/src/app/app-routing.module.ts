import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '@modules/signup/signup.component';
import { LoginComponent } from '@modules/login/login.component';
import { LoginDComponent } from '@modules/login/login-d/login-d.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
