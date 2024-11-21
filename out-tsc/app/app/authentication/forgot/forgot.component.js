import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
let ForgotComponent = class ForgotComponent {
    constructor(affiliateService, toastr) {
        this.affiliateService = affiliateService;
        this.toastr = toastr;
        this.submitted = false;
    }
    ngOnInit() {
        this.initForgotPassword();
    }
    get create_forgot_controls() {
        return this.forgotPassword.controls;
    }
    initForgotPassword() {
        this.forgotPassword = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }
    sendPasswordRecovery() {
        this.submitted = true;
        if (this.forgotPassword.invalid)
            return;
        let email = this.forgotPassword.value.email;
        this.affiliateService.sendPasswordRecovery(email).subscribe({
            next: (value) => {
                if (value.success) {
                    this.emailConfirmation();
                }
                else {
                    this.toastr.error('El usuario no se encuentra registrado en el sistema');
                }
            },
            error: () => {
                this.toastr.error('Error');
            },
        });
    }
    validateEmail() {
        const emailControl = this.forgotPassword.get('email');
        if (emailControl.errors) {
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
};
ForgotComponent = __decorate([
    Component({
        selector: 'app-forgot',
        templateUrl: './forgot.component.html',
        styleUrls: ['./forgot.component.scss'],
    })
], ForgotComponent);
export { ForgotComponent };
//# sourceMappingURL=forgot.component.js.map