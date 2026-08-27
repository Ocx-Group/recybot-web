import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Response } from '@app/core/models/response-model/response.model';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@app/core/service/authentication-service/auth.service';

import { Signin } from '@app/core/models/signin-model/signin.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LogoService } from '@app/core/service/logo-service/logo.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
})
export class SigninComponent implements OnInit, OnDestroy {
  // Los tres unicos campos que la plantilla lee y que se escriben fuera de un
  // evento: error y loading desde las respuestas de login, currentImageIndex
  // desde el setInterval del fondo. Como senales no hace falta ChangeDetectorRef.
  readonly error = signal('');
  readonly loading = signal(false);
  backgroundImages: string[] = [
    '/assets/images/login-option-1.png',
    '/assets/images/login-option-2.png',
    '/assets/images/login-option-3.png',
  ];
  readonly currentImageIndex = signal(0);
  showPassword = false;
  logoUrl = '';
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
    private readonly deviceService: DeviceDetectorService,
    private readonly logoService: LogoService,
  ) {
    this.logoUrl = this.logoService.getLogoSrc();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      if (this.authService.isAffiliateLoggedIn()) {
        this.router.navigate(['/app/home']);
      } else if (this.authService.isAdminLoggedIn()) {
        this.router.navigate(['/admin/home-admin']);
      }
      return;
    }

    this.startBackgroundRotation();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loginSubmitted() {
    const signin = new Signin();
    this.error.set('');
    signin.userName = this.authLogin.value.email;
    signin.password = this.authLogin.value.pwd;
    signin.browserInfo = this.deviceService.getDeviceInfo().browser;
    signin.operatingSystem = this.deviceService.getDeviceInfo().os;

    this.authService.fetchIpAddress().subscribe(ip => {
      signin.ipAddress = ip;

      if (!signin.userName || !signin.password) return;

      this.loading.set(true);
      this.authService.loginUser(signin).subscribe((response: Response) => {
        if (response.success) {
          if (response.data.is_affiliate) {
            this.router.navigate(['/app/home']).then();
          } else {
            this.router.navigate(['admin/home-admin']).then();
          }
        } else {
          this.error.set(response.message);
          this.toastr.error(response.message, 'Error!');
        }
        this.loading.set(false);
      });
    });
  }

  googleLoginSubmitted() {
    const deviceInfo = this.deviceService.getDeviceInfo();
    this.loading.set(true);

    this.authService.fetchIpAddress().subscribe(ip => {
      this.authService
        .loginWithGoogle({
          browserInfo: deviceInfo.browser,
          operatingSystem: deviceInfo.os,
          ipAddress: ip,
        })
        .subscribe({
          next: (response: Response) => {
            if (response.success) {
              if (response.data.is_affiliate) {
                this.router.navigate(['/app/home']).then();
              } else {
                this.router.navigate(['admin/home-admin']).then();
              }
            } else {
              this.error.set(response.message);
              this.toastr.error(response.message, 'Error!');
            }
            this.loading.set(false);
          },
          error: () => {
            this.error.set('No fue posible iniciar sesión con Google.');
            this.toastr.error(this.error(), 'Error!');
            this.loading.set(false);
          },
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
      this.currentImageIndex.set(
        (this.currentImageIndex() + 1) % this.backgroundImages.length,
      );
    }, 10000);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
