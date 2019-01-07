import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {


  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: String;
  constructor(
    public _usuarioService: UsuarioService

  ) {
    this.usuario = _usuarioService.usuario;

  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    console.log(this.usuario);

    this._usuarioService.actualizarUsuario(this.usuario)
      .subscribe();


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
    this.imagenSubir = archivo;

    //Leemos  imagen con objeto reader para mostrar un previsualizador
    let reader=new FileReader();
    let urlImagenTemp=reader.readAsDataURL(archivo);
     //reader.result:Regresa una imagen en base 64 url
    reader.onloadend= () => this.imagenTemp=reader.result.toString();

  }

  cambiarImagen() {

    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id.toString());
  }

  ngOnInit() {

  }

}
