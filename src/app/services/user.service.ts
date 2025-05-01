import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { User, SearchUsersResponse } from '../models/user.models';

import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
private readonly API_URL = 'https://api.raulocoins.com'

//primera inyeccion de dependencias, inyectamos el HttpClient para poder hacer peticiones http.
  constructor(private http: HttpClient) { }

  // Inyectamos el SearchUsersResponse para poder manejar las respuestas de la peticion http.
 
  // Declaramos el Observable para poder manejar las respuestas de la peticion http.

  searchUsers(termino: string): Observable<SearchUsersResponse> {

    if (termino.length < 3) {
      throw new Error('La búsqueda requiere al menos 3 caracteres.');
    }
    // inyectamos el HttpParams para poder manejar los parametros de la petcion http
    const params = new HttpParams().set('q', termino);
    const response = this.http.get<SearchUsersResponse>(`${this.API_URL}/search-users`, { params });
    
    console.log(response);

    return response; 
    //si o si todos los observables deben retornar alguna respuesta, sino tiene un error


  }
}

