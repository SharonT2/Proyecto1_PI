import { Component, OnInit } from '@angular/core';
import { DatosService } from "../../services/Datos/Datos.service";
import { Usuario } from "../../models/Usuario/Usuario";

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  Estado:string
  static Nombre: string;
  Registro:number;
  Nombres:string;
  Apellidos:string;
  Contrasenia:string;
  Correo:string;

  constructor(private DatosService: DatosService) {
    this.Estado="Login"
  }

  ALogin(){
    this.Estado="Login"
  }

  ARegistrar(){
    this.Estado="Registrar"
  }

  AReestablecer(){
    this.Estado="Reestablecer"
  }

  IniciarSesion(){
    window.location.href="/Publicaciones"
  }

  ngOnInit(): void {
  }

  Registrar(){
    var Usuario: Usuario={
      Registro:this.Registro,
      Nombres:this.Nombres,
      Apellidos:this.Apellidos,
      Contrasenia:this.Contrasenia,
      Correo:this.Correo
    }
    this.DatosService.Registrar(Usuario).subscribe((dataList: any) => {
      console.log(dataList)
    }, (err) => {
      console.log("No se pudo cargar inventario")
    })
  }


  probar(){
    alert(this.Nombres)
    alert(this.Registro)
  }


}

