import { Component, OnInit } from '@angular/core';
import { DatosService } from "../../services/Datos/Datos.service";
import { Tienda } from "../../models/Tienda/Tienda";

@Component({
  selector: 'app-Crear',
  templateUrl: './Crear.component.html',
  styleUrls: ['./Crear.component.css']
})
export class CrearComponent implements OnInit {

  Tiendas: Tienda[]=[]
  FileTiendas:File
  FileInventario:File
  FilePedidos:File

  constructor(private DatosService: DatosService) {

  }

  ngOnInit(): void {
  }


}

