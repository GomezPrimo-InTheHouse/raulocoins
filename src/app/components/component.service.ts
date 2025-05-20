import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap , switchMap} from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
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
          this.userDetailsCache = response; 
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

   verifyToken(email:string, totpToken: string): Observable<any> {
    const body = {
      username: email,
      totpToken: totpToken
    }

    return this.http.post(`${this.apiUrl}/api/verify-token`, body);

   }

   sendTransfer(
  fromUsername: string,
  toUsername: string,
  amount: number,
  description: string,
  operationToken: string,

    ): Observable<any> {
    const body = {
      fromUsername,
      toUsername,
      amount,
      description,
      operationToken
    };

  return this.http.post(`${this.apiUrl}/api/transfer`, body);
}
   
   realizarTransferencia(email: string, amount: any, totpToken: any, description:string, fromUsername:any, toUsername:any): void {

    
    
    this.verifyToken(email, totpToken)
      .pipe(
        switchMap((rta:any) => {
          const operationToken = rta?.operationToken;

          if (!operationToken) {
            throw new Error('Token de operación no recibido');
          }
          // Si verifyToken fue exitoso y operationToken existe, pasao a hacer la transferencia
          return this.sendTransfer(toUsername, fromUsername, amount, description, operationToken, );
        }),
        catchError((error:any) => {
          // Si falla verifyToken o sendTransfer, se captura acá

          console.error('Error durante el proceso:', error);
          return of(null); // o lanzar otra lógica
        })
      )
      .subscribe(result => {
        if (result) {
          console.log('Transferencia exitosa:', result);
          // Podés mostrar un mensaje, navegar, etc.
        } else {
          console.log('Fallo en la verificación o transferencia.');
        }
      });
  }
 
}
