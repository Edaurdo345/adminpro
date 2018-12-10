import { Injectable } from '@angular/core';
import { resolve } from 'q';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  //Esta función retorna una promesa como respuesta la imagen
  //tipo;Podria ser medicos,hostpitales.usuarios
  //id:podria ser el del usuario,Medicos o Hospotales
  subirArchivo(archivo: File, tipo: String, id: String) {

    return new Promise((resolve, refect) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();


      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log("Imagen subida");
            resolve(JSON.parse(xhr.response));

          } else {
            console.log("Fallo la subida");
            refect(JSON.parse(xhr.response));

          }

        }

      };
      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);

    });




  }

}
