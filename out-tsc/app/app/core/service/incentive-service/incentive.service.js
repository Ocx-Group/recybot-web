import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map } from 'rxjs';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.systemConfigurationService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let IncentiveService = class IncentiveService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.systemConfigurationService;
    }
    getAll() {
        return this.http.get(this.urlApi.concat('/incentives'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createGrading(incentive) {
        return this.http
            .post(this.urlApi.concat('/incentives'), incentive, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/incentives/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updateIncentive(incentive) {
        return this.http
            .put(this.urlApi.concat('/incentives/', incentive.id.toString()), incentive, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
IncentiveService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], IncentiveService);
export { IncentiveService };
//# sourceMappingURL=incentive.service.js.map