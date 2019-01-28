import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html'
})
export class MedicoComponent implements OnInit {


  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');
  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activateRouter: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    //Params tiene todos los parametros de url que se anden en este casi se mando :id
    activateRouter.params.subscribe(params => {

      //Aqui recibimos el id del emdico por via url
      let id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }


    });

  }

  ngOnInit() {
    //Aqui cargamos los hopitales del select enviando los datos al objeto hospitales array de tipo hospital
    this._hospitalService.cargarHospitales()
      .subscribe(hospitales => this.hospitales = hospitales);

      //En esta parte estamos escuchando el event notifaction que se reliza desde 
      //el ModalUploadService cuando se guarda la imagen se dispara en automatico una vez guardada
      
      this._modalUploadService.notificacion
      .subscribe(resp=>{

      //resp ontiene un objeto actualizado del medico  el cualtiene el valor campo img
       //Actualizamos la imagen del medico
        this.medico.img=resp.medico.img;
        

      });


  }


  cargarMedico(id: string) {

    //Manda una funcion del backend que carga el medico dependiendo del id que se mande
    this._medicoService.cargarMedico(id)
      .subscribe(medico => {
        //actualizamos el objeto medico con el medico obenido de la ruta al cambiar de pagina
        this.medico = medico;
        //hospital de medico viene del model de angular este es el id
        this.medico.hospital = medico.hospital._id;

        //Mandamos el id hospital  para que cargue el objeto de hospital y se vea la imagen
        this.cambioHospital(this.medico.hospital);

      });
  }

  cambioHospital(id: string) {

    this._hospitalService.obtenerHospital(id)
      .subscribe(hospital => {
        console.log(hospital);
        this.hospital = hospital;
      });

  }

  guardarMedico(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);

    if (f.invalid) {

      return;
    }
   
      this._medicoService.guardarMedico(this.medico)
      .subscribe(medico => {

        this.medico._id = medico._id;

        this.router.navigate(['medico', medico._id]);
        // console.log(medico);

      });
    

   
  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
