import { Component } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SidebarComponent,FooterComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {

}
