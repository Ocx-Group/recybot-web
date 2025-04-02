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
let ProductService = class ProductService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.inventoryService;
    }
    getAllEcoPooles() {
        return this.http.get(this.urlApi.concat('/product'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getAllServices() {
        return this.http.get(this.urlApi.concat('/product/get_all_services'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getAllProductsAdmin() {
        return this.http.get(this.urlApi.concat('/product/getAllProductsAdmin'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getAllMembership() {
        return this.http.get(this.urlApi.concat('/product/membership'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createProduct(product) {
        return this.http
            .post(this.urlApi.concat('/product'), product, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updateProduct(product) {
        return this.http
            .put(this.urlApi.concat('/product/', product.id.toString()), product, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/product/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getAllFundingAccounts() {
        return this.http.get(this.urlApi.concat('/product/get_all_funding_accounts'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getAllTradingAcademy() {
        return this.http.get(this.urlApi.concat('/product/get_all_trading_academy'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getAllSavingsPlans() {
        return this.http.get(this.urlApi.concat('/product/get_all_savings_plans'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getAllSavingsPlansOneB() {
        return this.http.get(this.urlApi.concat('/product/get_all_savings_plans_one_b'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getAllAlternativeHealth() {
        return this.http.get(this.urlApi.concat('/product/get_all_alternative_health'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR' + response);
                return null;
            }
        }));
    }
    getAllAlternativeHealthForEurope() {
        return this.http.get(this.urlApi.concat('/product/get_all_alternative_health_for_europe'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR' + response);
                return null;
            }
        }));
    }
    getAllRecyCoin() {
        return this.http.get(this.urlApi.concat('/product/get_all_recycoin'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR' + response);
                return null;
            }
        }));
    }
};
ProductService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map