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
  newBalance!: number;

  constructor(private fb: FormBuilder, private componentService: ComponentService, private authService:AuthService) { }

  ngOnInit() {
    //obtener la data del usuario logueado}
    this.authService.user$.subscribe((user: dataUsuario | any) => {
      
      this.user = user;
      console.log(this.user); 
    });




    //Pedir al localStoragexx el usuaio logueado para obtener el email
    // const fromUsername = localStorage.getItem('alias');



    this.transferForm = this.fb.group({
     
      totpToken: ['', Validators.required],
      toUsername: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      description: ['']
    });
  }

  async submit() {
    console.log(this.transferForm.value);

    if (this.transferForm.invalid) return;

    this.message = '';
    this.isLoading = true;

    try {
      const {   
        
        totpToken,
        toUsername,
        amount,
        description
      } = this.transferForm.value;

      const result = this.componentService.realizarTransferencia( totpToken, toUsername, amount , description );
       console.log(result);
      this.message = 'Transferencia realizada con éxito.';

      // const result = this.componentService.verifyToken(totpToken).subscribe(
      // (rta:any)=>{
      //   console.log(rta);
      //   return result
      // }
      // )
     
    } catch (err: any) {
      console.error(err);
      this.message = 'Error en la transferencia: ' + (err?.error?.message || 'verificá los datos.');
    } finally {
      this.isLoading = false;
    }
  }

  


}
