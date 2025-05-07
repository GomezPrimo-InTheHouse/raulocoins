import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('totpToken'); 

  if (!isLoggedIn) {
    // Redirige al login si no está logueado
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }

  return true;
};

// Esto usa localStorage para guardar un token. 
// Podés usar sessionStorage o algún servicio con variables reactivas si querés algo más robusto.