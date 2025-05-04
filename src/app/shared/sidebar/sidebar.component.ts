import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgClass, NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', link: '/home/dashboard' },
    { label: 'Profile', link: '/home/profile' },
    { label: 'Settings', link: '/home/transactions' },
  ]
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
