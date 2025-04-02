import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { BehaviorSubject, map } from 'rxjs';
let CartService = class CartService {
    constructor(toast) {
        this.toast = toast;
        this.cartItemList = [];
        this.productList = new BehaviorSubject([]);
        this.search = new BehaviorSubject('');
        this.totalPrice = new BehaviorSubject(0);
        this.userReceivesPurchase = new BehaviorSubject(new UserAffiliate());
        this.normalUser = new BehaviorSubject(new UserAffiliate());
    }
    showError(message) {
        this.toast.error(message);
    }
    getProducts() {
        return this.productList.asObservable().pipe(map((products) => {
            let consolidatedProducts = [];
            let productMap = {};
            products.forEach(product => {
                if (productMap[product.id]) {
                    productMap[product.id].quantity += product.quantity;
                    productMap[product.id].total = productMap[product.id].salePrice * productMap[product.id].quantity;
                }
                else {
                    productMap[product.id] = Object.assign({}, product);
                    consolidatedProducts.push(productMap[product.id]);
                }
            });
            return consolidatedProducts;
        }));
    }
    setProduct(product) {
        this.cartItemList.push(...product);
        this.productList.next(product);
    }
    addtoCart(product) {
        const modelTwo = product.paymentGroup === 2;
        const modelOneA = product.paymentGroup === 7;
        const modelOneB = product.paymentGroup === 8;
        const otherModels = !(modelTwo || modelOneA || modelOneB);
        if (this.cartItemList.length > 0) {
            const cartContainsModelTwo = this.cartItemList.some(item => item.paymentGroup === 2);
            const cartContainsModelOneA = this.cartItemList.some(item => item.paymentGroup === 7);
            const cartContainsModelOneB = this.cartItemList.some(item => item.paymentGroup === 8);
            const cartContainsOtherModels = this.cartItemList.some(item => !(item.paymentGroup === 2 || item.paymentGroup === 7 || item.paymentGroup === 8));
            if ((modelTwo && (cartContainsModelOneA || cartContainsModelOneB || cartContainsOtherModels)) ||
                (modelOneA && (cartContainsModelTwo || cartContainsModelOneB || cartContainsOtherModels)) ||
                (modelOneB && (cartContainsModelOneA || cartContainsModelTwo || cartContainsOtherModels)) ||
                (otherModels && (cartContainsModelOneA || cartContainsModelTwo || cartContainsModelOneB))) {
                this.showError('No puedes mezclar servicios de diferentes modelos en el carrito.');
                return;
            }
        }
        this.cartItemList.push(Object.assign(Object.assign({}, product), { quantity: 1 }));
        let grandTotal = this.getTotalPrice();
        this.productList.next(this.cartItemList);
        this.totalPrice.next(grandTotal);
    }
    getTotalPrice() {
        let grandTotal = 0;
        this.cartItemList.map((a) => {
            grandTotal += a.quantity * a.salePrice;
        });
        return grandTotal;
    }
    removeCartItem(product) {
        const index = this.cartItemList.findIndex((item) => item.id === product.id);
        if (index !== -1) {
            this.cartItemList.splice(index, 1);
            this.productList.next(this.cartItemList);
        }
    }
    removeAllCart() {
        this.cartItemList = [];
        this.productList.next(this.cartItemList);
    }
    setPurchaseFromThirdParty(user) {
        this.userReceivesPurchase.next(user);
    }
    getPurchaseFromThirdParty() {
        return this.userReceivesPurchase.asObservable();
    }
    clearPurchaseFromThirdParty() {
        this.userReceivesPurchase.next(null);
    }
};
CartService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], CartService);
export { CartService };
//# sourceMappingURL=cart.service.js.map