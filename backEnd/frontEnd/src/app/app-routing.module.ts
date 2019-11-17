import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryCreateComponent} from '@modules/category/category-create/category-create.component'
import { QuestionCreateComponent } from './modules/questions/question-create/question-create.component';
import { QuestionListComponent } from './modules/questions/question-list/question-list.component';
import { QuestionDetailComponent } from './modules/questions/question-detail/question-detail.component';
import{AppointmentAcceptComponent} from '@modules/appointment/appointment-accept/appointment-accept.component'
import {AppointmentPaymentComponent} from '@modules/appointment/appointment-payment/appointment-payment.component'
import{AppointmentCreateComponent} from '@modules/appointment/appointment-create/appointment-create.component'
import {AdminComponent} from '@modules/admin/admin.component'
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
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AdminGuard],   
  },
  {path:"admin/category/:id",
  component:CategoryCreateComponent,
  // canActivate: [AdminGuard]},
},
{
  path: '**',
  component: QuestionListComponent
},
  // {
  //   path: 'questions/:id/edit',
  //   component: EditQuestionComponent
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
