import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../../apiURL/baseURL";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  
  constructor(private http: HttpClient) { }

  IniciarSesion(data):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(baseURL + 'IniciarSesion', data, httpOptions);
  }

  Registrar(data):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(baseURL + 'Registrar', data, httpOptions);
  }

  GetUsuario(data):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(baseURL + 'GetUsuario', data, httpOptions);
  }

  GetPublicaciones():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<any>(baseURL + 'GetPublicaciones', httpOptions);
  }

  Crear(data):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(baseURL + 'Crear', data, httpOptions);
  }

  Comentar(data):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(baseURL + 'Comentar', data, httpOptions);
  }

  
  GetComentarios(data):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(baseURL + 'GetComentarios', data, httpOptions);
  }

}
