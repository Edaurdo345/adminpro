import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import  {
SettingsService,
SharedService,
SliderbarService,
UsuarioService,
LoginGuardGuard
} from  './service.index';
import { HttpClientModule } from '@angular/common/http';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
      SettingsService,
      SharedService,
      SliderbarService,
      UsuarioService,
      LoginGuardGuard,
      SubirArchivoService

  ],
  declarations: []
})
export class ServiceModule { }
