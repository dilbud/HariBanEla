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
import { UpdateComponent } from './modules/update/update.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { DataModule } from './data/data.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginDComponent } from './modules/login/login-d/login-d.component';
import { LogoutDComponent } from './modules/login/logout-d/logout-d.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/auth-interceptor';
import { ErrorInterceptor } from './core/error-interceptor';
import { ReportComponent } from './modules/report/report.component';
import { ReportDComponent } from './modules/report/report-d/report-d.component';
import { AuthGuardService } from './data/services/auth-guard.service';
import { ProfessionalListComponent } from './modules/professional-list/professional-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    UpdateComponent,
    LoginComponent,
    LoginDComponent,
    LogoutDComponent,
    ReportComponent,
    ReportDComponent,
    ProfessionalListComponent
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
