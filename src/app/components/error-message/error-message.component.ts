import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {

  @Input() message: string | undefined;
  @Input() field!: AbstractControl<any, any> | null;
  @Input() error: string = "";

  constructor() { }

  ngOnInit() { }

  shouldShowComponent() {
    //form.get('email')?.touched && form.get('email')?.errors?.hasOwnProperty('required')
    if (this.field?.touched && this.field.errors?.[this.error]) {
      return true
    }

    return false
  }
}
