import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map } from 'rxjs';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.walletService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let WalletModel1BService = class WalletModel1BService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.walletService;
    }
    getBalanceInformationByAffiliateId(id) {
        return this.http
            .get(this.urlApi.concat('/walletModel1B/GetBalanceInformationByAffiliateId/', id.toString()), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    payWithMyBalance(model) {
        return this.http
            .post(this.urlApi.concat('/walletModel1B/payWithMyBalance1B'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    payWithMyServiceBalance(model) {
        return this.http
            .post(this.urlApi.concat('/walletModel1B/payWithMyServiceBalance'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    createServiceBalanceAdmin(model) {
        return this.http
            .post(this.urlApi.concat('/walletModel1B/CreateServiceBalanceAdmin'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
};
WalletModel1BService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], WalletModel1BService);
export { WalletModel1BService };
//# sourceMappingURL=wallet-model-1b.service.js.map