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
let ProductInventoryService = class ProductInventoryService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.inventoryService;
    }
    getProductsInventoryByProductId(id) {
        return this.http
            .get(this.urlApi.concat('/productInventory/', id.toString()), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createProductInventory(productInventory) {
        return this.http
            .post(this.urlApi.concat('/productInventory'), productInventory, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updateProductInventory(productInventory) {
        return this.http
            .put(this.urlApi.concat('/productInventory/', productInventory.id.toString()), productInventory, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/productInventory/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
ProductInventoryService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ProductInventoryService);
export { ProductInventoryService };
//# sourceMappingURL=product-inventory.service.js.map