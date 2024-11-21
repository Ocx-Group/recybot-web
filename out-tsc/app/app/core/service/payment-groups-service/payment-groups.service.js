import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.systemConfigurationService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let PaymentGroupsService = class PaymentGroupsService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.systemConfigurationService;
    }
    getAll() {
        return this.http.get(this.urlApi.concat('/groups'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createPaymentGroup(paymentGroup) {
        return this.http
            .post(this.urlApi.concat('/groups'), paymentGroup, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updatePaymentGroup(paymentGroup) {
        return this.http
            .put(this.urlApi.concat('/groups/', paymentGroup.id.toString()), paymentGroup, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/groups/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
PaymentGroupsService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], PaymentGroupsService);
export { PaymentGroupsService };
//# sourceMappingURL=payment-groups.service.js.map