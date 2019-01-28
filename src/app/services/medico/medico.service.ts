import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico/todos';
    return this.http.get(url)
      .map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      });

  }

  cargarMedico(id:string){
   
    let url=URL_SERVICIOS+'/medico/'+id;

return this.http.get(url)
            .map((resp:any)=>resp.medico);


  }

  buscarMedico(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/colleccion/medico/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.medico);
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += "?token=" + this._usuarioService.token;
    return this.http.delete(url)
      .map((resp: any) => {

        swal('Medico Borrado', 'Medico borrado correctamente', 'success');


        return resp;
      });
  }

  guardarMedico(medico: Medico) {

    let url = URL_SERVICIOS + '/medico';
     console.log(medico._id);
    if(medico._id){
      //MODIFICAR
      url+='/'+ medico._id.toString();
      url+='?token='+ this._usuarioService.token;
      return this.http.put(url, medico)
      .map((resp: any) => {
        console.log(resp);
        swal('Medico Actualizado',medico.nombre, 'success');
        return resp.medico;
      });

    }else{
      // CREAR
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico)
        .map((resp: any) => {
          console.log(resp);
          swal('Medico Creado',medico.nombre, 'success');
          return resp.body;
        });
    }
    
    

  }
}
