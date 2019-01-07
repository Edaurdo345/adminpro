import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivosService: SubirArchivoService
  ) {

    console.log('Servicio de usuario listo');
    this.cargarStorage();
     //
  }

  estaLogueado() {

    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }


  }



  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  actualizarUsuario(usuario: Usuario) {
    //mandamos parametro por url del id usuario que vamos a actualizar
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    //mandamos token por query parametro
    url += '?token=' + this.token;
    //E un tipo put  
    return this.http.put(url, usuario)
      .map((resp: any) => {
        //Actualizamos objeto global
        if (usuario._id == this.usuario._id) {
          let usuarioBD: Usuario = resp.usuario;
          this.guardarStorage(usuarioBD._id.toString(), this.token, usuarioBD);
        }

        swal('Usuario Actualizado', resp.usuario.nombre, 'success');

        return true;
      });

  }

  //Borramos variables token y usuario  despues borramos localStorage
  logOut() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);

  }

  loginGoogle(token: string) {

    let url = URL_SERVICIOS + '/login/google';
    //Tambien se podria hacer referencia con {token:token} pero con emacscript 6  no hace falta  
    //return this.http.post(url,{token:token});
    return this.http.post(url, { token })
      .map((resp: any) => { //Operador map para recorrer el resultado del observador
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        //Hizo la autentificación de google
        return true;
      });
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email.toString());
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
      .map((resp: any) => { //Operador map para recorrer el resultado del observador
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      });


  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    //Regresamos un observador
    return this.http.post(url, usuario)
      .map((resp: any) => { //Operador map para recorrer el resultado del observador
        swal('Usuario Creado', resp.usuario.email, 'success');
        return resp.usuario;
      });
  }

  cambiarImagen(archivo: File, id: string) {
    //Esto regresa una promesa ya que la forma de hacer la petición se hizo con vanilla javascript y regresa una promesa
    this._subirArchivosService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', resp.usuario.email, 'success');
        //Actualizamos el usuario ya que cambiamos la imagen  para el localStorage
        this.guardarStorage(id, this.token, this.usuario);
        console.log(resp);
      })
      .catch((resp: any) => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }


  buscarUsuario(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/colleccion/usuario/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.usuario);
  }

  borrarUsuario(id: string) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .map(resp => {
        swal('usuario borrado', 'El suuario ha sido eliminado correctamente', 'success');
        return true;
      });


  }
}
