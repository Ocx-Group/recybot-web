import { __awaiter, __decorate } from "tslib";
import { Validators } from '@angular/forms';
import { Component, Input, ViewChild } from '@angular/core';
import { RequestPayment } from '@app/core/models/coinpay-model/request-payment.model';
import { switchMap, timer } from 'rxjs';
import QRCode from 'qrcode';
let CoinpayModalComponent = class CoinpayModalComponent {
    constructor(formBuilder, modalService, coinpayService, toastr, cdr) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.coinpayService = coinpayService;
        this.toastr = toastr;
        this.cdr = cdr;
        this.isLoading = false;
        this.pollingInterval = 5000;
        this.networks = [];
    }
    ngOnInit() {
        this.initControls();
        this.getNetworksByUSDT();
    }
    showSuccess(message) {
        this.toastr.success(message);
    }
    showError(message) {
        this.toastr.error(message);
    }
    initControls() {
        this.paymentGroup = this.formBuilder.group({
            network: ['', Validators.required],
            amount: ['', Validators.required]
        });
    }
    getNetworksByUSDT() {
        let networkId = 19;
        this.coinpayService.getNetworks(networkId).subscribe({
            next: (response) => {
                if (response) {
                    this.networks = response;
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
    openCoinpayModal() {
        this.modalReference = this.modalService.open(this.coinpayPaymentModal, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            centered: true,
        });
        this.selectNetwork();
    }
    getNetworkIcon(shortName) {
        const iconMap = {
            'ERC20': 'assets/images/crypto/erc20.png',
            'BEP20': 'assets/images/crypto/bep20.png',
            'PoS': 'assets/images/crypto/polygon.png',
            'TRC20': 'assets/images/crypto/trc20.png',
            'Solana': 'assets/images/crypto/solana.png'
        };
        return iconMap[shortName] || 'assets/images/crypto/default.png';
    }
    selectNetwork() {
        // this.selectedNetwork = network;
        // this.paymentGroup.get('network').setValue(network.idChain);
        this.walletAddress = '';
        this.transactionId = '';
        this.qrCodeDataUrl = '';
        this.createCoinPayTransaction(56);
    }
    constructProductDetails() {
        return this.products.map(product => {
            return {
                productId: product.id,
                quantity: product.quantity
            };
        });
    }
    createCoinPayTransaction(networkId) {
        this.isLoading = true;
        const request = this.createTransactionRequest(networkId);
        this.coinpayService.createChannel(request).subscribe({
            next: (response) => __awaiter(this, void 0, void 0, function* () {
                if (response.success) {
                    const transactionData = response.data.data;
                    this.walletAddress = transactionData.address;
                    this.transactionId = transactionData.idExternalIdentification.toString();
                    try {
                        this.qrCodeDataUrl = yield QRCode.toDataURL(this.walletAddress);
                        this.isLoading = false;
                        this.cdr.detectChanges();
                        this.startTransactionStatusPolling(this.transactionId);
                    }
                    catch (error) {
                        console.error('Error generating QR code:', error);
                        this.isLoading = false;
                        this.showError("Error al generar el código QR");
                    }
                }
                else {
                    this.isLoading = false;
                    this.showError("Error al crear la transacción");
                }
            }),
            error: (err) => {
                this.isLoading = false;
                console.log(err);
                this.showError("Error al crear la transacción");
            },
        });
    }
    createTransactionRequest(networkId) {
        this.selectedNetwork = true;
        const request = new RequestPayment();
        request.affiliateId = this.user.id;
        request.userName = this.user.user_name;
        request.amount = this.total;
        request.products = this.constructProductDetails();
        request.networkId = networkId;
        return request;
    }
    startTransactionStatusPolling(reference) {
        this.pollingSubscription = timer(0, this.pollingInterval).pipe(switchMap(() => this.coinpayService.getTransactionByReference(reference))).subscribe({
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
};
__decorate([
    Input()
], CoinpayModalComponent.prototype, "user", void 0);
__decorate([
    Input()
], CoinpayModalComponent.prototype, "products", void 0);
__decorate([
    Input()
], CoinpayModalComponent.prototype, "total", void 0);
__decorate([
    ViewChild('coinpayPaymentModal')
], CoinpayModalComponent.prototype, "coinpayPaymentModal", void 0);
CoinpayModalComponent = __decorate([
    Component({
        selector: 'app-coinpay-modal',
        templateUrl: './coinpay-modal.component.html',
        styleUrls: ['./coinpay-modal.component.scss']
    })
], CoinpayModalComponent);
export { CoinpayModalComponent };
//# sourceMappingURL=coinpay-modal.component.js.map