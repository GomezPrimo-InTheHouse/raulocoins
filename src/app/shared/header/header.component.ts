import { Component } from '@angular/core';
import { AuthService, userData } from '../../auth/services/auth-service.service';
import { SidebarService } from '../sharedServices/sidebar.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user!:userData;

  constructor(private authService: AuthService, public sidebarService:SidebarService) { }

    logout() {
    this.authService.logout();
    
  }

  ngOnInit() {
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
      
    })
  }
}
