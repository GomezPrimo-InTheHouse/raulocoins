import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
//importar apiUrl desde el environment.ts
  private apiUrl = 'https://raulocoin.onrender.com';
  private userDetailsCache: any = null
  constructor(private http:HttpClient) { }

  getUserDetails(alias: any, totpToken: any) {
    const body = {
      username: alias,
      totpToken: totpToken
    }
    return this.http.post(`${this.apiUrl}/api/transactions`, body);
  }

  // inicio soclucion
  getUserDetailsOnce(alias: string | any, totpToken: string | any): Observable<any> {
    // Si ya cacheamos la respuesta, la devolvemos directamente
    if (this.userDetailsCache) {
      return of(this.userDetailsCache);
    }

    // Si no, hacemos la llamada por única vez
    const body = { username: alias, totpToken };
    return this.http.post(`${this.apiUrl}/api/transactions`, body).pipe(
      tap((response: any) => {
        if (response?.success) {
          this.userDetailsCache = response; // ✅ Guardamos la respuesta
        }
      }),
      catchError((error) => {
        console.error('Error en getUserDetailsOnce', error);
        return of(null);
      })
    );
  }

  // Para obtener lo cacheado sin repetir llamada
  getCachedUserDetails(): any {
    return this.userDetailsCache;
  }

  // Para limpiar si cerrás sesión o reiniciás
  clearUserDetailsCache() {
    this.userDetailsCache = null;
  }

  // fin soclucion

 
}
