import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from '@modules/update/update.component';
import { AuthGuardService } from './data/services/auth-guard.service';
import { ProfileComponent } from '@modules/profile/profile.component';


const routes: Routes = [
  { path: 'update', component: UpdateComponent, canActivate: [AuthGuardService]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
