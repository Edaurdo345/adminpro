import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingComponent } from "./account-setting/account-setting.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { LoginGuardGuard } from "../services/service.index";
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { HospitalesComponent } from "./hospitales/hospitales.component";
import { MedicosComponent } from "./medicos/medicos.component";
import { MedicoComponent } from "./medicos/medico.component";




const pageRoutes:Routes=[
    { 
        path: '', //Sin ruta rdirecciona al page component el cual tiene hijos
        component:PagesComponent,
        canActivate:[LoginGuardGuard],
        children:[
            { path: 'dashboard',component:DashboardComponent,data:{titulo:'Dashboard'}},
            { path: 'progress',component:ProgressComponent,data:{titulo:'Progress'}},
            { path: 'graficas1',component:Graficas1Component,data:{titulo:'Graficas'}},
            { path: 'promesas',component:PromesasComponent,data:{titulo:'Promesas'}},
            { path: 'rxjs',component:RxjsComponent,data:{titulo:'Rxjs'}},
            { path: 'account-settings',component:AccountSettingComponent,data:{titulo:'Ajustes del tema'}},
            { path: 'perfil',component:ProfileComponent,data:{titulo:'Perfil de ususario'}},
            //Mantenimientos
            { path: 'usuarios',component:UsuariosComponent,data:{titulo:'Mantenimiento de Usuarios'}},
            { path: 'hospitales',component:HospitalesComponent,data:{titulo:'Mantenimiento de Hospitales  '}},
            { path: 'medicos',component:MedicosComponent,data:{titulo:'Mantenimiento de Médicos  '}},
            { path: 'medico/:id',component:MedicoComponent,data:{titulo:'Actualización de Médico  '}},
            { path: '', redirectTo:'/dashboard', pathMatch:'full'}, //Ruta vacia redirecciona
        ]
    
    },
];

//Son router-outlet que estan dentro de otros router-outel
export const PAGES_ROUTE=RouterModule.forChild(pageRoutes)