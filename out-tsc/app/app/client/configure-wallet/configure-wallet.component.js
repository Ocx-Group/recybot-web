import { __decorate } from "tslib";
import { AffiliateBtc } from '@app/core/models/affiliate-btc-model/affiliate-btc.model';
import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { Subscription } from 'rxjs';
let ConfigureWalletComponent = class ConfigureWalletComponent {
    constructor(formBuilder, configureWalletService, authService, affiliateBtcService, toastr, affiliateService) {
        this.formBuilder = formBuilder;
        this.configureWalletService = configureWalletService;
        this.authService = authService;
        this.affiliateBtcService = affiliateBtcService;
        this.toastr = toastr;
        this.affiliateService = affiliateService;
        this.currentStep = 1;
        this.user = new UserAffiliate();
        this.affiliateBtc = new AffiliateBtc();
        this.subscriptionOpenedModal = new Subscription();
    }
    ngOnInit() {
        this.initForm();
        this.user = this.authService.currentUserAffiliateValue;
        this.subscriptionOpenedModal.add(this.configureWalletService.modalOpened$.subscribe(() => {
            this.resetForm();
            this.loadConfiguration();
        }));
    }
    ngAfterViewInit() {
        this.configureWalletService.setModalContent(this.configureWalletModal);
    }
    ngOnDestroy() {
        this.subscriptionOpenedModal.unsubscribe();
    }
    get formControls() {
        return this.walletForm.controls;
    }
    initForm() {
        this.walletForm = this.formBuilder.group({
            trc_address: ['', Validators.required],
            bnb_address: [''],
            security_code: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    loadConfiguration() {
        this.affiliateBtcService.getAffiliateBtcByAffiliateId(this.user.id).subscribe({
            next: (value) => {
                if (value.success) {
                    this.setConfiguration(value.data);
                    this.walletForm.markAsPristine();
                }
            },
            error: () => {
                this.toastr.error('Error al cargar la configuración');
            },
        });
    }
    setConfiguration(value) {
        const updateWalletAddress = {};
        value.forEach(item => {
            if (item && typeof item === 'object') {
                if (item.networkId === 56) {
                    updateWalletAddress.trc_address = item.address;
                }
                else if (item.networkId === 202) {
                    updateWalletAddress.bnb_address = item.address;
                }
            }
        });
        if (Object.keys(updateWalletAddress).length > 0) {
            this.walletForm.patchValue(updateWalletAddress);
        }
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
    canProceed() {
        var _a, _b, _c, _d, _e, _f;
        switch (this.currentStep) {
            case 1:
                const trcValid = (_b = (_a = this.walletForm.get('trc_address')) === null || _a === void 0 ? void 0 : _a.valid) !== null && _b !== void 0 ? _b : false;
                const bnbValid = (_d = (_c = this.walletForm.get('bnb_address')) === null || _c === void 0 ? void 0 : _c.valid) !== null && _d !== void 0 ? _d : false;
                return trcValid || bnbValid;
            case 2:
                return (_f = (_e = this.walletForm.get('security_code')) === null || _e === void 0 ? void 0 : _e.valid) !== null && _f !== void 0 ? _f : false;
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
                }
                else {
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
};
__decorate([
    ViewChild('configureWalletModal')
], ConfigureWalletComponent.prototype, "configureWalletModal", void 0);
ConfigureWalletComponent = __decorate([
    Component({
        selector: 'app-configure-wallet',
        templateUrl: './configure-wallet.component.html',
        styleUrls: ['./configure-wallet.component.scss']
    })
], ConfigureWalletComponent);
export { ConfigureWalletComponent };
//# sourceMappingURL=configure-wallet.component.js.map