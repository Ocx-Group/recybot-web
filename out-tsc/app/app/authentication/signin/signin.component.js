import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Signin } from '@app/core/models/signin-model/signin.model';
import { animate, state, style, transition, trigger } from "@angular/animations";
let SigninComponent = class SigninComponent {
    constructor(router, authService, toastr, logoService, translate, deviceService) {
        this.router = router;
        this.authService = authService;
        this.toastr = toastr;
        this.logoService = logoService;
        this.translate = translate;
        this.deviceService = deviceService;
        this.submitted = false;
        this.error = '';
        this.loading = false;
        this.hide = true;
        this.username = 'Usuario';
        this.password = 'Contraseña';
        this.remember = 'Recordar';
        this.forgot = 'Cambiar contraseña';
        this.signin = 'Iniciar sesión';
        this.passwordIsRequerid = 'La contraseña es requerida.';
        this.userNameIsRequerid = 'El usuario es requerido.';
        this.passwordErrorMessage = 'La contraseña debe tener al menos 6 y un máximo de 15 caracteres';
        this.userNameErrorMessage = 'El nombre de usuario no es válido';
        this.backgroundImages = [
            '/assets/images/login-option-1.png',
            '/assets/images/login-option-2.png',
            '/assets/images/login-option-3.png'
        ];
        this.currentImageIndex = 0;
        this.authLogin = new FormGroup({
            remeber: new FormControl('', []),
            email: new FormControl('', [Validators.required]),
            pwd: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(15),
            ]),
        });
    }
    ngOnInit() {
        this.getTheme();
        this.authService.logoutUser();
        particlesJS.load('particles-js', 'assets/particles/particles.json', function () {
        });
        this.setLabels();
        this.setErrorMessages();
        this.startBackgroundRotation();
    }
    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
    setLabels() {
        if (this.translate.currentLang != undefined) {
            this.username = this.translate.instant('SIGNIN.USER-NAME.TEXT');
            this.password = this.translate.instant('SIGNIN.PASSWORD.TEXT');
            this.remember = this.translate.instant('SIGNIN.REMEMBER-ME.TEXT');
            this.forgot = this.translate.instant('SIGNIN.FORGOT-PASS.TEXT');
            this.signin = this.translate.instant('SIGNIN.TITLE.TEXT');
        }
    }
    setErrorMessages() {
        if (this.translate.currentLang != undefined) {
            this.passwordIsRequerid = this.translate.instant('SIGNIN.PASS-IS-REQUIRED.TEXT');
            this.userNameIsRequerid = this.translate.instant('SIGNIN.USER-NAME-IS-REQUIRED.TEXT');
            this.passwordErrorMessage = this.translate.instant('SIGNIN.PASS-MESSAGE-ERROR.TEXT');
            this.userNameErrorMessage = this.translate.instant('SIGNIN.USER-NAME-MESSAGE-ERROR.TEXT');
        }
    }
    loginSubmitted() {
        let signin = new Signin();
        this.submitted = true;
        this.error = '';
        signin.userName = this.authLogin.value.email;
        signin.password = this.authLogin.value.pwd;
        signin.browserInfo = this.deviceService.getDeviceInfo().browser;
        signin.operatingSystem = this.deviceService.getDeviceInfo().os;
        this.authService.fetchIpAddress().subscribe((ip) => {
            signin.ipAddress = ip;
            console.log(signin);
            if (signin.userName === '' || signin.password === '') {
                return;
            }
            this.loading = true;
            this.authService.loginUser(signin).subscribe((response) => {
                if (response.success) {
                    if (response.data.is_affiliate) {
                        this.router.navigate(['/app/home']).then();
                    }
                    else {
                        this.router.navigate(['admin/home-admin']).then();
                    }
                }
                else {
                    this.showError(response.message);
                }
                this.loading = false;
            });
        });
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    get f() {
        return this.authLogin.controls;
    }
    get Email() {
        return this.authLogin.get('email');
    }
    get Pwd() {
        return this.authLogin.get('pwd');
    }
    getTheme() {
        this.logoUrl = this.logoService.getLogoSrc();
    }
    startBackgroundRotation() {
        this.intervalId = setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
        }, 10000);
    }
};
SigninComponent = __decorate([
    Component({
        selector: 'app-signin',
        templateUrl: './signin.component.html',
        styleUrls: ['./signin.component.scss'],
        animations: [
            trigger('backgroundFade', [
                state('visible', style({
                    opacity: 1
                })),
                state('hidden', style({
                    opacity: 0
                })),
                transition('visible => hidden', animate('1000ms ease-out')),
                transition('hidden => visible', animate('1000ms ease-in'))
            ])
        ]
    })
], SigninComponent);
export { SigninComponent };
//# sourceMappingURL=signin.component.js.map