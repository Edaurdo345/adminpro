import { Component, OnInit } from '@angular/core';
import { resolve } from 'q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
  
    this.contarTres().then(
      mendaje => console.log("promesa terminada",mendaje)
    )
      .catch(error => console.error('Error en la promesa', error));


  }

  ngOnInit() {
  }

  contarTres():Promise<boolean>{
  //Viene del emacscript 6 por lo cual no hay que importar nada
  return new Promise((resolve, refect) => {
    let contador = 0;
    let intervalo=  setInterval(() =>  {
      contador += 1;
      console.log(contador);
      if (contador === 3){
        resolve( true );
        //refect('Simplemente un error');
        clearInterval(intervalo);
      }
    }, 1000);

  });


  }

}
