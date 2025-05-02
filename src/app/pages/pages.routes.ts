import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from '../auth/guards/guard.guard'; 
//este es el guard que protege la ruta de dashboard, hay que verificar si esta funcionando correctamente y si
// el token es el correcto, ya que no se esta guardando en ningun lado, solo se guarda el usuario en el localStorage

export const PAGES_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [authGuard], // Descomentar si se quiere proteger la ruta
  }
];
