import { Component } from '@angular/core';
import { AuthService} from '../../auth/services/auth-service.service';
import { dataUsuario} from '../../interfaces/dataUsuario.interface';
import { ComponentService } from '../component.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { dataTransactions } from '../../interfaces/dataTransactions.interface';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  imports: [NgFor, CommonModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  userInfo: any
  user!: dataUsuario
  transactions!: dataTransactions[] ;

  apiUrl = 'https://raulocoin.onrender.com';

  constructor( private authService: AuthService, private componentService:ComponentService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.authService.user$.subscribe((user: dataUsuario | any) => {
      
      this.user = user;
      console.log(this.user); 
    });

    


    this.getItemsFromLocalStorage().then((items) => {
      const alias = items.alias;
      const totpToken = items.totpToken;
      console.log(alias, totpToken);

      

      // inicio de solucion
    this.componentService.getUserDetailsOnce(alias, totpToken).subscribe((response: any) => {
      if (response?.transactions) {
        console.log(response.transactions);
        this.transactions = response.transactions;
      } else {
        console.warn('No se pudieron obtener las transacciones');
      }
    });
    // fin
    });
    
    console.log(this.transactions);
  }

  async getItemsFromLocalStorage() {
    const alias = localStorage.getItem('alias');
    const totpToken = localStorage.getItem('totpToken');
    return { alias, totpToken };

    
  }

  
}
