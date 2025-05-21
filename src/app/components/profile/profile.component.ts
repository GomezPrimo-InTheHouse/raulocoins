import { Component } from '@angular/core';
import { dataUsuario} from '../../interfaces/dataUsuario.interface';
import { dataTransactions } from '../../interfaces/dataTransactions.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth-service.service';
@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export default class ProfileComponent {

transactions!: dataTransactions[];
user!: dataUsuario;

constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe((user: dataUsuario | any) => {
      this.user = user;
    });

    this.authService.transactions$.subscribe((transactions: dataTransactions[] | any) => {
      this.transactions = transactions;
    });
  }

}
