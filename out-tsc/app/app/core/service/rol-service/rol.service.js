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
let RolService = class RolService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.accountService;
    }
    getAll() {
        return this.http.get(this.urlApi.concat('/role/get_all'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getRol() {
        return this.http.get(this.urlApi.concat('/role/get_rol'), httpOptions).pipe(map((response) => {
            return response;
        }));
    }
    updateRol(model) {
        return this.http
            .put(this.urlApi.concat('/role/', model.id.toString()), model, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    deleteRol(id) {
        return this.http
            .delete(this.urlApi.concat('/role/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    createRol(model) {
        return this.http
            .post(this.urlApi.concat('/role'), model, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
};
RolService = __decorate([
    Injectable({ providedIn: 'root' })
], RolService);
export { RolService };
//# sourceMappingURL=rol.service.js.map