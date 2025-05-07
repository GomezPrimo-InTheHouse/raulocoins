import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject } from 'rxjs';

export interface userData {
  balance: number;
  createdAt: number; 
  id: number;
  isVerified: boolean;
  name: string;
  totpVerified: boolean;
  userType: string;
  email: string;
  alias: string;
  username: string;

}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  private apiUrl = 'https://raulocoin.onrender.com'; 

  private userSubject = new BehaviorSubject<userData[]>([]);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(alias: string, totpToken: string, email:string): Observable<any> {
    const body ={
      username: alias,
      totpToken: totpToken
    }
    let userEmail:string | any = email

    return this.http.post(`${this.apiUrl}/api/user-details`, body).pipe(
      tap(async (response: any) =>{
        
        console.log(response);
        // emitir los datos del usuario mediante un behaviorSubject
        if(response.success){
          this.setUser(response.user);

          await this.searchUsers(body.username).then((responseFromBack: any) => {
            console.log(responseFromBack);
            // if (responseFromBack.success) {
              
              

            // } else {
            //   console.error('Error fetching user details');
            // }
          })
          
        }
        // localStorage.setItem('user', JSON.stringify({ username }));



      }
    )
  )}

 

  async searchUsers(alias: string): Promise<any> {
    console.log(alias)
    const params = new HttpParams().set('q', alias);
    console.log(params)
    return this.http.get<any>(`${this.apiUrl}/search-users`, { params });
  }

  
  setUser(userData: any) {
    this.userSubject.next(userData);
  }

  getCurrentUser() {
    return this.userSubject.getValue();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['auth/login']);
  }
}
