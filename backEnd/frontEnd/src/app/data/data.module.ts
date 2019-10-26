import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootModule } from './boot/boot.module';
import { MatModule } from './mat/mat.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BootModule,
    MatModule,
  ],
  exports: [
    CommonModule,
    BootModule,
    MatModule,
  ]
})
export class DataModule { }
