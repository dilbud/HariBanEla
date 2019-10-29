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
import { AlertsComponent } from './modules/alerts/alerts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginDComponent } from './modules/login/login-d/login-d.component';
import { LogoutDComponent } from './modules/login/logout-d/logout-d.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    MainComponent,
    AlertsComponent,
    LoginDComponent,
    LogoutDComponent
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    LoginComponent,
    LoginDComponent,
    LogoutDComponent
  ],
})
export class AppModule { }
