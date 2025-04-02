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
let ProductCombinationService = class ProductCombinationService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.inventoryService;
    }
    getProductCombinationByProductId(id) {
        return this.http
            .get(this.urlApi.concat('/productCombination/', id.toString()), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createProductCombination(productCombination) {
        return this.http
            .post(this.urlApi.concat('/productCombination'), productCombination, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/productCombination/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
ProductCombinationService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ProductCombinationService);
export { ProductCombinationService };
//# sourceMappingURL=product-combination.service.js.map