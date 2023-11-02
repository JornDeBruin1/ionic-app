import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message.component';


@NgModule({
  declarations: [
    ErrorMessageComponent
  ],
  exports: [
    ErrorMessageComponent
  ], 
  imports: [
    IonicModule,CommonModule
  ], 
})
export class ErrorMessageModule {}