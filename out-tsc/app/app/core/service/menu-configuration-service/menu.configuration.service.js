import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.accountService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let MenuConfigurationService = class MenuConfigurationService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.accountService;
    }
    getAll() {
        return this.http
            .get(this.urlApi.concat('/MenuConfiguration/get_all'), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
};
MenuConfigurationService = __decorate([
    Injectable({ providedIn: 'root' })
], MenuConfigurationService);
export { MenuConfigurationService };
//# sourceMappingURL=menu.configuration.service.js.map