import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AcademyComponent = class AcademyComponent {
    constructor(productService, toast, cartService) {
        this.productService = productService;
        this.toast = toast;
        this.cartService = cartService;
        this.products = [];
    }
    ngOnInit() {
        this.loadProduct();
    }
    showSuccess(message) {
        this.toast.success(message);
    }
    showError(message) {
        this.showError(message);
    }
    loadProduct() {
        this.productService.getAllTradingAcademy().subscribe({
            next: (value) => {
                this.products = value;
                this.products.forEach((item) => {
                    Object.assign(item, { quantity: 1, total: item.salePrice });
                });
            },
            error: (err) => {
                this.showError('Error');
            },
        });
    }
};
AcademyComponent = __decorate([
    Component({
        selector: 'app-academy',
        templateUrl: './academy.component.html',
        styleUrls: ['./academy.component.scss']
    })
], AcademyComponent);
export { AcademyComponent };
//# sourceMappingURL=academy.component.js.map