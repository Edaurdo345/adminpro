import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService,
  SharedService,
  SliderbarService,
  UsuarioService,
  LoginGuardGuard,
  MedicoService
} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SliderbarService,
    UsuarioService,
    HospitalService,
    MedicoService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule { }
