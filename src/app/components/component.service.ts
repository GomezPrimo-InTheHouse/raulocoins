import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap , switchMap, BehaviorSubject} from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
//importar apiUrl desde el environment.ts
  private apiUrl = 'https://raulocoin.onrender.com';
  private userDetailsCache: any = null
  
// private userSubject = new BehaviorSubject<userData[]>([]);
//   user$ = this.userSubject.asObservable();
  private newBalanceSubject = new BehaviorSubject<number>(0);
  newBalance$ = this.newBalanceSubject.asObservable();
  
  constructor(private http:HttpClient, private router:Router) { }

  getUserDetails(alias: any, totpToken: any) {
    const body = {
      username: alias,
      totpToken: totpToken
    }
    return this.http.post(`${this.apiUrl}/api/transactions`, body);
  }


   verifyToken(totpToken: string): Observable<any> {
    
    const body = {
      username: "jgp.raulo",
      totpToken: totpToken
    }
    // console.log('Verificando token, en CmpSERVICE:', body);
    return this.http.post(`${this.apiUrl}/api/verify-totp`, body);

   }

   sendTransfer(
  
  toUsername: string,
  amount: number,
  description: string,
  operationToken: string,

    ): Observable<any> {
    const body = {
      fromUsername : "jgp.raulo",
      toUsername,
      amount,
      description,
      operationToken
    };
    // console.log(`${this.apiUrl}/api/transfer`, body);
    // console.log('Cuerpo de la solicitud:', body);
  return this.http.post(`${this.apiUrl}/api/transfer`, body);
}
   
   realizarTransferencia( totpToken: any, toUsername:any, amount: any,  description:string,): void {

    
    
    this.verifyToken( totpToken)
    
      .pipe(
        switchMap((rta:any) => {
          const operationToken = rta?.operationToken;

          if (!operationToken) {
            throw new Error('Token de operación no recibido');
          }
          // Si verifyToken fue exitoso y operationToken existe, pasao a hacer la transferencia
          return this.sendTransfer(toUsername, amount, description, operationToken );
        }),
        catchError((error:any) => {
          // Si falla verifyToken o sendTransfer, se captura acá

          console.error('Error durante el proceso:', error);
          return of(null); // o lanzar otra lógica
        })
      )

      .subscribe((result:any) => {
        // console.log('Resultado de la transferencia:', result);
        // let newBalace = result?.from.newBalance;
        // como enviar este dato al dashboard mediante el observable ?

        // this.setNewBalance(newBalace);

        if (result) {
          // console.log('Transferencia exitosa:', result);
          // Podés mostrar un mensaje, navegar, etc.

          
          Swal.fire({
            title: "Transferencia exitosa",
            text: "La transferencia se realizó correctamente.",
            icon: "success",
            timer: 1500,

          }).then(()=> {
            this.router.navigate(['/home/dashboard']);
          })

        } else {
          // console.log('Fallo en la verificación o transferencia.');
        }
      });
  }

  getNewBalance(): Observable<number> {
    return this.newBalance$;
  }
 

  setNewBalance(newBalance: number) {
    this.newBalanceSubject.next(newBalance);
  
  }
}
