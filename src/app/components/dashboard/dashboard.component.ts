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
  transactions!: dataTransactions[];

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

      this.componentService.getUserDetails(alias, totpToken).subscribe((response: any) => {
        console.log(response.transactions);
        if (response.success) {
          this.transactions = response.transactions;
          this.cdr.detectChanges();
          console.log(this.transactions[0]);
        } else {
          console.error('Error fetching user details');
        }
      });
    });
    // this.getItemsFromLocalStorage().then((items) => {
    //   const alias = items.alias;
    //   const totpToken = items.totpToken;
    //   console.log(alias, totpToken);

    //    this.componentService.getUserDetails(alias, totpToken).then((response: any) => {
    //     console.log(response.transactions);
    //     if (response.success) {
    //       this.transactions = response.transactions;
    //       console.log(this.transactions);
    //     } else {
    //       console.error('Error fetching user details');
    //     }
    //   })
    // })

    
  }

  async getItemsFromLocalStorage() {
    const alias = localStorage.getItem('alias');
    const totpToken = localStorage.getItem('totpToken');
    return { alias, totpToken };

    
  }

  
}
