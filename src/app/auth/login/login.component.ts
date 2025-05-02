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

  constructor( private fb: FormBuilder, private router: Router) {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      codigo: ['', [Validators.required, Validators.minLength(6)]],
      alias: ['', [Validators.required, Validators.minLength(3)]], 
    });
  }

  onSubmit() {
    console.log(this.LoginForm.value);
    if(this.LoginForm.valid) {
      console.log(this.LoginForm.value);
      //aca deberiamos hacer la llamada al servicio de login, y si es correcto, redirigir a la pagina de dashboard
      //y escribir el token en el localStorage o sessionStorage, para que el guard lo pueda leer y redirigir a la pagina de login si no es correcto

      // this.authService.login(this.LoginForm.value).subscribe(
      //   response => {
      //     console.log(response);
      //     // Redirigir a la pagina de dashboard
      //     this.router.navigate(['/dashboard']);
      //   },
      //   error => {
      //     console.log(error);
      //     // Mostrar mensaje de error
      //     this.errorMessage = 'Usuario o contraseña incorrectos';
      //   }
      // );

    }
  }

  show:boolean = false;

  showPassword() {
    this.show = !this.show;
  }
}
