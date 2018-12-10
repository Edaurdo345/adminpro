import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
//Aui le indicamos que estara en uso gapi la cual la imp
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  recuerdame: boolean = false;
  auth2: any; //Información  que regrese google se guardara en esta variable


  constructor(public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    }


  }

  

  googleInit() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '792528457483-sj0g0jaiai9qdhhpcnnevgfp3cb16sr7.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email' //Datos que se extrairan

      });

      this.attachSignin(document.getElementById('btnGoogle'));


    });

  }


  attachSignin(element) {

    //Aqui se ajusta el listener evento click del elemento  (btnGoogle) por lo cual no lo creamos manualmente el evento
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      //Regresa infromacion de la sesion
      // let profile = googleUser.getBasicProfile();
      // console.log(profile);

      //Obtenemos el token
      let token = googleUser.getAuthResponse().id_token;
       //console.log(token);
     this._usuarioService.loginGoogle(token)
     .subscribe(()=>{

      
      this.router.navigate(['/dashboard']);

      //Si llega a fallar de la redirección de la forma normal podemos utlizar la de la siguiente linea:
      //window.location.href='#/dashboard';
     });


    });


  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }
    //Creamos objeto de usuario el primero nombre es null ya que no requerimos de el 
    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    //Llamamos en servicio con la funcion login  regresa resultado de la ruta backend login
    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(correcto => this.router.navigate(['/dashboard']));
    //Si ocurre error no pasa por el subscribe 
    console.log(forma.valid);
    //Regresa un objeto con los datos del formulario
    console.log(forma.value);
    //his.router.navigate(['/dashboard']);
  }

}
