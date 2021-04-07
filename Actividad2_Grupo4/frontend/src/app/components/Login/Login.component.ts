import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { DatosService } from "../../services/Datos/Datos.service";
import { Usuario } from "../../models/Usuario/Usuario";

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  Estado: string
  public static Usuario:Usuario;
  Registro: number;
  Nombres: string;
  Apellidos: string;
  Contrasenia: string;
  Correo: string;

  constructor(private DatosService: DatosService) {
    this.Estado = "Login"
  }

  ALogin() {
    this.Registro = null;
    this.Nombres = "";
    this.Apellidos = "";
    this.Contrasenia = "";
    this.Correo = "";
    this.Estado = "Login"
  }

  ARegistrar() {
    this.Registro = null;
    this.Nombres = "";
    this.Apellidos = "";
    this.Contrasenia = "";
    this.Correo = "";
    this.Estado = "Registrar"
  }

  AReestablecer() {
    this.Registro = null;
    this.Nombres = "";
    this.Apellidos = "";
    this.Contrasenia = "";
    this.Correo = "";
    this.Estado = "Reestablecer"
  }

  IniciarSesion(){
    var Busqueda = {
      Registro: this.Registro,
      Contrasenia: this.Contrasenia
    }
    this.DatosService.IniciarSesion(Busqueda).subscribe(data => {
      LoginComponent.Usuario = data.Usuario;
      if(data.Usuario!=null){
        window.location.href="/Publicaciones/"+LoginComponent.Usuario.Registro
      }else{
        alert("No existe")
      }
    },
    error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
  }

  Registrar() {
    var Usuario: Usuario = {
      Registro: this.Registro,
      Nombres: this.Nombres,
      Apellidos: this.Apellidos,
      Contrasenia: this.Contrasenia,
      Correo: this.Correo
    }
    this.DatosService.Registrar(Usuario).subscribe(() => {
      alert("Se registró el usuario")
    }, (err) => {
      alert("No se pudo registrar el usuario")
    })
  }

  Reestablecer(){

    var Cuenta = {
      Contrasenia: this.Contrasenia,
      Registro: this.Registro,
      Correo: this.Correo
    }
    this.Buscar(Cuenta.Registro,Cuenta.Correo)
    this.DatosService.Reestablecer(Cuenta).subscribe(() => { 
    }, (err) => {
      alert("No se pudo reestablecer contraseña")
    })
  }

  //Para validar
  Buscar(Registro, Correo) {
    var Busqueda = {
      Registro: Registro
    }
    var Usuario: Usuario = null
    this.DatosService.Buscar(Busqueda).subscribe(data => {
      Usuario = data.Usuario;
      if (Correo!=Usuario.Correo) {
        alert("Datos Incorrectos")
      }else if(this.Contrasenia!=""){
        alert("Se reestableció contraseña")
      }
    },
      error => {
        console.log(error);
      });
  }

}

