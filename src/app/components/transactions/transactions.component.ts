import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentService } from '../component.service';
import { ReactiveFormsModule } from '@angular/forms';
import { dataUsuario } from '../../interfaces/dataUsuario.interface';
import { AuthService } from '../../auth/services/auth-service.service';
@Component({
  selector: 'app-transactions',
  imports: [ReactiveFormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export default class TransactionsComponent {
  transferForm!: FormGroup;
  message: string = '';
  isLoading = false;
  user!: dataUsuario

  constructor(private fb: FormBuilder, private componentService: ComponentService, private authService:AuthService) { }

  ngOnInit() {
    //obtener la data del usuario logueado}
    this.authService.user$.subscribe((user: dataUsuario | any) => {
      
      this.user = user;
      console.log(this.user); 
    });

    //obtener el usuaio logueado para obtener el email
    const fromUsername = localStorage.getItem('email');



    this.transferForm = this.fb.group({
      fromUsername: [fromUsername],
      
      totpToken: ['', Validators.required],
      toUsername: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      description: ['']
    });
  }

  async submit() {
    if (this.transferForm.invalid) return;

    this.message = '';
    this.isLoading = true;

    try {
      const {
        email,
        totpToken,
        fromUsername,
        toUsername,
        amount,
        description
      } = this.transferForm.value;

      const result = this.componentService.realizarTransferencia(email, amount, totpToken, description, fromUsername, toUsername);
      console.log(result);
      this.message = 'Transferencia realizada con éxito.';
    } catch (err: any) {
      console.error(err);
      this.message = 'Error en la transferencia: ' + (err?.error?.message || 'verificá los datos.');
    } finally {
      this.isLoading = false;
    }
  }
}
