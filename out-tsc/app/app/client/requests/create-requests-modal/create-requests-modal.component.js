import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DateTime } from 'luxon';
import { WalletRequestRequest } from '@app/core/models/wallet-request-request-model/wallet-request-request.model';
import { AffiliateBtc } from '@app/core/models/affiliate-btc-model/affiliate-btc.model';
let CreateRequestsModalComponent = class CreateRequestsModalComponent {
    constructor(modalService, walletRequestService, toastr, affiliateService, affiliateBtcService) {
        this.modalService = modalService;
        this.walletRequestService = walletRequestService;
        this.toastr = toastr;
        this.affiliateService = affiliateService;
        this.affiliateBtcService = affiliateBtcService;
        this.walletRequest = new WalletRequestRequest();
        this.affiliateBtc = new AffiliateBtc();
        this.submitted = false;
        this.withdrawalDates = [];
        this.loadWalletRequest = new EventEmitter();
        this.setAvailableBalance = new EventEmitter();
    }
    ngOnInit() {
        this.getUtcToday();
        this.loadValidations();
        this.hasCoinPaymentAddress();
    }
    get request_controls() {
        return this.sendRequest.controls;
    }
    getUtcToday() {
        const now = DateTime.local();
        this.today = now.toISODate();
    }
    showError(message) {
        this.toastr.error(message);
    }
    showSuccess(message) {
        this.toastr.success(message);
    }
    openCreateRequestModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            centered: true,
        });
    }
    loadValidations() {
        this.sendRequest = new FormGroup({
            amount_requested: new FormControl('', Validators.required),
            access_key: new FormControl('', Validators.required),
            observation: new FormControl('', Validators.required),
            generation_code: new FormControl('', Validators.required)
        });
    }
    onSaveRequest() {
        if (!this.affiliateBtc || this.affiliateBtc.trc20Address == null) {
            this.showError('Tiene que tener configurada su dirección de billetera para poder realizar la solicitud.');
            return;
        }
        this.submitted = true;
        if (this.sendRequest.invalid) {
            return;
        }
        this.setWalletRequest();
        if (!this.isValidAmount(this.walletRequest.amount)) {
            this.showError('El monto debe estar en el rango del mínimo y máximo.');
            return;
        }
        this.walletRequestService.createWalletRequest(this.walletRequest).subscribe({
            next: (resp) => {
                if (resp.success == true) {
                    this.showSuccess('Su solicitud de retiro se ha creado correctamente');
                    this.sendRequest.reset();
                    this.modalService.dismissAll();
                    this.loadWalletRequest.emit();
                    this.setAvailableBalance.emit();
                }
                else if (resp.success == false) {
                    this.showError('Las credenciales no coinciden');
                    this.sendRequest.reset();
                }
            },
            error: (err) => {
                this.showError('Ha ocurrido un error al procesar su solicitud.');
            },
        });
    }
    setWalletRequest() {
        this.walletRequest.affiliateId = this.user.id;
        this.walletRequest.affiliateName = `${this.user.name} ${this.user.last_name} (${this.user.user_name})`;
        this.walletRequest.userPassword = this.sendRequest.value.access_key;
        this.walletRequest.verificationCode = this.sendRequest.value.generation_code;
        this.walletRequest.amount = Number(this.sendRequest.value.amount_requested);
        this.walletRequest.concept = this.sendRequest.value.observation;
    }
    isValidAmount(amount) {
        if (amount <= 0) {
            return false;
        }
        else if (this.walletWithdrawalConfig.maximum_amount == 0) {
            return amount <= this.checkMinimumAmount() &&
                amount >= this.walletWithdrawalConfig.minimum_amount;
        }
        else {
            return amount <= this.checkMinimumAmount() &&
                amount >= this.walletWithdrawalConfig.minimum_amount &&
                amount <= this.walletWithdrawalConfig.maximum_amount;
        }
    }
    checkMinimumAmount() {
        let amount = this.balanceInfo.availableBalance;
        return amount;
    }
    onGenerateVerificationCode() {
        this.affiliateService.generateVerificationCode(this.user.id, false).subscribe({
            next: (resp) => {
                if (resp.success) {
                    this.showSuccess('Se ha generado correctamente el código de verificación. Por favor, revise su correo electrónico para obtener el código de verificación.');
                }
                else {
                    this.messageNotIsWithdrawalDate();
                }
            },
            error: (err) => {
                this.showError("Error");
            },
        });
    }
    messageNotIsWithdrawalDate() {
        Swal.fire({
            icon: 'warning',
            title: '¡Saludos!',
            text: 'Las comisiones voluntarias estarán disponibles para ser retiradas en su billetera según el calendario de la empresa.',
            confirmButtonText: 'Entendido'
        });
    }
    hasCoinPaymentAddress() {
        this.affiliateBtcService.getAffiliateBtcByAffiliateId(this.user.id).subscribe({
            next: (value) => {
                if (value.success) {
                    const address = value.data.reduce((acc, item) => {
                        acc.trc20Address = item.trc20Address;
                        return acc;
                    }, { trc20Address: '' });
                    this.affiliateBtc.trc20Address = address.trc20Address;
                }
            },
            error: () => {
                this.showError('Error');
            },
        });
    }
};
__decorate([
    Input()
], CreateRequestsModalComponent.prototype, "user", void 0);
__decorate([
    Input()
], CreateRequestsModalComponent.prototype, "balanceInfo", void 0);
__decorate([
    Input()
], CreateRequestsModalComponent.prototype, "walletWithdrawalConfig", void 0);
__decorate([
    ViewChild('createRequestModal')
], CreateRequestsModalComponent.prototype, "createRequestModal", void 0);
__decorate([
    Output('loadWalletRequest')
], CreateRequestsModalComponent.prototype, "loadWalletRequest", void 0);
__decorate([
    Output('setAvailableBalance')
], CreateRequestsModalComponent.prototype, "setAvailableBalance", void 0);
CreateRequestsModalComponent = __decorate([
    Component({
        selector: 'app-create-requests-modal',
        templateUrl: './create-requests-modal.component.html',
    })
], CreateRequestsModalComponent);
export { CreateRequestsModalComponent };
//# sourceMappingURL=create-requests-modal.component.js.map