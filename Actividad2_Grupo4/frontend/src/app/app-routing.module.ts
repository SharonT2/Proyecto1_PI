import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicacionesComponent } from "./components/Publicaciones/Publicaciones.component";
import { LoginComponent } from './components/Login/Login.component';
import { PerfilComponent } from './components/Perfil/Perfil.component';
import { CrearComponent } from './components/Crear/Crear.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'Publicaciones',
    component: PublicacionesComponent,
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Perfil',
    component: PerfilComponent,
  },
  {
    path: 'Crear',
    component: CrearComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
