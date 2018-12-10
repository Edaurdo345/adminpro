import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';

@NgModule({
  imports: [
  ],
  exports:[ //Para usarlos fuera de este mismo modulo
    ImagenPipe
  ],
  declarations: [
    ImagenPipe
  ]
})
export class PipesModule { }
