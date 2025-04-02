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
    })
};
let PagaditoService = class PagaditoService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.walletService;
    }
    createTransaction(request) {
        return this.http
            .post(this.urlApi.concat('/Pagadito/create_transaction'), request, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
};
PagaditoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PagaditoService);
export { PagaditoService };
//# sourceMappingURL=pagadito.service.js.map