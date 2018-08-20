import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ElementDef } from '@angular/core/src/view';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress') txtProgress: ElementRef;  
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();//Tipo de dato que emite el evento
  constructor() {
    console.log(this.progreso);
    console.log(this.leyenda);
  }

  ngOnInit() {
  }
  onChanges(newValue: number) {
    console.log(newValue);
    //let elemHTML: any = document.getElementsByName('progreso')[0];

    
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    this.txtProgress.nativeElement.value=this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor) {
    //Validacion no menor de 0 y no mayopr a 100
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return false;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return false;
    }
    this.progreso = this.progreso + valor;
    //Emite valor numerico que tiene el progreso al cambiarlo
    this.cambioValor.emit(this.progreso);
  }
}
