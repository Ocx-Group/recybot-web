import { __decorate } from "tslib";
import { interval, switchMap, takeWhile } from 'rxjs';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreatePayment } from '@app/core/models/coinpayment-model/create-payment.model';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
let CoinpaymentsComponent = class CoinpaymentsComponent {
    constructor(coinPaymentService, auth, toast, router, membershipManagerService) {
        this.coinPaymentService = coinPaymentService;
        this.auth = auth;
        this.toast = toast;
        this.router = router;
        this.membershipManagerService = membershipManagerService;
        this.isLoading = false;
        this.user = new UserAffiliate();
        this.loadingChange = new EventEmitter();
    }
    ngOnInit() {
        this.user = this.auth.currentUserAffiliateValue;
    }
    ngAfterViewInit() {
        this.createCoinPaymentTransaction();
    }
    createCoinPaymentTransaction() {
        this.loadingChange.emit(true);
        this.coinPaymentService.createTransaction(this.buildCoinPaymentRequest()).subscribe({
            next: (value) => {
                this.qrImageUrl = value.qrcode_Url;
                this.address = value.address;
                this.txn_Id = value.txn_Id;
                this.getTransactionInfo(this.txn_Id, true);
            },
            error: () => {
            },
        });
    }
    buildCoinPaymentRequest() {
        const request = new CreatePayment();
        const productRequest = this.transformProductToRequest(this.membership);
        request.amount = 10;
        request.buyer_email = this.user.email;
        request.buyer_name = this.user.name + ' ' + this.user.last_name;
        request.item_number = this.user.id.toString();
        request.ipn_url = 'https://wallet.recycoinfx.net/api/v1/ConPayments/coinPaymentsIPN';
        request.currency1 = 'USDT.TRC20';
        request.currency2 = 'USDT.TRC20';
        request.item_name = this.user.user_name;
        request.products.push(productRequest);
        return request;
    }
    transformProductToRequest(product) {
        return {
            productId: product.id,
            quantity: 1
        };
    }
    getTransactionInfo(idTransaction, fullInfo) {
        interval(60000)
            .pipe(switchMap(() => this.coinPaymentService.getTransactionInfo(idTransaction, fullInfo)), takeWhile((value) => value.status !== 1))
            .subscribe({
            next: (value) => {
                if (value.status === 1) {
                    this.showSuccess('La membresía se activó correctamente');
                    this.close();
                    this.router.navigateByUrl('/app/home', { skipLocationChange: true }).then(() => {
                        this.router.navigate(['/app/home']);
                    });
                }
            },
            error: () => {
            },
        });
    }
    showSuccess(message) {
        this.toast.success(message);
    }
    close() {
        this.membershipManagerService.close();
    }
};
__decorate([
    Input()
], CoinpaymentsComponent.prototype, "membership", void 0);
__decorate([
    Output()
], CoinpaymentsComponent.prototype, "loadingChange", void 0);
CoinpaymentsComponent = __decorate([
    Component({
        selector: 'app-coinpayments',
        templateUrl: './coinpayments.component.html',
        styleUrls: ['./coinpayments.component.scss']
    })
], CoinpaymentsComponent);
export { CoinpaymentsComponent };
//# sourceMappingURL=coinpayments.component.js.map