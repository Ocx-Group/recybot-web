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
let ConceptConfigurationService = class ConceptConfigurationService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.systemConfigurationService;
    }
    getConceptConfigurationByConceptId(id) {
        return this.http
            .get(this.urlApi.concat('/conceptConfiguration/get_all_concept_configuration?id=', id.toString()), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createConceptLevel(conceptLevel) {
        return this.http
            .post(this.urlApi.concat('/conceptConfiguration'), conceptLevel, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updateConceptLevel(conceptLevel) {
        return this.http
            .put(this.urlApi.concat('/conceptConfiguration/', conceptLevel.id.toString()), conceptLevel, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    delete(id) {
        return this.http
            .delete(this.urlApi.concat('/conceptConfiguration/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
ConceptConfigurationService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ConceptConfigurationService);
export { ConceptConfigurationService };
//# sourceMappingURL=concept-configuration.service.js.map