import  {RouterModule,Routes} from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';


const appRoutes:Routes=[
{ 
    path: '', //Sin ruta rdirecciona al page component el cual tiene hijos
    component:PagesComponent,
    children:[
        { path: 'dashboard',component:DashboardComponent},
        { path: 'progress',component:ProgressComponent},
        { path: 'grafica1',component:Graficas1Component},
        { path: '', redirectTo:'/dashboard', pathMatch:'full'}, //Ruta vacia redirecciona
    ]

},
//Si ponemos login redirecciona al login
{ path: 'login',component:LoginComponent},
{ path: 'register',component:RegisterComponent},
{ path: 'progress',component:ProgressComponent},


{ path: '**', component:NopagefoundComponent}//Si no es ninguna de estas rutas se ira a No page Found
]
//forRoot  son rutas principales
//Uso de hash
export const APP_ROUTES=RouterModule.forRoot(appRoutes,{useHash:true});

