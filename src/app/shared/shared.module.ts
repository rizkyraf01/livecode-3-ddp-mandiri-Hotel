import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { StringUtil } from './utils/string.utils';



@NgModule({
  declarations: [
    ValidationMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ValidationMessageComponent
  ],
  providers: [StringUtil]
})
export class SharedModule { }
