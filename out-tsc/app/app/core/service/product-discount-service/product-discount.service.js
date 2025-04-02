import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.inventoryService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let ProductDiscountService = class ProductDiscountService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.inventoryService;
    }
    getAll() {
        return this.http
            .get(this.urlApi.concat('/productDiscount'), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getAllProductsDiscountByProductId(id) {
        return this.http
            .get(this.urlApi.concat('/productDiscount/', id.toString()), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createProductDiscount(productDiscount) {
        return this.http
            .post(this.urlApi.concat('/productDiscount'), productDiscount, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updateProductDiscount(productDiscount) {
        return this.http
            .put(this.urlApi.concat('/productDiscount/', productDiscount.id.toString()), productDiscount, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/productDiscount/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
ProductDiscountService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ProductDiscountService);
export { ProductDiscountService };
//# sourceMappingURL=product-discount.service.js.map