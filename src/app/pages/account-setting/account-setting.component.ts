import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: []
})
export class AccountSettingComponent implements OnInit {

  //Para acceder a  las propiedades de document
  constructor(public _ajustes: SettingsService) {
  }

  ngOnInit() {
    this.colocarCheck();
  }

  //Cada vez ue damos click en a mandamos un string con el color que deseamos  que cambie el tema
  cambiarColor(tema: string, link: any) {
    console.log(link);
    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);

  }

  aplicarCheck(link: any) {
    //Clase selector que tiene todos los a
    let selectores: any = document.getElementsByClassName('selector');
    //Recorremos y le quitamos la clase  working que es la que pinta la palomita en el cuadro de color
    for (let ref of selectores) {
      ref.classList.remove('working');
    }
    //Agregamos la clase worning al selector seleccionado desde el evento click
    link.classList.add('working');

  }

  //Obtiene agrega  check dependiendo del color seleccionado
  colocarCheck() {
    //Clase selector que tiene todos los a
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;
    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') == tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
