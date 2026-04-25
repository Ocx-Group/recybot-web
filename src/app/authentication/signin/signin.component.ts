import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Response } from '@app/core/models/response-model/response.model';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/service/authentication-service/auth.service';
import { CommonModule } from '@angular/common';
import { Signin } from '@app/core/models/signin-model/signin.model';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslateModule],
})
export class SigninComponent implements OnInit, OnDestroy {
  error = '';
  loading = false;
  username = 'Usuario';
  password = 'Contraseña';
  signin = 'Iniciar sesión';
  passwordIsRequerid = 'La contraseña es requerida.';
  userNameIsRequerid = 'El usuario es requerido.';
  passwordErrorMessage =
    'La contraseña debe tener al menos 6 y un máximo de 15 caracteres';
  userNameErrorMessage = 'El nombre de usuario no es válido';
  backgroundImages: string[] = [
    '/assets/images/login-option-1.png',
    '/assets/images/login-option-2.png',
    '/assets/images/login-option-3.png',
  ];
  currentImageIndex = 0;
  showPassword = false;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  authLogin = new FormGroup({
    email: new FormControl('', [Validators.required]),
    pwd: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
  });

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private readonly deviceService: DeviceDetectorService,
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      if (this.authService.isAffiliateLoggedIn()) {
        this.router.navigate(['/app/home']);
      } else if (this.authService.isAdminLoggedIn()) {
        this.router.navigate(['/admin/home-admin']);
      }
      return;
    }

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
    if (this.translate.getCurrentLang() != undefined) {
      this.username = this.translate.instant('SIGNIN.USER-NAME.TEXT');
      this.password = this.translate.instant('SIGNIN.PASSWORD.TEXT');
      this.signin = this.translate.instant('SIGNIN.TITLE.TEXT');
    }
  }

  setErrorMessages() {
    if (this.translate.getCurrentLang() != undefined) {
      this.passwordIsRequerid = this.translate.instant(
        'SIGNIN.PASS-IS-REQUIRED.TEXT',
      );
      this.userNameIsRequerid = this.translate.instant(
        'SIGNIN.USER-NAME-IS-REQUIRED.TEXT',
      );
      this.passwordErrorMessage = this.translate.instant(
        'SIGNIN.PASS-MESSAGE-ERROR.TEXT',
      );
      this.userNameErrorMessage = this.translate.instant(
        'SIGNIN.USER-NAME-MESSAGE-ERROR.TEXT',
      );
    }
  }

  loginSubmitted() {
    const signin = new Signin();
    this.error = '';
    signin.userName = this.authLogin.value.email;
    signin.password = this.authLogin.value.pwd;
    signin.browserInfo = this.deviceService.getDeviceInfo().browser;
    signin.operatingSystem = this.deviceService.getDeviceInfo().os;

    this.authService.fetchIpAddress().subscribe(ip => {
      signin.ipAddress = ip;

      if (!signin.userName || !signin.password) return;

      this.loading = true;
      this.authService.loginUser(signin).subscribe((response: Response) => {
        if (response.success) {
          if (response.data.is_affiliate) {
            this.router.navigate(['/app/home']).then();
          } else {
            this.router.navigate(['admin/home-admin']).then();
          }
        } else {
          this.error = response.message;
          this.toastr.error(response.message, 'Error!');
        }
        this.loading = false;
      });
    });
  }

  get Email(): FormControl {
    return this.authLogin.get('email') as FormControl;
  }

  get Pwd(): FormControl {
    return this.authLogin.get('pwd') as FormControl;
  }

  private startBackgroundRotation() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.backgroundImages.length;
    }, 10000);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
