import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootModule } from './boot/boot.module';
import { MatModule } from './mat/mat.module';
import { SocialModule } from './social/social.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BootModule,
    MatModule,
    SocialModule
  ],
  exports: [
    CommonModule,
    BootModule,
    MatModule,
    SocialModule
  ]
})
export class DataModule { }
