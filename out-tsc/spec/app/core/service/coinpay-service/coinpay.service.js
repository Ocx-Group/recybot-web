import { __decorate } from "tslib";
import { catchError, map, throwError } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': environment.tokens.walletService.toString(), 'X-Client-ID': environment.tokens.clientID.toString() }),
};
let CoinpayService = class CoinpayService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.walletService;
    }
    createCoinPayTransaction(requestPayment) {
        return this.http
            .post(this.urlApi.concat('/coinpay/createTransaction'), requestPayment, httpOptions);
    }
    createChannel(request) {
        return this.http
            .post(this.urlApi.concat('/coinpay/createChannel'), request, httpOptions)
            .pipe(map((response) => {
            console.log('response', response);
            return response;
        }));
    }
    sendFunds(withdrawalRequest) {
        return this.http.post(this.urlApi.concat('/coinpay/sendFunds'), withdrawalRequest, httpOptions)
            .pipe(map(data => data));
    }
    getTransactionByReference(reference) {
        const params = new HttpParams().set('reference', reference);
        return this.http.get(this.urlApi.concat('/coinpay/getTransactionByReference'), Object.assign({ params }, httpOptions))
            .pipe(map(data => data));
    }
    getNetworks(idCurrency) {
        return this.http
            .get(this.urlApi.concat(`/coinpay/getNetworksByIdCurrency?idCurrency=${idCurrency}`), httpOptions)
            .pipe(map((response) => {
            console.log(response);
            if (response)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }), catchError((error) => {
            return throwError(error);
        }));
    }
};
CoinpayService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CoinpayService);
export { CoinpayService };
//# sourceMappingURL=coinpay.service.js.map