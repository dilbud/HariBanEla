import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from '@modules/update/update.component';
import { AuthGuardService } from './data/services/auth-guard.service';
import { ProfileComponent } from '@modules/profile/profile.component';
import { ProfessionalListComponent } from '@modules/professional-list/professional-list.component';



const routes: Routes = [
  { path: 'proList', component: ProfessionalListComponent},
  { path: 'update', component: UpdateComponent, canActivate: [AuthGuardService]},
  { path: 'profile', component: ProfileComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
