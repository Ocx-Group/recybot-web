import { __decorate } from "tslib";
import { Component } from '@angular/core';
let BillingPurchaseComponent = class BillingPurchaseComponent {
    constructor() {
        this.active = 1;
    }
    ngOnInit() {
    }
    search(event) {
        this.searchTerm = event.target.value;
    }
    onTabChange(newActive) {
        this.active = newActive;
    }
};
BillingPurchaseComponent = __decorate([
    Component({
        selector: 'app-billing-purchase',
        templateUrl: './billing-purchase.component.html',
        styleUrls: ['./billing-purchase.component.scss'],
    })
], BillingPurchaseComponent);
export { BillingPurchaseComponent };
//# sourceMappingURL=billing-purchase.component.js.map