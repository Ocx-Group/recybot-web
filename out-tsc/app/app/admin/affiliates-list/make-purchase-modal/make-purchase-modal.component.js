import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { ProductsRequests, WalletRequest } from '@app/core/models/wallet-model/wallet-request.model';
import Swal from 'sweetalert2';
let MakePurchaseModalComponent = class MakePurchaseModalComponent {
    constructor(modalService, walletService, toastr, productService) {
        this.modalService = modalService;
        this.walletService = walletService;
        this.toastr = toastr;
        this.productService = productService;
        this.walletRequest = new WalletRequest();
        this.products = [];
        this.user = new UserAffiliate();
    }
    ngOnInit() {
        this.loadAllEcoPooles();
        this.initMakePurchaseForm();
    }
    initMakePurchaseForm() {
        this.makePurchaseForm = new FormGroup({
            selectedProduct: new FormControl('', Validators.required),
            quantity: new FormControl(1, Validators.required)
        });
    }
    openMakePurchaseModal(content, user) {
        this.user = user;
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            centered: true,
        });
    }
    processPayment(option) {
        this.walletRequest.productsList = [];
        this.walletRequest.affiliateId = this.user.id;
        this.walletRequest.affiliateUserName = this.user.user_name;
        this.walletRequest.paymentMethod = option;
        this.walletRequest.purchaseFor = 0;
        this.products.forEach(item => {
            const productRequest = new ProductsRequests();
            productRequest.idProduct = item.id;
            productRequest.count = item.quantity;
            this.walletRequest.productsList.push(productRequest);
        });
        this.walletService.payWithMyBalanceAdmin(this.walletRequest).subscribe({
            next: (value) => {
                if (value.success == true) {
                    this.showSuccess('Pago realizado correctamente');
                    this.walletRequest.productsList = [];
                    this.products = [];
                    this.modalService.dismissAll();
                }
                else {
                    this.showError('Error: No se pudo realizar el pago.');
                }
            },
            error: (err) => {
                this.showError('Error: No se pudo realizar el pago.');
            },
        });
    }
    showSuccess(message) {
        this.toastr.success(message);
    }
    showError(message) {
        this.toastr.error(message);
    }
    loadAllEcoPooles() {
        this.productService.getAllEcoPooles().subscribe((ecopools) => {
            this.productList = ecopools;
            this.filterCategory = ecopools;
            this.productList.forEach((item) => {
                Object.assign(item, { quantity: 1, total: item.salePrice });
            });
        });
    }
    addProductToList() {
        const selectedProduct = this.productList.find(p => p.id == this.makePurchaseForm.get('selectedProduct').value);
        const quantity = this.makePurchaseForm.get('quantity').value;
        const existingProduct = this.products.find(p => p.id == selectedProduct.id);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        }
        else {
            this.products.push(Object.assign(Object.assign({}, selectedProduct), { quantity: quantity }));
        }
        this.makePurchaseForm.reset();
    }
    removeProductFromList(product) {
        const index = this.products.findIndex(p => p.id == product.id);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
    }
    confirmPurchase(option) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres realizar la compra?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, comprar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.processPayment(option);
            }
        });
    }
};
__decorate([
    ViewChild('makePurchaseModal')
], MakePurchaseModalComponent.prototype, "makePurchaseModal", void 0);
MakePurchaseModalComponent = __decorate([
    Component({
        selector: 'app-make-purchase-modal',
        templateUrl: './make-purchase-modal.component.html',
        styleUrls: ['./make-purchase-modal.component.sass']
    })
], MakePurchaseModalComponent);
export { MakePurchaseModalComponent };
//# sourceMappingURL=make-purchase-modal.component.js.map