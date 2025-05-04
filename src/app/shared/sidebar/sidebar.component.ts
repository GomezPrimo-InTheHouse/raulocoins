import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router) {}

  

  // goToProfile() {
  //   this.router.navigate(['/home/profile']);
  // }
  goToTables() {
    this.router.navigate(['/home/tables']);
  }
 
  // goToDashboard() {
  //   this.router.navigate(['/home/dashboard']);
  // }


}
