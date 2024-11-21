import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '@environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.systemConfigurationService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let GradingService = class GradingService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.systemConfigurationService;
    }
    getAll() {
        return this.http.get(this.urlApi.concat('/grading'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getGradingById(id) {
        return this.http.get(`${this.urlApi}/grading/get_grading?id=${id}`, httpOptions).pipe(map((response) => {
            if (response.success)
                return response;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createGrading(grading) {
        return this.http
            .post(this.urlApi.concat('/grading'), grading, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updateGrading(grading) {
        return this.http
            .put(this.urlApi.concat('/grading/', grading.id.toString()), grading, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/grading/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getProductList() {
        return this.http.get('assets/data/admin/products-data.json');
    }
    getMembership() {
        return this.http.get('assets/data/admin/membership-data.json');
    }
};
GradingService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], GradingService);
export { GradingService };
//# sourceMappingURL=grading.service.js.map