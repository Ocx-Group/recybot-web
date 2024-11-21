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
let WalletPeriodService = class WalletPeriodService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.walletService;
    }
    createWalletPeriod(model) {
        return this.http
            .post(this.urlApi.concat('/walletPeriod'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    getAllWalletsPeriods() {
        return this.http
            .get(this.urlApi.concat('/walletPeriod/GetAllWalletsPeriods'), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/walletPeriod/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
WalletPeriodService = __decorate([
    Injectable({ providedIn: 'root' })
], WalletPeriodService);
export { WalletPeriodService };
//# sourceMappingURL=wallet-period.service.js.map