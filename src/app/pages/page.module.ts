import { NgModule } from "@angular/core";
//Modulos
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
//Modulo ng2-Charts
import { ChartsModule } from 'ng2-charts';
//Componentes
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { PAGES_ROUTE } from "./page.routes";

//Pipes
import { PipesModule } from "../pipes/pipes.module";

//temporal
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficoDonasComponent } from "../components/grafico-donas/grafico-donas.component";
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from "../components/modal-upload/modal-upload.component";
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';


@NgModule({

    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonasComponent,
        AccountSettingComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent
    ],
    imports:[
    SharedModule,
    PAGES_ROUTE,
    FormsModule,
    ChartsModule,
    PipesModule,
    CommonModule
    ]
})

export class PageModule {

}


