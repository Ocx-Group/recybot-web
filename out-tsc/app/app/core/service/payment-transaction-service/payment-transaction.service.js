import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '@environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.walletService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let PaymentTransactionService = class PaymentTransactionService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.walletService;
    }
    createPaymentTransaction(transaction) {
        return this.http
            .post(this.urlApi.concat('/PaymentTransaction'), transaction, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getAllWireTransactions() {
        return this.http
            .get(this.urlApi.concat('/PaymentTransaction/getAllWireTransfer'), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    confirmPayment(transaction) {
        return this.http
            .post(this.urlApi.concat('/PaymentTransaction/confirmPayment'), transaction, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
PaymentTransactionService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PaymentTransactionService);
export { PaymentTransactionService };
//# sourceMappingURL=payment-transaction.service.js.map