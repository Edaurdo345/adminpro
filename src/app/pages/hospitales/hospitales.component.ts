import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';
declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

 //Es un arreglo de usuarios
 hospital: Hospital[] = [];
 desde: number = 0;
 totalRegistros: number = 0;
 cargando: boolean = false;

  constructor(
     public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
    .subscribe(resp => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde)
      .subscribe((resp: any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.hospital = resp.hospitales;
        console.log(resp);
        this.cargando = false;
      });

  }

  mostrarModal(id: string) {
    console.log(id);
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  buscarHospital(termino: string) {
   console.log(termino.length);
    if (termino.length <= 0) {
      this._hospitalService.cargarHospitales()
      .subscribe((resp: any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.hospital = resp.hospitales;
        console.log(resp);
        this.cargando = false;
      });
      return;
    }

    this.cargando = true;
    this._hospitalService.buscarHospital(termino)
      .subscribe((resp: Hospital[]) => {
        this.hospital = resp;
        this.cargando = false;
        console.log(resp);
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
    this.cargarHospitales();


  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
    .subscribe();
    // this._.actualizarUsuario(usuario)
    //   .subscribe();
  }


  borrarHospital(hospital: Hospital) {
    
    //Validamos que el usuario  no se pueda borrar a si mismo
    
    swal({
      title: "Esta seguro",
      text: "Esta a punto de borrar a " + hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(borrar => {
        console.log(borrar);
        //Si le da en Ok mandamos a llamar al servicio para realizar la peticion
        if (borrar) {
          this._hospitalService.borrarHospital(hospital._id.toString())
            .subscribe(borrado => {
              this.cargarHospitales();

            })
        }
      });

  }

  

}
