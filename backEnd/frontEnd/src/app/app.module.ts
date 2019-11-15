import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from '@app/core.module';
import { SharedModule } from '@shared/shared.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryCreateComponent } from './modules/category/category-create/category-create.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryCreateComponent,
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
