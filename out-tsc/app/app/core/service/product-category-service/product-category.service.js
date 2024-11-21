import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ProductCategory } from '@app/core/models/product-category-model/product-category.model';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.inventoryService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let ProductCategoryService = class ProductCategoryService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.inventoryService;
    }
    getAll() {
        return this.http.get(this.urlApi.concat('/productCategory'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createCategory(productCategory) {
        return this.http
            .post(this.urlApi.concat('/productCategory'), productCategory, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updateCategory(productCategory) {
        return this.http
            .put(this.urlApi.concat('/productCategory/', productCategory.id.toString()), ProductCategory, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/productCategory/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
ProductCategoryService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ProductCategoryService);
export { ProductCategoryService };
//# sourceMappingURL=product-category.service.js.map