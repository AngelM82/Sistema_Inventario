import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMensaje: string = '';
  exitoMensaje: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['cliente', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  registrar() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const exito = this.authService.registrar(this.registerForm.value);

    if (exito) {
      this.exitoMensaje = 'Registro exitoso. Redirigiendo al login...';
      this.errorMensaje = '';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    } else {
      this.errorMensaje = 'El correo electrónico ya está registrado.';
      this.exitoMensaje = '';
    }
  }
}
