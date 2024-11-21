import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
let CoinService = class CoinService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = 'https://api.coincap.io/v2/assets/bitcoin';
    }
    getCoin() {
        return this.http.get(this.urlApi).pipe(map((response) => {
            if (response.data) {
                return response.data;
            }
            else {
                console.error('ERROR: Invalid response');
                return null;
            }
        }));
    }
};
CoinService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], CoinService);
export { CoinService };
//# sourceMappingURL=coin.service.js.map