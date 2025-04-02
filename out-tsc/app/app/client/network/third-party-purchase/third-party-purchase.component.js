import { __decorate } from "tslib";
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import QRCode from 'qrcode';
import { switchMap, timer } from "rxjs";
import { WalletRequest } from '@app/core/models/wallet-model/wallet-request.model';
let ThirdPartyPurchaseComponent = class ThirdPartyPurchaseComponent {
    constructor(modalService, coinpayService, toastr, cdr, zone, walletService, authService) {
        this.modalService = modalService;
        this.coinpayService = coinpayService;
        this.toastr = toastr;
        this.cdr = cdr;
        this.zone = zone;
        this.walletService = walletService;
        this.authService = authService;
        this.purchaseAction = new EventEmitter();
        this.POLLING_INTERVAL = 5000;
        this.currentStep = 1;
        this.selectedItems = [];
        this.qrCodeData = '';
        this.paymentAddress = '';
        this.coinpayTransactionId = '';
        this.paymentMethod = undefined;
        this.walletBalance = 0;
    }
    ngOnInit() {
        this.currentUser = this.authService.currentUserAffiliateValue;
    }
    ngOnDestroy() {
        this.stopTransactionStatusPolling();
    }
    openModal(user) {
        this.userReceivingPurchase = user;
        this.resetModalState();
        this.getWalletBalance();
        this.modalReference = this.modalService.open(this.thirdPartyPurchaseModal, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            centered: true
        });
    }
    toggleSelection(recycoin) {
        const index = this.selectedItems.findIndex(item => item.id === recycoin.id);
        if (index > -1) {
            this.selectedItems.splice(index, 1);
        }
        else {
            this.selectedItems.push(recycoin);
        }
    }
    nextStep() {
        if (this.currentStep < 3) {
            this.currentStep++;
        }
        if (this.currentStep === 3) {
            this.processPayment();
        }
    }
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
        }
    }
    getStepTitle() {
        const titles = [
            'THIRD_PARTY_PURCHASE.SELECT_RECYCOINS',
            'THIRD_PARTY_PURCHASE.SELECT_PAYMENT_METHOD',
            this.paymentMethod === 'coinpay' ? 'THIRD_PARTY_PURCHASE.SCAN_QR' : 'THIRD_PARTY_PURCHASE.WALLET_PAYMENT'
        ];
        return titles[this.currentStep - 1] || 'THIRD_PARTY_PURCHASE.PURCHASE_RECYCOINS';
    }
    copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => this.showSuccess('Texto copiado al portapeles'))
            .catch(err => console.error('Error al copiar texto: ', err));
    }
    resetModalState() {
        this.currentStep = 1;
        this.selectedItems = [];
        this.qrCodeData = '';
        this.coinpayTransactionId = '';
    }
    getWalletBalance() {
        this.walletService.getBalanceInformationByAffiliateId(this.currentUser.id).subscribe({
            next: (balance) => this.walletBalance = balance.availableBalance,
            error: (err) => {
                console.error('Error fetching wallet balance:', err);
                this.showError("Error al obtener el saldo de la billetera");
            }
        });
    }
    processPayment() {
        if (this.paymentMethod === 'coinpay') {
            this.createCoinPayTransaction();
        }
    }
    createCoinPayTransaction() {
        const request = this.prepareCoinPayRequest();
        this.coinpayService.createChannel(request).subscribe({
            next: this.handleCoinPayResponse.bind(this),
            error: this.handlePaymentError.bind(this)
        });
    }
    processWalletPayment() {
        const request = this.prepareWalletRequest();
        if (this.walletBalance >= this.getTotalAmount()) {
            this.walletService.payWithMyBalanceForOthers(request).subscribe({
                next: (response) => {
                    console.log(response);
                    if (response.success) {
                        this.showSuccess('Pago realizado con éxito');
                        this.cleanAndCloseModal();
                    }
                    else {
                        console.error(response);
                    }
                },
                error: this.handlePaymentError.bind(this)
            });
        }
        else {
            this.showError("Saldo insuficiente en la billetera");
        }
    }
    prepareCoinPayRequest() {
        return {
            affiliateId: this.userReceivingPurchase.id,
            userName: this.userReceivingPurchase.user_name,
            amount: this.getTotalAmount(),
            products: this.selectedItems.map(product => ({
                productId: product.id,
                quantity: 1
            })),
            networkId: 56
        };
    }
    prepareWalletRequest() {
        const request = new WalletRequest();
        request.affiliateId = this.currentUser.id;
        request.affiliateUserName = this.currentUser.user_name;
        request.purchaseFor = this.userReceivingPurchase.id;
        request.productsList = this.selectedItems.map(product => ({
            idProduct: product.id,
            count: 1
        }));
        return request;
    }
    handleCoinPayResponse(response) {
        if (response.success && response.data && response.data.data) {
            this.paymentAddress = response.data.data.address;
            this.coinpayTransactionId = response.data.data.id.toString();
            this.generateQRCode(this.paymentAddress);
            this.startTransactionStatusPolling(this.coinpayTransactionId);
        }
        else {
            console.error('Invalid response structure:', response);
            this.showError("Error al crear la transacción: dirección de pago no disponible");
        }
    }
    handlePaymentError(error) {
        console.error('Payment processing error:', error);
        this.showError("Error al procesar el pago");
    }
    generateQRCode(address) {
        QRCode.toDataURL(address)
            .then(url => {
            this.zone.run(() => {
                this.qrCodeData = url;
                this.cdr.detectChanges();
            });
        })
            .catch(err => this.showError("Error al generar el código QR: " + err.message));
    }
    startTransactionStatusPolling(reference) {
        this.pollingSubscription = timer(0, this.POLLING_INTERVAL).pipe(switchMap(() => this.coinpayService.getTransactionByReference(reference))).subscribe({
            next: (response) => {
                if (response.data === true) {
                    this.showSuccess('Pago confirmado');
                    this.stopTransactionStatusPolling();
                    this.cleanAndCloseModal();
                }
            },
            error: (error) => {
                console.error('Error al obtener el estado de la transacción:', error);
                this.showError('Error al verificar el estado del pago');
                this.stopTransactionStatusPolling();
            }
        });
    }
    stopTransactionStatusPolling() {
        if (this.pollingSubscription) {
            this.pollingSubscription.unsubscribe();
        }
    }
    cleanAndCloseModal() {
        if (this.modalReference) {
            this.modalReference.close();
            this.modalReference = null;
        }
    }
    showSuccess(message) {
        this.toastr.success(message);
    }
    showError(message) {
        this.toastr.error(message);
    }
    isSelected(recycoin) {
        return this.selectedItems.some(item => item.id === recycoin.id);
    }
    getTotalAmount() {
        return this.selectedItems.reduce((total, item) => total + item.baseAmount, 0);
    }
    canProceed() {
        if (this.currentStep === 1) {
            return this.selectedItems.length > 0;
        }
        else if (this.currentStep === 2) {
            return this.paymentMethod !== undefined;
        }
        return true;
    }
};
__decorate([
    ViewChild('thirdPartyPurchaseModal')
], ThirdPartyPurchaseComponent.prototype, "thirdPartyPurchaseModal", void 0);
__decorate([
    Input()
], ThirdPartyPurchaseComponent.prototype, "recycoins", void 0);
__decorate([
    Output()
], ThirdPartyPurchaseComponent.prototype, "purchaseAction", void 0);
ThirdPartyPurchaseComponent = __decorate([
    Component({
        selector: 'app-third-party-purchase',
        templateUrl: './third-party-purchase.component.html',
        styleUrls: ['./third-party-purchase.component.scss']
    })
], ThirdPartyPurchaseComponent);
export { ThirdPartyPurchaseComponent };
//# sourceMappingURL=third-party-purchase.component.js.map