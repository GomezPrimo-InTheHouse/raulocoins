import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.raulocoins.com/api'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, totpToken: string): Observable<any> {
    const body = { username, totpToken };

    return this.http.post(`${this.apiUrl}/verify-totp-setup`, body).pipe(
      tap(response => {
        // Guardamos token local (simulado o real, según backend)
        localStorage.setItem('user', JSON.stringify({ username }));
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
