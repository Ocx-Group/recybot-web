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
let PrivilegeService = class PrivilegeService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.accountService;
    }
    updatePrivilege(model) {
        return this.http
            .put(this.urlApi.concat('/privilege/', model.id.toString()), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    createPrivilege(model) {
        return this.http
            .post(this.urlApi.concat('/privilege'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    getMenuConfigurations(rolId) {
        return this.http
            .get(this.urlApi.concat('/privilege/get_privilege_rol_id?rolId=', rolId.toString()), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    getAllPrivileges() {
        return this.http
            .get(this.urlApi.concat('/privilege/get_all'), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
};
PrivilegeService = __decorate([
    Injectable({ providedIn: 'root' })
], PrivilegeService);
export { PrivilegeService };
//# sourceMappingURL=privilege.service.js.map