export class Publicacion {

    Autor: number
    Nombre: string
    Curso:string
    Catedratico: string
    Mensaje: string
    FechaHora: string

    constructor(_Autor: number, _Nombre:string,_Curso: string, _Catedratico:string,_Mensaje: string, _FechaHora: string) {
        this.Autor = _Autor
        this.Nombre=_Nombre
        this.Curso = _Curso
        this.Catedratico = _Catedratico
        this.Mensaje = _Mensaje
        this.FechaHora = _FechaHora
    }
}
