import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CapitalizePipe
  ]
})
export class SharedModule { }
