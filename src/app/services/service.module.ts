import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import  {
SettingsService,
SharedService,
SliderbarService
} from  './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[
      SettingsService,
      SharedService,
      SliderbarService

  ],
  declarations: []
})
export class ServiceModule { }
