import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [ErrorMessageComponent],
  exports: [ErrorMessageComponent], // Export the component to make it available for use
  imports: [IonicModule,CommonModule], // Import Ionic modules if needed
})
export class SharedModule {}