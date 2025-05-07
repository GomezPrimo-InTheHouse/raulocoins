import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
//importar apiUrl desde el environment.ts
  private apiUrl = 'https://raulocoin.onrender.com';
  constructor(private http:HttpClient) { }

  getUserDetails(alias: any, totpToken: any) {
    const body = {
      username: alias,
      totpToken: totpToken
    }
    return this.http.post(`${this.apiUrl}/api/transactions`, body);
  }

 
}
