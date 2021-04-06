import { Component, OnInit } from '@angular/core';
import { DatosService } from "../../services/Datos/Datos.service";
import { Tienda } from "../../models/Tienda/Tienda";
import { Producto } from "../../models/Producto/Producto";
import { Busqueda } from "../../models/Busqueda/Busqueda";
import { LoginComponent } from '../Login/Login.component';

@Component({
  selector: 'app-Publicaciones',
  templateUrl: './Publicaciones.component.html',
  styleUrls: ['./Publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {

  Nombre:string
  Tienda:string;
  Departamento: string;
  Publicaciones: Tienda[] = []
  Productos: Producto[] = []
  Estado: string;
  Arbol: string;

  constructor(private DatosService: DatosService) {
    this.DatosService.GetTiendas().subscribe((dataList: any) => {
      this.Publicaciones = dataList.Publicaciones
      console.log(dataList)
      console.log(this.Publicaciones[0].Nombre)
      this.Nombre=LoginComponent.Nombre
      this.Estado = "Publicaciones"
    }, (err) => {
      console.log("no hay Publicaciones")
    })
  }

  ngOnInit(): void {
  }

  probar(value){
    if(value=="probar1"){
    alert("prueba1")
    }
    if(value=="probar2"){
      alert("prueba2")
      }
  }

  probar1(){
    alert("prueba1")
  }

  probar2(){
    alert("prueba1")
  }

  INV(Tienda: Tienda) {
    this.Tienda=Tienda.Nombre
    this.Departamento=Tienda.Departamento
    var Busqueda: Busqueda = {
      Tienda: Tienda.Nombre,
      Departamento: Tienda.Departamento,
      Calificacion: Tienda.Calificacion
    }
    this.Arbol = Tienda.Nombre + "---" + Tienda.Departamento + "---" + Tienda.Calificacion + ".png"
    console.log(Busqueda);
    this.DatosService.GetInventario(Busqueda).subscribe((dataList: any) => {
      this.Productos = dataList.Productos
      console.log(dataList)
      this.Estado = "Productos"
    }, (err) => {
      console.log("No se pudo cargar inventario")
    })
  }

  Comprar(Producto: Producto) {
    this.DatosService.Comprar(Producto).subscribe((res: any) => {
      if (Producto.Cantidad > 0) {
        Producto.Cantidad--
      }
    }, (err) => {
      console.log("Ocurrio un error")
    })
  }

  Regresar() {
    this.Estado = "Publicaciones"
  }

}

