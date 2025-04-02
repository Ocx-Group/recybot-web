import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.walletService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let WalletRequestService = class WalletRequestService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.walletService;
    }
    createWalletRequest(model) {
        return this.http
            .post(this.urlApi.concat('/walletRequest'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    getAllWallets() {
        return this.http
            .get(this.urlApi.concat('/walletRequest/GetAllWalletsRequests'), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    getWalletRequestByAffiliateId(id) {
        return this.http
            .get(this.urlApi.concat('/walletRequest/', id.toString()), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    processOption(option, ids) {
        return this.http
            .post(this.urlApi.concat('/walletRequest/processOption?option=', option.toString()), ids, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    getAllWalletRequestRevertTransaction() {
        return this.http
            .get(this.urlApi.concat('/walletRequest/getAllWalletRequestRevertTransaction'), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    createWalletRequestRevertDebitTransaction(model) {
        return this.http
            .post(this.urlApi.concat('/walletRequest/createWalletRequestRevert'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    administrativePayment(model) {
        return this.http
            .post(this.urlApi.concat('/walletRequest/administrativePaymentAsync'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
};
WalletRequestService = __decorate([
    Injectable({ providedIn: 'root' })
], WalletRequestService);
export { WalletRequestService };
//# sourceMappingURL=wallet-request.service.js.map