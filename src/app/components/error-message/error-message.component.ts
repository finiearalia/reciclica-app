import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent  implements OnInit {

  @Input() message: string ='';
  @Input() field: AbstractControl | null = null;
  @Input() error: string ='';

  constructor() { }

  ngOnInit() {}
  shouldShowComponent(){
    //form.get('email').touched && form.get('email').errors?.required
    if(this.field && this.field.touched && this.field.errors?.['required']){
      return true;
    }
    return false;
  }

}
