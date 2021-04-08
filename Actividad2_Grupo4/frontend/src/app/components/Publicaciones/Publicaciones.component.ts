import { Component, OnInit } from '@angular/core';
import { DatosService } from "../../services/Datos/Datos.service";
import { Publicacion } from "../../models/Publicacion/Publicacion";
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from "../../models/Usuario/Usuario";
import { Curso } from "../../models/Curso/Curso";

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


  Cursos = [{ Codigo: 285, Nombre: "Sistemas operativos 2", Creditos: 4, },
  { Codigo: 975, Nombre: "Redes de computadoras 2", Creditos: 4, },
  { Codigo: 775, Nombre: "Sistemas de bases de datos 2", Creditos: 4, },
  { Codigo: 283, Nombre: "Analisis y disenio de sistemas 1", Creditos: 5, },
  { Codigo: 797, Nombre: "Seminario de sistemas 1", Creditos: 3, },
  { Codigo: 729, Nombre: "Modelacion y simulacion 1", Creditos: 5, },
  { Codigo: 786, Nombre: "Sistemas organizacionales y gerenciales 1", Creditos: 4, },
  { Codigo: 972, Nombre: "Inteligencia artificial 1", Creditos: 4, },
  { Codigo: 785, Nombre: "Analisis y disenio de sistemas 2", Creditos: 4, },
  { Codigo: 798, Nombre: "Seminario de sistemas 2", Creditos: 3, },
  { Codigo: 2009, Nombre: "Practica Final", Creditos: 0, },
  { Codigo: 787, Nombre: "Sistemas organizacionales y gerenciales 2", Creditos: 4, },
  { Codigo: 720, Nombre: "Modelacion y simulacion 2", Creditos: 5, },
  { Codigo: 780, Nombre: "Software avanzado", Creditos: 6, },
  { Codigo: 799, Nombre: "Seminario de investigacion", Creditos: 3, },
  { Codigo: 722, Nombre: "Teoria de Sistemas 1", Creditos: 5, },
  { Codigo: 14, Nombre: "Economia", Creditos: 4, },
  { Codigo: 781, Nombre: "Organizacion de Lenguajes y Compiladores 2", Creditos: 5, },
  { Codigo: 778, Nombre: "Arquitectura de Computadoras y Ensambladores 1", Creditos: 5, },
  { Codigo: 773, Nombre: "Manejo e Implementacion de Archivos", Creditos: 4, },
  { Codigo: 724, Nombre: "Teoria de Sistemas 2", Creditos: 5, },
  { Codigo: 281, Nombre: "Sistemas Operativos 1", Creditos: 5, },
  { Codigo: 779, Nombre: "Arquitectura de Computadoras y Ensambladores 2", Creditos: 4, },
  { Codigo: 970, Nombre: "Redes de Computadoras 1", Creditos: 4, },
  { Codigo: 774, Nombre: "Bases de Datos 1", Creditos: 5, },
  { Codigo: 7955, Nombre: "Lógica de Sistemas", Creditos: 2, },
  { Codigo: 960, Nombre: "Mate Computo 1", Creditos: 5, },
  { Codigo: 770, Nombre: "Introduccion a la Prog. y computacion 1", Creditos: 4, },
  { Codigo: 796, Nombre: "Lenguajes formales y de Prog.", Creditos: 3, },
  { Codigo: 962, Nombre: "Mate computo 2", Creditos: 5, },
  { Codigo: 2025, Nombre: "Practica inicial", Creditos: 0, },
  { Codigo: 777, Nombre: "Org. Lenguajes y compiladores 1", Creditos: 4, },
  { Codigo: 964, Nombre: "Organización computacional", Creditos: 3, },
  { Codigo: 772, Nombre: "Estructura de datos", Creditos: 5, }
  ];

  Codigos = []

  //Para el perfil
  Registro: number;
  Nombres: string;
  Apellidos: string;
  Contrasenia: string;
  Correo: string;
  Creditos: number

  //Para el otro perfil
  OtroRegistro: number;
  OtroNombres: string;
  OtroApellidos: string;
  OtroContrasenia: string;
  OtroCorreo: string;

  //Para los cursos
  CursoCodigo: number;
  CursoNombre: string;
  CursoCreditos: number;
  CursosAprobados: Curso[] = []
  CursosAprobadosOtro: Curso[] = []
  Total: number

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
    this.GetUsuario(this.route.snapshot.paramMap.get('Registro'));
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
        this.OtroRegistro = this.Usuario.Registro
        this.GetCursos(this.OtroRegistro)
        this.CursosAprobados = this.CursosAprobadosOtro
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

  AgregarCurso() {
    if (this.CursoCodigo == null || this.CursoNombre == "" || this.CursoCreditos == null) {
      return
    }
    var Curso: Curso = {
      Usuario: this.Registro,
      Codigo: this.CursoCodigo,
      Nombre: this.CursoNombre,
      Creditos: this.CursoCreditos
    }
    if (this.ExisteCurso(Curso.Codigo)) {
      alert("Este curso ya se registró")
      return
    }
    console.log(Curso)
    this.DatosService.AgregarCurso(Curso).subscribe(() => {
      alert("Se agregó el curso")
      //window.location.reload()
      this.ACursos();
    }, (err) => {
      alert("No se pudo agregar el curso")
    })
  }

  GetCursos(Registro) {
    var Busqueda = {
      Usuario: Registro
    }
    console.log(Curso)
    this.DatosService.GetCursos(Busqueda).subscribe((dataList: any) => {
      this.CursosAprobadosOtro = dataList.Cursos
      if (Registro == this.Registro) {
        this.CursosAprobados = dataList.Cursos
      }
      console.log(this.CursosAprobadosOtro)
      this.SumarCreditos()
      this.IngresarCodigos();
    }, (err) => {
      alert("No se cargaron los cursos")
    })

  }

  SumarCreditos() {
    var total = 0;
    for (let i = 0; i < this.CursosAprobadosOtro.length; i++) {
      total += this.CursosAprobadosOtro[i].Creditos
      console.log("total" + total)
    }
    this.Total = total
  }

  ExisteCurso(Codigo) {
    for (let i = 0; i < this.CursosAprobados.length; i++) {
      if (this.CursosAprobados[i].Codigo == Codigo) {
        return true
      }
    }
    return false
  }


  SeleccionarCurso(Codigo) {
    console.log("selec")
    console.log(Codigo)
    for (let i = 0; i < this.Cursos.length; i++) {
      if (this.Cursos[i].Codigo == Codigo) {
        this.CursoCodigo = this.Cursos[i].Codigo
        this.CursoCreditos = this.Cursos[i].Creditos
        this.CursoNombre = this.Cursos[i].Nombre
        break
      }
    }
  }

  IngresarCodigos() {
    this.Codigos = [];
    for (let i = 0; i < this.Cursos.length; i++) {
      if (!this.ExisteCurso(this.Cursos[i].Codigo)) {
        this.Codigos.push(this.Cursos[i].Codigo)
      }
    }
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

  ACursos() {
    this.GetCursos(this.Registro)
    this.IngresarCodigos();
    this.OtroRegistro=this.Registro
    this.CursoNombre = ""
    this.CursoCodigo = null
    this.CursoCreditos = null
    this.Estado = "Cursos"
  }

}

