import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo:string; 
  public id:string; 

  public oculto:string='oculto'; 

  //Emitimos para saber en los componentes que utlizxan este modal puedan esuchar cuando se suba imagen
  //Any objetor respuesta 
  public notificacion=new EventEmitter<any>();


  constructor() {
    console.log('modal upload');

  }


  ocultarModal(){
    this.oculto='oculto';
  }
  //Funcion que se llama desde elcomponente donde tieneel boton para mostrar el modal y setear los valores
  mostrarModal(tipo:string,id:string){
   this.oculto=''; //Muestra el modal
   this.id=id; //Setea el id ya sea de usuario,Medico u Hospital
   this.tipo=tipo;//Tipo usuario,Medico u Hospital
   
  }

}
