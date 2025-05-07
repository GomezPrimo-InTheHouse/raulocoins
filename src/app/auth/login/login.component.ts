import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  // No es necesaria la importacion de FormBuilder, FormGroup Ni Validators, en el decorador @Component, ya que se importan en el constructor
  // y se utilizan en el template del componente.
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Creo el FORMGROPUP para el formulario de login
  // Se importa el ReactiveFormsModule y se inyecta el FormBuilder en el constructor
  LoginForm: FormGroup;

  constructor( private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      codigo: ['', [Validators.required, Validators.minLength(6)]],
      alias: ['', [Validators.required, Validators.minLength(3)]], 
    });
  }

  async onSubmit() {
  
    if(this.LoginForm.valid) {
      
      //aca deberiamos hacer la llamada al servicio de login, y si es correcto, redirigir a la pagina de dashboard
      //y escribir el token en el localStorage o sessionStorage, para que el guard lo pueda leer y redirigir a la pagina de login si no es correcto

      let alias:any = this.LoginForm.value.alias;
      let codigo:any = this.LoginForm.value.codigo;
      let email:any = this.LoginForm.value.email;

      localStorage.setItem('totpToken',codigo );
      localStorage.setItem('alias', alias);
      localStorage.setItem('email', email);
      
      this.authService.login(alias, codigo, email).subscribe(
        (response:any) => {
         

          if(response.success){



            // Guardamos el token en el localStorage
            

            this.router.navigate(['home/dashboard']);
          }
          // Redirigir a la pagina de dashboard
        }
        
      );

    }
  }

  show:boolean = false;

  showPassword() {
    this.show = !this.show;
  }
}
