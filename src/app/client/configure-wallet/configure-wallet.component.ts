import { AddressBtc } from '@app/core/models/affiliate-btc-model/address-btc.model';
import { AffiliateBtc } from '@app/core/models/affiliate-btc-model/affiliate-btc.model';
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { AffiliateBtcService } from '@app/core/service/affiliate-btc-service/affiliate-btc.service';
import { AffiliateService } from '@app/core/service/affiliate-service/affiliate.service';
import { AuthService } from '@app/core/service/authentication-service/auth.service';
import { ConfigureWalletService } from '@app/core/service/configure-wallet-service/configure-wallet.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-configure-wallet',
  templateUrl: './configure-wallet.component.html',
  styleUrls: ['./configure-wallet.component.scss']
})
export class ConfigureWalletComponent implements OnInit, AfterViewInit, OnDestroy {
  currentStep: number = 1;
  walletForm: FormGroup;
  user: UserAffiliate = new UserAffiliate();
  affiliateBtc: AffiliateBtc = new AffiliateBtc();
  private subscriptionOpenedModal = new Subscription();
  @ViewChild('configureWalletModal') configureWalletModal: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private configureWalletService: ConfigureWalletService,
    private authService: AuthService,
    private affiliateBtcService: AffiliateBtcService,
    private toastr: ToastrService,
    private affiliateService: AffiliateService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.user = this.authService.currentUserAffiliateValue;

    this.subscriptionOpenedModal.add(
      this.configureWalletService.modalOpened$.subscribe(() => {
        this.resetForm();
        this.loadConfiguration();
      })
    );
  }

  ngAfterViewInit() {
    this.configureWalletService.setModalContent(this.configureWalletModal);
  }

  ngOnDestroy(): void {
    this.subscriptionOpenedModal.unsubscribe();
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.walletForm.controls;
  }

  initForm() {
    this.walletForm = this.formBuilder.group({
      trc_address: ['', Validators.required],
      bnb_address: ['', Validators.required],
      security_code: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loadConfiguration() {
    this.affiliateBtcService.getAffiliateBtcByAffiliateId(this.user.id).subscribe({
      next: (value) => {
        this.setConfiguration(value);
        this.walletForm.markAsPristine();
      },
      error: () => {
        this.toastr.error('Error al cargar la configuración');
      },
    });
  }

  setConfiguration(value: AddressBtc[]) {
    const updateWalletAddress = value.reduce((acc, item) => {
      if (item.networkId == 1) {
        acc.trc_address = item.address;
      } else {
        acc.bnb_address = item.address;
      }
      return acc;
    }, { trc_address: '', bnb_address: '' });

    this.walletForm.patchValue(updateWalletAddress);
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
      if (this.currentStep === 2) {
        this.generateVerificationCode();
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.walletForm.get('trc_address').valid && this.walletForm.get('bnb_address').valid;
      case 2:
        return this.walletForm.get('security_code').valid;
      default:
        return false;
    }
  }

  onSubmit() {
    if (this.walletForm.valid) {
      this.saveConfiguration();
    }
  }

  saveConfiguration() {
    this.affiliateBtc.affiliateId = this.user.id;
    this.affiliateBtc.trc20Address = this.walletForm.value.trc_address;
    this.affiliateBtc.bscAddress = this.walletForm.value.bnb_address;
    this.affiliateBtc.verificationCode = this.walletForm.value.security_code;
    this.affiliateBtc.password = this.walletForm.value.password;

    this.affiliateBtcService.createAffiliateBtc(this.affiliateBtc).subscribe({
      next: (value) => {
        if (value.success) {
          this.toastr.success('Configuración de la billetera creada correctamente.');
          this.configureWalletService.closeConfigureWalletModal();
        } else {
          this.toastr.error('Uno de los datos ingresados no corresponde o es incorrecto, revise e inténtelo nuevamente.');
        }
      },
      error: (error) => {
        this.toastr.error('Error al guardar la configuración');
      },
    });
  }

  generateVerificationCode() {
    this.affiliateService.generateVerificationCode(this.user.id, false).subscribe({
      next: (value) => {
        if (value.success) {
          this.toastr.success('Se ha generado un código de seguridad, por favor revisa tu correo electrónico.');
        }
      },
      error: () => {
        this.toastr.error('Error al generar el código de verificación');
      }
    });
  }

  resetForm() {
    this.walletForm.reset();
    this.currentStep = 1;
  }
}
