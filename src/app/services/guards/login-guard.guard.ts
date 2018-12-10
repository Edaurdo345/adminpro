import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';
import { Route } from '@angular/compiler/src/core';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _serviceUsuario:UsuarioService,
    public router:Router
  ){

  } 
  //Cada vez que redireccionemos a la ruta donde se encuentra LoginGuardGuard eentra a esta validación
  canActivate(){
   
    
    if(this._serviceUsuario.estaLogueado()){
      console.log('PASO EL GUARD');
      return true; 
    } else{
      console.log('Bloqueado por el guard');
      //Si no existe token se redirecciona al login
      this.router.navigate(['/login']);
      return false;
    }   
    
  }
}
