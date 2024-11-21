import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, take, timer } from 'rxjs';
import Swal from 'sweetalert2';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { RequestResetPassword } from '@app/core/models/user-affiliate-model/request-reset-password-model';
let ResetComponent = class ResetComponent {
    constructor(affiliateService, activatedRoute, router) {
        this.affiliateService = affiliateService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.submitted = false;
        this.user = new UserAffiliate();
        this.isLoading = true;
        this.linkValid = false;
        this.verificationCode = this.activatedRoute.snapshot.params.verificationCode;
        if (!this.verificationCode) {
            this.router.navigate(['/signin']);
            return;
        }
        this.getAffiliateByVerificationCode(this.verificationCode);
    }
    ngOnInit() {
        this.initResetPassword();
        particlesJS.load('particles-js', 'assets/particles/particles.json', function () {
        });
    }
    get create_reset_password_controls() {
        return this.resetPassword.controls;
    }
    initResetPassword() {
        this.resetPassword = new FormGroup({
            password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
            confirm_password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)])
        }, { validators: this.passwordsMatchValidator });
        this.resetPassword.valueChanges.subscribe(() => {
            this.checkPasswords(this.resetPassword);
        });
    }
    confirmation() {
        Swal.fire({
            title: 'Restablecimiento de contraseña',
            text: 'Su contraseña se ha restablecido correctamente.',
            icon: 'success',
            confirmButtonText: 'Entendido',
            timer: 2000,
            showConfirmButton: false
        });
    }
    passwordsMatchValidator(control) {
        const password = control.get('password');
        const confirmPassword = control.get('confirm_password');
        if (!password || !confirmPassword) {
            return null;
        }
        return password.value === confirmPassword.value ? null : { 'mismatch': true };
    }
    changePassword() {
        this.submitted = true;
        let requestResetPassword = new RequestResetPassword();
        if (this.resetPassword.invalid)
            return;
        requestResetPassword.password = this.resetPassword.value.password;
        requestResetPassword.verificationCode = this.verificationCode;
        this.affiliateService.resetPassword(requestResetPassword).subscribe({
            next: (value) => {
                if (value) {
                    this.confirmation();
                    setTimeout(() => {
                        this.router.navigate(['/signin']);
                    }, 2000);
                }
            },
            error: (err) => {
            },
        });
    }
    getAffiliateByVerificationCode(code) {
        timer(3000)
            .pipe(switchMap(() => this.affiliateService.getAffiliateByVerificationCode(code)))
            .subscribe({
            next: (value) => {
                this.isLoading = false;
                if (value === null) {
                    this.showExpiredLinkMessage();
                    return;
                }
                this.user = value;
                if (this.checkCodeTime()) {
                    this.showExpiredLinkMessage();
                    return;
                }
                this.startTimer();
            },
            error: () => {
                this.isLoading = false;
                this.router.navigate(['/signin']);
            },
        });
    }
    showExpiredLinkMessage() {
        Swal.fire({
            title: 'Error',
            text: 'El enlace ha expirado, solicite uno nuevamente',
            icon: 'error',
            confirmButtonText: 'Entendido'
        }).then(() => {
            setTimeout(() => {
                this.router.navigate(['/signin']);
            }, 1500);
        });
    }
    checkCodeTime() {
        let currentTimeUtc = new Date();
        let userUpdateTime = new Date(this.user.updated_at + 'Z');
        let differenceInMinutes = (currentTimeUtc.getTime() - userUpdateTime.getTime()) / (1000 * 60);
        if (differenceInMinutes > 10) {
            this.linkValid = false;
            return true;
        }
        this.linkValid = true;
        return false;
    }
    startTimer() {
        const expireMinutes = 10 * 60 * 1000;
        timer(expireMinutes).pipe(take(1)).subscribe(() => {
            if (this.checkCodeTime()) {
                this.isLoading = true;
                this.router.navigate(['/signin']);
            }
        });
    }
    checkPasswords(group) {
        let pass = group.controls.password.value;
        let confirmPass = group.controls.confirm_password.value;
        if (pass !== confirmPass) {
            group.setErrors({ mismatch: true });
        }
        else {
            group.setErrors(null);
        }
    }
};
ResetComponent = __decorate([
    Component({
        selector: 'app-reset',
        templateUrl: './reset.component.html',
        styleUrls: ['./reset.component.scss']
    })
], ResetComponent);
export { ResetComponent };
//# sourceMappingURL=reset.component.js.map