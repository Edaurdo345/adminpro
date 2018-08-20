import { Component, OnInit, Input } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-grafico-donas',
  templateUrl: './grafico-donas.component.html',
  styles: []
})
export class GraficoDonasComponent implements OnInit {
 @Input('chartLabels') public doughnutChartLabels:string[] = [];
 @Input('chartData') public doughnutChartData:number[] = [];
 @Input('chartType') public doughnutChartType:string = '';


  constructor() { }

  ngOnInit() {

    /*
   var testo= document.getElementById("titulo").textContent;
   console.log(testo);

   var test=testo.split(" ");

   console.log(test);*/

   /*var txt=$('#titulo').text();
    console.log(txt);*/


  }

}
