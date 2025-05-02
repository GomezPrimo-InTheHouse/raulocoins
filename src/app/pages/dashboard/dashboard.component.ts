import { Component } from '@angular/core';
import { HomeComponent } from '../../components/home/home.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
@Component({
  selector: 'app-dashboard',
  imports: [HomeComponent, HeaderComponent, FooterComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
