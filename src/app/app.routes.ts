import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full' // Redirecciona automáticamente al login
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/pages.routes').then(m => m.PAGES_ROUTES)
      },
      {
        path: '**',
        redirectTo: 'auth/login'  // Si hay una ruta no válida, redirige al login
      }
];
