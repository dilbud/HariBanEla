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
import { AppointmentAcceptComponent } from '@modules/appointment/appointment-accept/appointment-accept.component';
import { AppointmentPaymentComponent } from '@modules/appointment/appointment-payment/appointment-payment.component';
import { AppointmentCreateComponent } from '@modules/appointment/appointment-create/appointment-create.component';
import { ProfessionalListComponent } from '@modules/professional-list/professional-list.component';
import { ChatComponent } from '@modules/chat/chat.component';
import { ProfilePageComponent } from './modules/profile-page/profile-page.component';
import { ProfilePageBaseComponent } from './modules/profile-page-base/profile-page-base.component';
import { BookingComponent } from './modules/booking/booking.component';
import { from } from 'rxjs';
import { ProfileViewComponent } from '@modules/profile-view/profile-view.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionListComponent
  },
  {
    path: 'category/:category',
    component: QuestionListComponent
  },
  {
    path: 'ask',
    component: QuestionCreateComponent,
    canActivate: [AuthGuardService]
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
  {
    path: 'appointment/new',
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
    path: 'chat/:id',
    component: ChatComponent,
    // canActivate: [AuthGuardService],
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'admin/category/:id',
    component: CategoryCreateComponent,
    canActivate: [AuthGuardService]
  },

  { path: 'professionals', component: ProfessionalListComponent },

  {
    path: 'account', component: ProfilePageComponent, canActivate: [AuthGuardService],
    children: [
      { path: '', component: ProfilePageBaseComponent },
      { path: 'edit', component: UpdateComponent }
    ]
  },

  { path: 'booking', component: BookingComponent, canActivate: [AuthGuardService] },

  { path: 'view', component: ProfileViewComponent, canActivate: [AuthGuardService] },

  { path: '**', component: QuestionListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
