import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '@app/core.module';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionCreateComponent } from './modules/questions/question-create/question-create.component';
import { QuestionListComponent } from './modules/questions/question-list/question-list.component';
import { QuestionSummaryComponent } from './modules/questions/question-summary/question-summary.component';
import { QuestionDetailComponent } from './modules/questions/question-detail/question-detail.component';
import { AnswerCreateComponent } from './modules/answers/answer-create/answer-create.component';
import { AnswerDetailComponent } from './modules/answers/answer-detail/answer-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionCreateComponent,
    QuestionListComponent,
    QuestionSummaryComponent,
    QuestionDetailComponent,
    AnswerCreateComponent,
    AnswerDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
