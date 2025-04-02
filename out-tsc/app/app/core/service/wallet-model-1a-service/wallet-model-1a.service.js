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
let WalletModel1AService = class WalletModel1AService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.walletService;
    }
    getBalanceInformationByAffiliateId(id) {
        return this.http
            .get(this.urlApi.concat('/walletModel1A/GetBalanceInformationByAffiliateId/', id.toString()), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    payWithMyBalance(model) {
        return this.http
            .post(this.urlApi.concat('/walletModel1A/payWithMyBalance1A'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    payWithServiceBalance(model) {
        return this.http
            .post(this.urlApi.concat('/walletModel1A/payWithMyServiceBalance'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    createServiceBalanceAdmin(model) {
        return this.http
            .post(this.urlApi.concat('/walletModel1A/CreateServiceBalanceAdmin'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
};
WalletModel1AService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], WalletModel1AService);
export { WalletModel1AService };
//# sourceMappingURL=wallet-model-1a.service.js.map