import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '@modules/admin/admin.component';
import { AnswerUpdateComponent } from '@modules/answers/answer-update/answer-update.component';
import { CategoryCreateComponent } from '@modules/category/category-create/category-create.component';
import { ProfileComponent } from '@modules/profile/profile.component';
import { UpdateComponent } from '@modules/update/update.component';
import { AuthGuardService } from './data/services/auth-guard.service';
import { QuestionCreateComponent } from './modules/questions/question-create/question-create.component';
import { QuestionDetailComponent } from './modules/questions/question-detail/question-detail.component';
import { QuestionListComponent } from './modules/questions/question-list/question-list.component';
import{AppointmentAcceptComponent} from '@modules/appointment/appointment-accept/appointment-accept.component'
import {AppointmentPaymentComponent} from '@modules/appointment/appointment-payment/appointment-payment.component'
import{AppointmentCreateComponent} from '@modules/appointment/appointment-create/appointment-create.component'

import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: QuestionListComponent
  },
  {
    path: 'ask',
    component: QuestionCreateComponent
  },
  {
    path: 'questions/:id',
    component: QuestionDetailComponent
  },
  {
    path: 'questions/:id/edit',
    component: QuestionCreateComponent
  },
  {
    path: 'questions/:questionId/:answerId/edit',
    component: AnswerUpdateComponent
  },
   { path: 'appointment/new',
    component: AppointmentCreateComponent
  },
  {
    path: 'appointment/:id',
    component: AppointmentAcceptComponent
  },
 
  {
    path: 'payment/:id',
    component: AppointmentPaymentComponent
  },
  
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "admin/category/:id",
    component: CategoryCreateComponent,
    canActivate: [AuthGuardService]
  },

  { path: 'update', component: UpdateComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  {
    path: '**',
    component: QuestionListComponent
  }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
