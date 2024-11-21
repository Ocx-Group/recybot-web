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
let WalletWithDrawalService = class WalletWithDrawalService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.walletService;
    }
    createWalletWithDrawal(model) {
        return this.http
            .post(this.urlApi.concat('/walletWithdrawal'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    getAllWalletsWithDrawals() {
        return this.http
            .get(this.urlApi.concat('/walletWithdrawal/GetAllWalletsWithdrawals'), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
};
WalletWithDrawalService = __decorate([
    Injectable({ providedIn: 'root' })
], WalletWithDrawalService);
export { WalletWithDrawalService };
//# sourceMappingURL=wallet-withdrawal.service.js.map