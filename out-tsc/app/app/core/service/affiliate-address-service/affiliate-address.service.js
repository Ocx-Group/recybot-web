import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, map, throwError } from 'rxjs';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: environment.tokens.accountService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let AffiliateAddressService = class AffiliateAddressService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.accountService;
    }
    getAffiliateAddressByAffiliateId(id) {
        return this.http
            .get(`${this.urlApi}/affiliateAddress/getAffiliateAddressByAffiliateId/${id}`, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }), catchError((error) => {
            return throwError(error);
        }));
    }
};
AffiliateAddressService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], AffiliateAddressService);
export { AffiliateAddressService };
//# sourceMappingURL=affiliate-address.service.js.map