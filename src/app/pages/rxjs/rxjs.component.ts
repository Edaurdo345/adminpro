import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { retry,map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnInit,OnDestroy {

  subscription:Subscription;
  constructor() {
    //Tenemos objeto observer de tipo

    //Recibe 3 callbacks
    //Primero next
    //Segundo Error
    //Tercero  Cuando se completa observador
    this.subscription= this.regresaObservable()
    .subscribe(numero => {
      console.log('Subs', numero);
    },error => {
      console.error('Ocurrio un error', error);
    },()=> {
      console.log('El observador termino');
    } 
    );
  }
   //La función de dispara cada vez que se deja la paigina
  ngOnDestroy(){
    console.log('La pagina se va cerrar');
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }


  //Se puede reconocer como tipo de datos que sea string,number,boolean el retorno de la funcion
  regresaObservable():Observable<any>{

    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;
        const salida={
          valor:contador
        };
        //Es lo que notifica el obsrvador
        observer.next(salida);
        if (contador == 3) {
          clearInterval(intervalo);
          //No se puede mandar ningun parametro
          observer.complete();
        }
        /*if (contador == 2) {
         //Entra si hay error
         clearInterval(intervalo);
          observer.error("Auxilio");
        }*/
      }, 1000);

    }).pipe(
      map( resp =>
       resp.valor),
       filter( (valor, index)=>{  

        //console.log('Filter',valor,index);
        if((valor%2)==1){
          //Impar
        return true;

        }else{
          //Par
          return false;
        }
       })
    );
  }

}
