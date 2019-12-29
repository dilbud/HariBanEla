import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core.module';
import { ChatComponent } from '@modules/chat/chat.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/auth-interceptor';
import { DataModule } from './data/data.module';
import { AuthGuardService } from './data/services/auth-guard.service';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AnswerCreateComponent } from './modules/answers/answer-create/answer-create.component';
import { AnswerDetailComponent } from './modules/answers/answer-detail/answer-detail.component';
import { AnswerUpdateComponent } from './modules/answers/answer-update/answer-update.component';
import { AppointmentAcceptComponent } from './modules/appointment/appointment-accept/appointment-accept.component';
import { AppointmentCreateComponent } from './modules/appointment/appointment-create/appointment-create.component';
import { AppointmentPaymentComponent } from './modules/appointment/appointment-payment/appointment-payment.component';
import { CategoryCreateComponent } from './modules/category/category-create/category-create.component';
import { CommentCreateComponent } from './modules/comments/comment-create/comment-create.component';
import { CommentDetailComponent } from './modules/comments/comment-detail/comment-detail.component';
import { LoginDComponent } from './modules/login/login-d/login-d.component';
import { LoginComponent } from './modules/login/login.component';
import { LogoutDComponent } from './modules/login/logout-d/logout-d.component';
import { ProfessionalListComponent } from './modules/professional-list/professional-list.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { QuestionCreateComponent } from './modules/questions/question-create/question-create.component';
import { QuestionDetailComponent } from './modules/questions/question-detail/question-detail.component';
import { QuestionListComponent } from './modules/questions/question-list/question-list.component';
import { QuestionSummaryComponent } from './modules/questions/question-summary/question-summary.component';
import { ReportDComponent } from './modules/report/report-d/report-d.component';
import { ReportComponent } from './modules/report/report.component';
import { UpdateComponent } from './modules/update/update.component';
import { ProfilePageComponent } from './modules/profile-page/profile-page.component';
import { BookingComponent } from './modules/booking/booking.component';




@NgModule({
  declarations: [
    AppComponent,
    CategoryCreateComponent,
    QuestionCreateComponent,
    QuestionListComponent,
    QuestionSummaryComponent,
    QuestionDetailComponent,
    AnswerCreateComponent,
    AnswerDetailComponent,
    CommentCreateComponent,
    CommentDetailComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    AnswerUpdateComponent,
    ProfileComponent,
    UpdateComponent,
    LoginComponent,
    LoginDComponent,
    LogoutDComponent,
    ReportComponent,
    ReportDComponent,
    AppointmentCreateComponent,
    AppointmentAcceptComponent,
    AppointmentPaymentComponent,
    ProfessionalListComponent,
    ChatComponent,
    ProfilePageComponent,
    BookingComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    DataModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    DlDateTimeDateModule,
    DlDateTimePickerModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuardService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    LoginDComponent,
    LogoutDComponent,
    ReportDComponent,

  ],
})

export class AppModule { }
