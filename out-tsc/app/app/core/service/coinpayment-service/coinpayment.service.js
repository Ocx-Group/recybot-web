import { __decorate } from "tslib";
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, map } from 'rxjs';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': environment.tokens.walletService.toString(), 'X-Client-ID': environment.tokens.clientID.toString() }),
};
let CoinpaymentService = class CoinpaymentService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.transactionStatus = new BehaviorSubject(-1);
        this.currentStatus = this.transactionStatus.asObservable();
        this.urlApi = environment.apis.walletService;
    }
    changeStatus(status) {
        this.transactionStatus.next(status);
    }
    createTransaction(transactionRequest) {
        return this.http
            .post(this.urlApi.concat('/conPayments/createPayment'), transactionRequest, httpOptions);
    }
    getTransactionInfo(idTransaction, fullInfo) {
        const params = new HttpParams()
            .set('idTransaction', idTransaction)
            .set('fullInfo', fullInfo.toString());
        const requestOptions = Object.assign(Object.assign({}, httpOptions), { params: params });
        return this.http
            .get(this.urlApi.concat('/conPayments/getTransactionInfo'), requestOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createMassWithdrawal(walletsRequests) {
        return this.http
            .post(this.urlApi.concat('/conPayments/createMassWithdrawal'), walletsRequests, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
CoinpaymentService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], CoinpaymentService);
export { CoinpaymentService };
//# sourceMappingURL=coinpayment.service.js.map