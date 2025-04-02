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
let WalletWaitService = class WalletWaitService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.walletService;
    }
    createWalletWait(model) {
        return this.http
            .post(this.urlApi.concat('/walletWait'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    getAllWalletsWait() {
        return this.http
            .get(this.urlApi.concat('/walletWait/GetAllWalletsWaits'), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
};
WalletWaitService = __decorate([
    Injectable({ providedIn: 'root' })
], WalletWaitService);
export { WalletWaitService };
//# sourceMappingURL=wallet-wait.service.js.map