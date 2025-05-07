// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {routes} from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), 
  ],
}).catch(err => console.error(err));


// El decorador @Injectable({ providedIn: 'root' }) en tu servicio hace que Angular intente inyectar automáticamente HttpClient,
// pero si no hay un proveedor global (provideHttpClient()), Angular no puede crearlo,
// lo que dispara el error:


// NullInjectorError: No provider for _HttpClient!
