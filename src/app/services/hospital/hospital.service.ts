import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
@Injectable()
export class HospitalService {

  totalHospitales:number=0;
  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivosService: SubirArchivoService,
    public _usuarioService:UsuarioService) { }

  cargarHospitales(desde: number = 0) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url)
                .map((resp:any)=>{
                  this.totalHospitales=resp.total;
                  return resp.hospitales;
                });
  }
  actualizarHospital(hospital: Hospital) {
    //mandamos parametro por url del id usuario que vamos a actualizar
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    //mandamos token por query parametro
    url += '?token=' + this._usuarioService.token;
    //E un tipo put  
    return this.http.put(url, hospital)
      .map((resp: any) => {
        //Actualizamos objeto global
       

        swal('Hoswalspital Actualizado', resp.hospital.nombre, 'success');

        return true;
      });

  }

  borrarHospital(id: string) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' +this._usuarioService.token;

    return this.http.delete(url)
      .map(resp => {
        swal('hospital borrado', 'El suuario ha sido eliminado correctamente', 'success');
        return true;
      });


  }

  obtenerHospital(id:string){

    let url=URL_SERVICIOS+'/hospital/'+id;
    return this.http.get(url)
               .map((resp:any)=>resp.hospital);
  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/colleccion/hospital/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.hospital);
  }


}
