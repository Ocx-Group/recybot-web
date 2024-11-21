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
let ProductAttributeService = class ProductAttributeService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.inventoryService;
    }
    getAll() {
        return this.http
            .get(this.urlApi.concat('/productAttribute'), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createProductAttribute(productAttribute) {
        return this.http
            .post(this.urlApi.concat('/productAttribute'), productAttribute, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updateProductAttribute(productAttribute) {
        return this.http
            .put(this.urlApi.concat('/productAttribute/', productAttribute.id.toString()), productAttribute, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/productAttribute/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getAttributeType() {
        return this.http.get('assets/data/admin/product-attributes-data.json');
    }
};
ProductAttributeService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ProductAttributeService);
export { ProductAttributeService };
//# sourceMappingURL=product-attribute.service.js.map