import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: String;
  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {
    console.log('Modal Listo');
  }

  ngOnInit() {

  }

 

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }


  //Función que se ejecuta en el evento change del input file
  seleccionImgen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    //Validamos que el tipo sea una imagen
    if (archivo.type.indexOf('image') < 0) {
      swal('Solo Imagenes ', 'El archiv seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    //esta propiedad es la que se manda al subir archivo
    this.imagenSubir = archivo;

    //Leemos  imagen con objeto reader para mostrar un previsualizador
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    //reader.result:Regresa una imagen en base 64 url
    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

   subirImagen(){
     //Al dar click sobre el boton de subir archivo 
     this._subirArchivoService.subirArchivo(this.imagenSubir,this._modalUploadService.tipo,this._modalUploadService.id)
          .then(resp=>{
            //Cuando se emite una respuesta desde la peticion para subir archivo notificara a la variable notificacion y desde elussuario.component.ts se recargaran los usuarios
            this._modalUploadService.notificacion.emit(resp);
            this.cerrarModal();
          }).catch(err=>{
            console.log("Error en la carga");
          });
   }


}
