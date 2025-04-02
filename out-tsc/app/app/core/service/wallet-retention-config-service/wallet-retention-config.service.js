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
let WalletRetentionConfigService = class WalletRetentionConfigService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.walletService;
    }
    createWalletRetentionConfig(model) {
        return this.http
            .post(this.urlApi.concat('/walletRetentionConfig'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    getAllWalletsRetentionConfig() {
        return this.http
            .get(this.urlApi.concat('/walletRetentionConfig/GetAllWalletsRetentionConfig'), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/walletRetentionConfig/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
WalletRetentionConfigService = __decorate([
    Injectable({ providedIn: 'root' })
], WalletRetentionConfigService);
export { WalletRetentionConfigService };
//# sourceMappingURL=wallet-retention-config.service.js.map