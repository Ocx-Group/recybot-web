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
let ResultsEcoPoolService = class ResultsEcoPoolService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.walletService;
    }
    getAllResultsEcoPool() {
        return this.http
            .get(this.urlApi.concat('/resultsEcoPool/GetAllResultsEcoPool'), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
};
ResultsEcoPoolService = __decorate([
    Injectable({ providedIn: 'root' })
], ResultsEcoPoolService);
export { ResultsEcoPoolService };
//# sourceMappingURL=results-ecopool.service.js.map