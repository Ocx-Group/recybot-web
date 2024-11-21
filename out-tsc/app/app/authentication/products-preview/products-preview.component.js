import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProductsPreviewComponent = class ProductsPreviewComponent {
    constructor(productService) {
        this.productService = productService;
    }
    ngOnInit() {
        this.loadAllRecyCoin();
    }
    loadAllRecyCoin() {
        this.productService.getAllRecyCoin().subscribe((coin) => {
            this.productList = coin;
            this.productList.forEach((item) => {
                Object.assign(item, { quantity: 1, total: item.salePrice });
            });
        });
    }
};
ProductsPreviewComponent = __decorate([
    Component({
        selector: 'app-products-preview',
        templateUrl: './products-preview.component.html',
        styleUrls: ['./products-preview.component.scss']
    })
], ProductsPreviewComponent);
export { ProductsPreviewComponent };
//# sourceMappingURL=products-preview.component.js.map