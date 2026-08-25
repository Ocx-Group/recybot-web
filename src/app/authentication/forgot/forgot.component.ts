import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

import { RouterLink } from '@angular/router';
import { AffiliateService } from '@app/core/service/affiliate-service/affiliate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
})
export class ForgotComponent implements OnInit {
  forgotPassword!: FormGroup;
  submitted = false;
  constructor(
    private readonly affiliateService: AffiliateService,
    private readonly toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.initForgotPassword();
  }

  get create_forgot_controls(): { [key: string]: AbstractControl } {
    return this.forgotPassword.controls;
  }

  initForgotPassword() {
    this.forgotPassword = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  sendPasswordRecovery() {
    this.submitted = true;

    if (this.forgotPassword.invalid) return;

    const email = this.forgotPassword.value.email.trim().toLowerCase();

    this.affiliateService.sendPasswordRecovery(email).subscribe({
      next: value => {
        if (value?.success) {
          this.emailConfirmation();
          return;
        }

        this.emailNotFound(value?.message);
      },
      error: () => {
        this.emailRecoveryError();
      },
    });
  }

  validateEmail() {
    const emailControl = this.forgotPassword.get('email');
    if (!emailControl || emailControl.errors) {
      return;
    }

    if (emailControl.dirty) {
      emailControl.updateValueAndValidity();
    }
  }

  emailConfirmation() {
    Swal.fire({
      title: 'Restablecimiento de contraseña',
      text: 'Se ha enviado un correo electrónico con un enlace para restablecer su contraseña. Por favor, revisa la bandeja de entrada o carpeta de spam.',
      icon: 'success',
      confirmButtonText: 'Entendido',
    });
  }

  emailNotFound(message?: string) {
    Swal.fire({
      title: 'No se pudo enviar el correo',
      text:
        message || 'El correo no se encuentra registrado para esta plataforma.',
      icon: 'error',
      confirmButtonText: 'Entendido',
    });
  }

  emailRecoveryError() {
    Swal.fire({
      title: 'No se pudo enviar el correo',
      text: 'Ocurrió un error al solicitar el restablecimiento de contraseña. Inténtalo nuevamente.',
      icon: 'error',
      confirmButtonText: 'Entendido',
    });
  }
}
