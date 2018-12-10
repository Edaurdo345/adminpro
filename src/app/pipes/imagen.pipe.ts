import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    //Si es undefined se regresara la imagen por default del servicio
    if (!img) {
      return url+'/usuarios/xxx';
    }

    //Si contiene https es una imagen de ususario de google por lo cual se envia completa sin realizar trasnformación
    if (img.indexOf('https') >= 0) {
     return img;
    }

   //Si  son de las imagenes que guardamos en el proyecto 
    switch(tipo){
      case 'usuario':

        url+='/usuarios/'+img;

      break;
      case 'medico':
        url+='/medicos/'+img;

      break;
      case 'hospital':
        url+='/hospitales/'+img;

      break;

      default:
       console.log('tipo de imagen no existe, usuario, medicos, hospitales');

       url+='/usuarios/xxx';
      break;

    }
    return url;
  }

}
