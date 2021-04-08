export class Curso {

    Codigo: number
    Creditos: number
    Nombre: string
    Usuario:number

    constructor( _Codigo: number, _Creditos: number, 
        _Nombre: string,_Usuario: number) {
        this.Codigo = _Codigo
        this.Creditos = _Creditos
        this.Nombre = _Nombre
        this.Usuario = _Usuario
    }

}
