import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicacionesComponent } from './components/Publicaciones/Publicaciones.component';
import { PerfilComponent } from './components/Perfil/Perfil.component';
import { LoginComponent } from './components/Login/Login.component';
import { CrearComponent } from './components/Crear/Crear.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicacionesComponent,
    PerfilComponent,
    LoginComponent,
    CrearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
