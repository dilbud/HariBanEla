import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from './mat/mat.module';
import { SocialModule } from './social/social.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatModule,
    SocialModule
  ],
  exports: [
    CommonModule,
    MatModule,
    SocialModule
  ]
})
export class DataModule { }
