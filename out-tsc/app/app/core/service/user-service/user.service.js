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
let UserService = class UserService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.accountService;
    }
    getAll() {
        return this.http.get(this.urlApi.concat('/user/get_all'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getUsersByRolId(user) {
        return this.http
            .get(this.urlApi.concat('/user/get_users_rol_id?id=', user.rol_id.toString()), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getUser(user) {
        return this.http
            .get(this.urlApi.concat('/user/get_user?id=', user.id.toString()), httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    updatePassword(user) {
        return this.http
            .put(this.urlApi.concat('/user/update_password_user/', user.id.toString()), user, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updateUser(user) {
        return this.http
            .put(this.urlApi.concat('/user/', user.id.toString()), user, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    deleteUser(id) {
        return this.http
            .delete(this.urlApi.concat('/user/', id.toString()), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    createUser(user) {
        return this.http.post(this.urlApi.concat('/user'), user, httpOptions).pipe(map((data) => {
            return data;
        }));
    }
    updateImageProfile(id, imgProfile) {
        return this.http
            .put(`${this.urlApi}/user/update_image_profile_url/${id}`, imgProfile, httpOptions)
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
UserService = __decorate([
    Injectable({ providedIn: 'root' })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map