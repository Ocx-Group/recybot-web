import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.systemConfigurationService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let ConceptService = class ConceptService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.systemConfigurationService;
    }
    getAll() {
        return this.http.get(this.urlApi.concat('/concept')).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getCalculateConceptList() {
        return this.http.get('assets/data/admin/calculate-concept-data.json');
    }
    getPayConceptList() {
        return this.http.get('assets/data/admin/pay-concept-data.json');
    }
    createConcept(concept) {
        return this.http
            .post(this.urlApi.concat('/concept'), concept, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updateConcept(concept) {
        return this.http
            .put(this.urlApi.concat('/concept/', concept.id.toString()), concept, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/concept/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
ConceptService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ConceptService);
export { ConceptService };
//# sourceMappingURL=concept.service.js.map