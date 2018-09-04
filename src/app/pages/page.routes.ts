import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingComponent } from "./account-setting/account-setting.component";




const pageRoutes:Routes=[
    { 
        path: '', //Sin ruta rdirecciona al page component el cual tiene hijos
        component:PagesComponent,
        children:[
            { path: 'dashboard',component:DashboardComponent},
            { path: 'progress',component:ProgressComponent},
            { path: 'graficas1',component:Graficas1Component},
            { path: 'account-settings',component:AccountSettingComponent},
            { path: '', redirectTo:'/dashboard', pathMatch:'full'}, //Ruta vacia redirecciona
        ]
    
    },
];

//Son router-outlet que estan dentro de otros router-outel
export const PAGES_ROUTE=RouterModule.forChild(pageRoutes)