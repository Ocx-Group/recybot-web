import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { ProductsRequests, WalletRequest } from '@app/core/models/wallet-model/wallet-request.model';
import Swal from 'sweetalert2';
let ConpaymentConfirmationComponent = class ConpaymentConfirmationComponent {
    constructor(cartService, walletService, router, toastr, authService) {
        this.cartService = cartService;
        this.walletService = walletService;
        this.router = router;
        this.toastr = toastr;
        this.authService = authService;
        this.walletRequest = new WalletRequest();
        this.user = new UserAffiliate();
        this.products = [];
    }
    ngOnInit() {
        this.user = this.authService.currentUserAffiliateValue;
        this.paymentConfirmation();
    }
    showError(message) {
        this.toastr.error(message);
    }
    paymentConfirmation() {
        Swal.fire({
            title: 'Su pago se ha realizado correctamente.',
            showCancelButton: false,
            confirmButtonColor: '#8963ff',
            confirmButtonText: 'Ok',
        }).then((result) => {
            this.processPayment();
            this.router.navigateByUrl('/app/home');
        });
    }
    processPayment() {
        this.cartService.getProducts().subscribe(products => {
            this.walletRequest.affiliateId = this.user.id;
            this.walletRequest.affiliateUserName = this.user.user_name;
            this.walletRequest.paymentMethod = 3;
            this.walletRequest.purchaseFor = 0;
            products.forEach(item => {
                const productRequest = new ProductsRequests();
                productRequest.idProduct = item.id;
                productRequest.count = item.quantity;
                this.walletRequest.productsList.push(productRequest);
            });
            // this.walletService.payWithMyBalance(this.walletRequest).subscribe({
            //   next: (value) => {
            //     if (value.success == true) {
            //       this.paymentConfirmation();
            //       this.router.navigate(['app/home']);
            //       this.cartService.removeAllCart();
            //     } else {
            //       this.showError('Error: No se pudo realizar el pago.');
            //     }
            //   },
            //   error: (err) => {
            //     this.showError('Error: No se pudo realizar el pago.');
            //   },
            // });
        });
    }
};
ConpaymentConfirmationComponent = __decorate([
    Component({
        selector: 'app-conpayment-confirmation',
        templateUrl: './conpayment-confirmation.component.html'
    })
], ConpaymentConfirmationComponent);
export { ConpaymentConfirmationComponent };
//# sourceMappingURL=conpayment-confirmation.component.js.map