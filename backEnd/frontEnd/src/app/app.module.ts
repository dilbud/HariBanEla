import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core.module';
import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { MainComponent } from './modules/main/main.component';
import { DataModule } from './data/data.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginDComponent } from './modules/login/login-d/login-d.component';
import { LogoutDComponent } from './modules/login/logout-d/logout-d.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/auth-interceptor';
import { ErrorInterceptor } from './core/error-interceptor';
import { ReportComponent } from './modules/report/report.component';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { AdminComponent } from './modules/profile/admin/admin.component';
import { ProfessionalComponent } from './modules/profile/professional/professional.component';
import { GeneralComponent } from '@modules/profile/general/general.component';
import { ReportDComponent } from './modules/report/report-d/report-d.component';
import { AuthGuardService } from './data/services/auth-guard.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ProfileComponent,
    SignupComponent,
    LoginComponent,
    LoginDComponent,
    LogoutDComponent,
    ReportComponent,
    CalendarComponent,
    AdminComponent,
    GeneralComponent,
    ProfessionalComponent,
    ReportDComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    DataModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
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
