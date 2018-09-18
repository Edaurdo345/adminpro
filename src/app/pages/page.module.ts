import { NgModule } from "@angular/core";
//Modulos
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
//Modulo ng2-Charts
import { ChartsModule } from 'ng2-charts';
//Componentes
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { PAGES_ROUTE } from "./page.routes";


//temporal
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficoDonasComponent } from "../components/grafico-donas/grafico-donas.component";
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

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
        RxjsComponent
    ],
    imports:[
    SharedModule,
    PAGES_ROUTE,
    FormsModule,
    ChartsModule
    ]
})

export class PageModule {

}


