import { Component, OnInit } from '@angular/core';
import { DatosService } from "../../services/Datos/Datos.service";
import { Publicacion } from "../../models/Publicacion/Publicacion";
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from "../../models/Usuario/Usuario";

@Component({
  selector: 'app-Publicaciones',
  templateUrl: './Publicaciones.component.html',
  styleUrls: ['./Publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {

  Nombre: string;
  Usuario: Usuario = null;
  Publicaciones: Publicacion[] = [];
  Estado: string;
  Curso: string;
  Catedratico: string;
  Mensaje: string;
  Comentario: string;
  ComentarPublicacion: string;
  VerComentarios: string;
  Comentarios: any[] = [];
  CadenaComentarios: string;
  CatedraticoFiltro: string = "";
  CursoFiltro: string = "";
  PublicacionesIniciales: Publicacion[] = []

  //Para el perfil
  Registro: number;
  Nombres: string;
  Apellidos: string;
  Contrasenia: string;
  Correo: string;

  //Para el otro perfil
  OtroRegistro: number;
  OtroNombres: string;
  OtroApellidos: string;
  OtroContrasenia: string;
  OtroCorreo: string;

  constructor(private DatosService: DatosService,
    private route: ActivatedRoute,
    private router: Router) {
    this.DatosService.GetPublicaciones().subscribe((dataList: any) => {
      this.Publicaciones = dataList.data
      this.PublicacionesIniciales = dataList.data
      this.Estado = "Publicaciones"
    }, (err) => {
      alert("No se cargaron publicaciones")
    })
  }

  ngOnInit(): void {
    this.GetUsuario(this.route.snapshot.paramMap.get('Registro'))
  }

  Name(Usuario: Usuario) {
    console.log(Usuario.Nombres)
    var cadena = Usuario.Nombres.split(" ")[0] + " " + Usuario.Apellidos.split(" ")[0]
    return cadena
  }

  GetUsuario(Registro) {
    var Busqueda = {
      Registro: Registro
    }
    this.DatosService.GetUsuario(Busqueda).subscribe(data => {
      this.Usuario = data.Usuario;
      if (data.Usuario != null) {
        this.Nombre = this.Name(this.Usuario)
        this.Registro = this.Usuario.Registro
        this.Nombres = this.Usuario.Nombres
        this.Apellidos = this.Usuario.Apellidos
        this.Contrasenia = this.Usuario.Contrasenia
        this.Correo = this.Usuario.Correo
      } else {
        alert("No existe usuario")
      }
    },
      error => {
        console.log(error);
      });
  }

  _formatDatetime(date: Date, format: string) {
    const _padStart = (value: number): string => value.toString().padStart(2, '0');
    return format
      .replace(/yyyy/g, _padStart(date.getFullYear()))
      .replace(/dd/g, _padStart(date.getDate()))
      .replace(/mm/g, _padStart(date.getMonth() + 1))
      .replace(/hh/g, _padStart(date.getHours()))
      .replace(/ii/g, _padStart(date.getMinutes()))
      .replace(/ss/g, _padStart(date.getSeconds()));
  }

  isValidDate(d: Date): boolean {
    return !isNaN(d.getTime());
  }

  formatDate(date: any): string {
    var datetime = new Date(date);
    return this.isValidDate(datetime) ? this._formatDatetime(datetime, 'yyyy-mm-dd hh:ii:ss') : '';
  }

  Fecha(FechaHora) {
    var fecha = this.formatDate(FechaHora).split(" ")[0]
    fecha = fecha.split("-")[2] + "-" + fecha.split("-")[1] + "-" + fecha.split("-")[0]
    return fecha
  }

  GetPublicaciones() {
    this.DatosService.GetPublicaciones().subscribe((dataList: any) => {
      this.Publicaciones = dataList.data.data
      this.Estado = "Publicaciones"
    }, (err) => {
      alert("No se cargaron publicaciones")
    })
  }


  Crear() {
    var Publicacion = {
      Autor: this.Usuario.Registro,
      Nombre: this.Nombre,
      Curso: this.Curso,
      Catedratico: this.Catedratico,
      Mensaje: this.Mensaje
    }
    this.DatosService.Crear(Publicacion).subscribe(() => {
      alert("Publicación creada")
    }, (err) => {
      alert("No se pudo crear publicacion")
    })
  }

  Comentar(Publicacion: Publicacion) {
    var Comentario = {
      Autor: this.Nombre,
      Mensaje: this.Comentario,
      Publicacion: this.formatDate(Publicacion.FechaHora)
    }
    console.log(Comentario)
    this.DatosService.Comentar(Comentario).subscribe(() => {
      alert("Comentario guardado")
    }, (err) => {
      alert("No se pudo crear comentario")
    })
  }

  GetComentarios(FechaHora) {
    var Publicacion = {
      FechaHora: this.formatDate(FechaHora)
    }
    this.DatosService.GetComentarios(Publicacion).subscribe(data => {
      this.Comentarios = data.Comentarios;
      var cadena = ""
      for (let i = 0; i < this.Comentarios.length; i++) {
        cadena += "Autor: " + this.Comentarios[i].Autor + "<br>\n" +
          "Publicado el " + this.formatDate(this.Comentarios[i].FechaHora) +
          "Comentario: " + this.Comentarios[i].Mensaje + "<br>\n"
      }
      this.CadenaComentarios = cadena
      if (data == null) {
        alert("Ocurrió un error")
      }
    },
      error => {
        console.log(error);
      });
  }

  Filtrar() {
    this.Publicaciones = this.PublicacionesIniciales
    var nuevo: Publicacion[] = []
    if (this.CursoFiltro != "" && this.CatedraticoFiltro != "") {
      for (let i = 0; i < this.Publicaciones.length; i++) {
        if (this.Publicaciones[i].Curso == this.CursoFiltro &&
          this.Publicaciones[i].Catedratico == this.CatedraticoFiltro &&
          !nuevo.includes(this.Publicaciones[i])) {
          nuevo.push(this.Publicaciones[i])
        }
      }
      this.Publicaciones = nuevo
    }

    else if (this.CatedraticoFiltro != "" && this.CursoFiltro == "") {
      for (let i = 0; i < this.Publicaciones.length; i++) {
        if (this.Publicaciones[i].Catedratico == this.CatedraticoFiltro && !nuevo.includes(this.Publicaciones[i])) {
          nuevo.push(this.Publicaciones[i])
        }
      }
      this.Publicaciones = nuevo
    }

    else if (this.CursoFiltro != "" && this.CatedraticoFiltro == "") {
      for (let i = 0; i < this.Publicaciones.length; i++) {
        if (this.Publicaciones[i].Curso == this.CursoFiltro &&
          !nuevo.includes(this.Publicaciones[i])) {
          nuevo.push(this.Publicaciones[i])
        }
      }
      this.Publicaciones = nuevo
    }
  }

  Actualizar() {
    var Cuenta: Usuario = {
      Registro: this.Registro,
      Nombres: this.Nombres,
      Apellidos: this.Apellidos,
      Contrasenia: this.Contrasenia,
      Correo: this.Correo
    }
    this.DatosService.Actualizar(Cuenta).subscribe(() => {
      alert("Se actualizó el perfil")
    }, (err) => {
      alert("No se pudo actualizar el perfil")
    })
  }

  Buscar(Registro) {
    var Busqueda = {
      Registro: Registro
    }
    var Usuario: Usuario = null
    this.DatosService.Buscar(Busqueda).subscribe(data => {
      console.log(data);
      Usuario = data.Usuario;
      if (data.Usuario != null) {
        this.OtroRegistro = Usuario.Registro
        this.OtroNombres = Usuario.Nombres
        this.OtroApellidos = Usuario.Apellidos
        this.OtroContrasenia = Usuario.Contrasenia
        this.OtroCorreo = Usuario.Correo
      } else {
        alert("No existe")
      }
    },
      error => {
        console.log(error);
      });
  }

  Regresar() {
    window.location.reload()
  }

  ACrear() {
    this.Curso = ""
    this.Catedratico = ""
    this.Estado = "Crear"
  }

  APerfil() {
    this.Estado = "Perfil"
  }
}

