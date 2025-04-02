import { __decorate } from "tslib";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: environment.tokens.accountService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let AffiliateBtcService = class AffiliateBtcService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.accountService;
    }
    createAffiliateBtc(affiliateBtc) {
        return this.http
            .post(this.urlApi.concat('/affiliateBtc'), affiliateBtc, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getAffiliateBtcByAffiliateId(id) {
        return this.http
            .get(`${this.urlApi}/affiliateBtc/get_affiliate_btc_by_affiliate_id/${id}`, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
};
AffiliateBtcService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], AffiliateBtcService);
export { AffiliateBtcService };
//# sourceMappingURL=affiliate-btc.service.js.map