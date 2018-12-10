import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router:Router

  ) { }

  //Se realiza una  funcion de validacion cuanod los dos campos sean iguales
  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 == pass2) {
        return null;
      }
      return {
        sonIguales: true
      };
    }

  }


  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),//Indicamos que sea obligatorio si se desea poner mas validaciones debemos de mandar un array
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl()//Se realizara validación especial para que al momento de enviarse muestre un popup indicando que debe de podnerlo
    }, { validators: this.sonIguales('password', 'password2') });

    //Seteamos los datos del formulario
    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '1234',
      password2: '1234',
      condiciones: false

    });
  }

  registrarUsuario() {
    console.log('Forma validada', this.forma.valid);
    //Si es invalido algun campo  no pasa submit paramos el evento con return
    if (this.forma.invalid) {
      return;
    }
    //Si el checkbox de condiciones no esta seleccionados pedira debe seleccionar validaciones
    if (!this.forma.value.condiciones) {

      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      //swal("A title", "Hello world!");
      //console.log('Debe de aceptar las condiciones');
      return;
    }


    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
      ""
    );

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => {
        //Responde con un json de tipo usuario Collection
        console.log(resp);
        this.router.navigate(['/login']);
      });


    //Muestra todos los valores del formulario
    //console.log(this.forma.value);
  }

}
