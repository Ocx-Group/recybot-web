import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ProductsComponent = class ProductsComponent {
    constructor(cartService, productService, toatr) {
        this.cartService = cartService;
        this.productService = productService;
        this.toatr = toatr;
        this.searchKey = '';
    }
    ngOnInit() {
        this.cartService.search.subscribe((val) => {
            this.searchKey = val;
        });
        this.handleProductLoading(this.tabActive);
    }
    addtocart(item) {
        if (this.addPurchase) {
            this.cartService.addtoCart(item);
        }
    }
    filter(category) {
        this.filterCategory = this.productList.filter((a) => {
            if (a.category == category || category == '') {
                return a;
            }
        });
    }
    showError(error) {
        this.toatr.error(error);
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
    loadAllServices() {
        this.productService.getAllServices().subscribe((services) => {
            this.productList = services;
            this.filterCategory = services;
            this.productList.forEach((item) => {
                Object.assign(item, { quantity: 1, total: item.salePrice });
            });
        });
    }
    loadAllTradingAcademy() {
        this.productService.getAllTradingAcademy().subscribe((suscriptions) => {
            this.productList = suscriptions;
            this.filterCategory = suscriptions;
            this.productList.forEach((item) => {
                Object.assign(item, { quantity: 1, total: item.salePrice });
            });
        });
    }
    getAllFundingAccounts() {
        this.productService.getAllFundingAccounts().subscribe((fundingAccounts) => {
            this.productList = fundingAccounts;
            this.filterCategory = fundingAccounts;
            this.productList.forEach((item) => {
                Object.assign(item, { quantity: 1, total: item.salePrice });
            });
        });
    }
    loadSavingsPlans() {
        this.productService.getAllSavingsPlans().subscribe((savingsPlans) => {
            this.productList = savingsPlans;
            this.filterCategory = savingsPlans;
            this.productList.forEach((item) => {
                Object.assign(item, { quantity: 1, total: item.salePrice });
            });
        });
    }
    loadSavingsPlansOneB() {
        this.productService.getAllSavingsPlansOneB().subscribe((savingsPlans) => {
            this.productList = savingsPlans;
            this.filterCategory = savingsPlans;
            this.productList.forEach((item) => {
                Object.assign(item, { quantity: 1, total: item.salePrice });
            });
        });
    }
    loadAllAlternativeHealth() {
        this.productService.getAllAlternativeHealth().subscribe((alternativeHealth) => {
            this.productList = alternativeHealth;
            this.filterCategory = alternativeHealth;
            this.productList.forEach((item) => {
                Object.assign(item, { quantity: 1, total: item.salePrice });
            });
        });
    }
    loadAllAlternativeHealthForEurope() {
        this.productService.getAllAlternativeHealthForEurope().subscribe((alternativeHealth) => {
            this.productList = alternativeHealth;
            this.filterCategory = alternativeHealth;
            this.productList.forEach((item) => {
                Object.assign(item, { quantity: 1, total: item.salePrice });
            });
        });
    }
    loadAllRecyCoin() {
        this.productService.getAllRecyCoin().subscribe((coin) => {
            this.productList = coin;
            this.filterCategory = coin;
            this.productList.forEach((item) => {
                Object.assign(item, { quantity: 1, total: item.salePrice });
            });
        });
    }
    handleProductLoading(tabActive) {
        switch (tabActive) {
            case 1:
                this.loadAllEcoPooles();
                break;
            case 2:
                this.loadAllServices();
                break;
            case 3:
                this.loadAllTradingAcademy();
                break;
            case 4:
                this.getAllFundingAccounts();
                break;
            case 5:
                this.loadSavingsPlans();
                break;
            case 6:
                this.loadSavingsPlansOneB();
                break;
            case 7:
                this.loadAllAlternativeHealth();
                break;
            case 8:
                this.loadAllAlternativeHealthForEurope();
                break;
            case 9:
                this.loadAllRecyCoin();
                break;
            default:
                this.showError('No se encontró productos');
                break;
        }
    }
};
__decorate([
    Input()
], ProductsComponent.prototype, "tabActive", void 0);
__decorate([
    Input()
], ProductsComponent.prototype, "addPurchase", void 0);
ProductsComponent = __decorate([
    Component({
        selector: 'app-products',
        templateUrl: './products.component.html',
        styleUrls: ['./products.component.scss'],
    })
], ProductsComponent);
export { ProductsComponent };
//# sourceMappingURL=products.component.js.map