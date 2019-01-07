import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
// import * as _swal from 'sweetalert';
// import { SweetAlert } from 'sweetalert/typings/core';
//const swal: SweetAlert = _swal as any;

declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {




  //Es un arreglo de usuarios
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = false;


  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    //Escuchamos emmiter  del  ModalUploadService cuado se duba imagen se dispara respuesta desde el subscribe y se recarga la pagina
    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        console.log(resp);
        this.cargando = false;
      });

  }

  cambiarDesde(valor: number) {

    let desde = this.desde + valor;

    console.log(desde);
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();


  }

  buscarUsuario(termino: string) {
    console.log(termino);
    if (termino.length <= 0) {
      this._usuarioService.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this._usuarioService.buscarUsuario(termino)
      .subscribe((resp: Usuario[]) => {
        this.usuarios = resp;
        this.cargando = false;
        console.log(resp);
      });
  }

  borrarUsuario(usuario: Usuario) {
    console.log(usuario);
    //Validamos que el usuario  no se pueda borrar a si mismo
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    swal({
      title: "Esta seguro",
      text: "Esta a punto de borrar a " + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(borrar => {
        console.log(borrar);
        //Si le da en Ok mandamos a llamar al servicio para realizar la peticion
        if (borrar) {
          this._usuarioService.borrarUsuario(usuario._id.toString())
            .subscribe(borrado => {
              console.log(borrado);
              this.desde = 0;
              this.cargarUsuarios();

            })
        }
      });

  }

  guardarUsuario(usuario: Usuario) {

    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }

}
