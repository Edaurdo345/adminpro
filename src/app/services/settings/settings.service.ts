import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    console.log('Guardado en localStorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    console.log('Cargarndo Local Storage');
    //Comprueba si existe
    if (JSON.parse(localStorage.getItem('ajustes'))) {
      //Se parsea a json para que no regrese un string (Ajustes es una interface)
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      console.log('Usando valor por defecto');
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string) {
    let url = `assets/css/colors/${tema}.css`
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.temaUrl = url;
    this.ajustes.tema = tema;
    //Guarda en localStorage los ajustes
    this.guardarAjustes();


  }



}

//Se utliza para restringuir datos que se usaran
interface Ajustes {
  temaUrl: string;
  tema: string;
}