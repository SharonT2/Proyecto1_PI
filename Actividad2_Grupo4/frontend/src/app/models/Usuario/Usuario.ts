export class Usuario {

    Registro: number
    Nombres: string
    Apellidos: string
    Contrasenia: string
    Correo: string

    constructor(_Registro: number, _Nombres: string,
        _Apellidos: string, _Contrasenia:string, 
        _Correo: string) {
        this.Registro=_Registro
        this.Nombres = _Nombres
        this.Apellidos = _Apellidos
        this.Contrasenia = _Contrasenia
        this.Correo = _Correo
    }

}
