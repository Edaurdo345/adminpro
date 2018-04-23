import  {RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';


const appRoutes:Routes=[

//Si ponemos login redirecciona al login
{ path: 'login',component:LoginComponent},
{ path: 'register',component:RegisterComponent},
{ path: '**', component:NopagefoundComponent}//Si no es ninguna de estas rutas se ira a No page Found
]
//forRoot  son rutas principales
//Uso de hash
export const APP_ROUTES=RouterModule.forRoot(appRoutes,{useHash:true});

