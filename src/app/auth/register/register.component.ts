import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registerForm:FormGroup
  successMessage: string | null = null;



  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      // nombre correo alias
      alias: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required, Validators.minLength(6)]],
      
    },
    {
      validators: [this.passwordsMatchValidator]  // 👈 Validación personalizada
    }
  );
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  onSubmit(){
    // console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      // console.log('Registrado con éxito', this.registerForm.value.alias);
      let alias = this.registerForm.value.alias;
      let email = this.registerForm.value.email;
      
      this.successMessage = `✅ Registro exitoso. ¡Bienvenido a nuestra plataforma, 
      ${alias}! Por favor ingrese a la casilla de correo 
      ${email} para confirmar su identidad.`;


    } else {
      this.registerForm.markAllAsTouched();
    }
      this.registerForm.reset();
  
  }
}
