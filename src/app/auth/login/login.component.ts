import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor( private fb: FormBuilder) {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log(this.LoginForm.value);
    if(this.LoginForm.valid) {
      console.log(this.LoginForm.value);
      
    }
  }

  show:boolean = false;

  showPassword() {
    this.show = !this.show;
  }
}
