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
      console.log(data);
      //console.log(LoginComponent.Usuario.Nombres)
      if(data.Usuario!=null){
        //alert("Bienvenido "+LoginComponent.Usuario.Nombres)
        //routerLink="/tutorials/{{ currentTutorial.id }}"
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
    this.DatosService.Registrar(Usuario).subscribe((dataList: any) => {
      console.log(dataList)
    }, (err) => {
      console.log("No se pudo registrar el usuario")
    })
  }

  probar() {
    alert(this.Nombres)
    alert(this.Registro)
  }

}

