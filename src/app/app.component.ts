import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  //Al declarar  servicio en el constructor se dispara el constructor de SettingsService 
  constructor(private _ajustes:SettingsService){

  }
}
