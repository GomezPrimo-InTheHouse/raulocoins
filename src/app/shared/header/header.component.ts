import { Component } from '@angular/core';
import { AuthService, userData } from '../../auth/services/auth-service.service';

@Component({
  selector: 'app-header',
  imports: [],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user!:userData;

  constructor(private authService: AuthService) { }

    logout() {
    this.authService.logout();
    
  }

  ngOnInit() {
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
      
    })
  }
}
