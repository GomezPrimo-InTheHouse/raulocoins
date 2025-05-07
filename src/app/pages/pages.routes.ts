import { Routes } from '@angular/router';



import { authGuard } from '../auth/guards/guard.guard'; 

//este es el guard que protege la ruta de dashboard, hay que verificar si esta funcionando correctamente y si
// el token es el correcto, ya que no se esta guardando en ningun lado, solo se guarda el usuario en el localStorage

export const PAGES_ROUTES: Routes = [

{
  path: '',
  loadComponent: () => import('./home/home.component'),
  // canActivate: [authGuard], // Protege la ruta de dashboard, si no hay token, redirige al login
  children:[
    {
      path: 'dashboard',
      loadComponent: () => import('../components/dashboard/dashboard.component'),
      //aca podria ir un guard perteneciente al dashboard, y de acuerdo a los roles, mostrar o no el componente
    },
   {
    path: 'profile',
    loadComponent: () => import('../components/profile/profile.component'),
   },
   {
    path: 'tables',
    loadComponent: () => import('../components/tables/tables.component'),
   },
   {
    path:'transactions',
    loadComponent: () => import('../components/transactions/transactions.component'),
   }
   

  ]
  
}

  

];
