import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicacionesComponent } from "./components/Publicaciones/Publicaciones.component";
import { LoginComponent } from './components/Login/Login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, },
  { path: 'Publicaciones/:Registro', component: PublicacionesComponent, },
  { path: 'Login', component: LoginComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
