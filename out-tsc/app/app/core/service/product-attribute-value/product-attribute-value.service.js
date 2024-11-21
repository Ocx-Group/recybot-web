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
let ProductAttributeValueService = class ProductAttributeValueService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.inventoryService;
    }
    getAttributeValueByAttributeId(id) {
        return this.http
            .get(this.urlApi.concat('/productAttributeValue/', id.toString()), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createProductAttributeValue(productAttributeValue) {
        return this.http
            .post(this.urlApi.concat('/productAttributeValue'), productAttributeValue, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/productAttributeValue/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
ProductAttributeValueService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ProductAttributeValueService);
export { ProductAttributeValueService };
//# sourceMappingURL=product-attribute-value.service.js.map