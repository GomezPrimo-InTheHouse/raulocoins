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
  newBalance!: number;

  apiUrl = 'https://raulocoin.onrender.com';

  constructor( private authService: AuthService, private componentService:ComponentService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.authService.user$.subscribe((user: dataUsuario | any) => {
      
      this.user = user;
      
    });

    

    this.authService.transactions$.subscribe((transactions: dataTransactions[] | any) => {
      this.transactions = transactions;
     
    });

    


  }

  

  
}
