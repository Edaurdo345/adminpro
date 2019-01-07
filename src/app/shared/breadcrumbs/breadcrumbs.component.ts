import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
titulo:string;
  constructor(private router:Router,
    private title:Title,
    private meta:Meta) {
    this.getDataRoute() 
    
    .subscribe(data=>{
      this.titulo=data.titulo;
      this.title.setTitle(this.titulo);

      //Configuracion Meta Definition
      const metaTag: MetaDefinition={
      name:'description',
      content:this.titulo

      }
      //Falta actualizarlo desde el html
      meta.updateTag(metaTag);

    });


   }

  ngOnInit() {

    
  }

  getDataRoute(){
   return  this.router.events.pipe(
      //Filtra solo los ActivationEnd en este caso solo nos mostraria dos 
      filter(evento=>evento instanceof ActivationEnd ),
      //Apara tener uno unico le decimos  que obtenga donde el objeto  firstChild sea null
      filter((evento: ActivationEnd)=>evento.snapshot.firstChild==null),
      //Utilizamos Map para obtener solo el objeto data
      map((evento: ActivationEnd)=>evento.snapshot.data)
    
    )

  }

}
