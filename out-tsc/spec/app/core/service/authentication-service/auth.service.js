import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '@environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: environment.tokens.accountService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let AuthService = class AuthService {
    constructor(http, toastr, cartService) {
        this.http = http;
        this.toastr = toastr;
        this.cartService = cartService;
        this.currentUserAffiliateSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUserAffiliate')));
        this.currentUserAdminSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUserAdmin')));
        this.currentUserAffiliate = this.currentUserAffiliateSubject.asObservable();
        this.currentUserAdmin = this.currentUserAdminSubject.asObservable();
        this.urlApi = environment.apis.accountService;
    }
    get currentUserAffiliateValue() {
        return this.currentUserAffiliateSubject.value;
    }
    get currentUserAdminValue() {
        return this.currentUserAdminSubject.value;
    }
    loginUser(userCredentials) {
        return this.http
            .post(this.urlApi.concat('/auth/login'), userCredentials, httpOptions)
            .pipe(map((response) => {
            if (response.success) {
                this.valiteUserType(response);
            }
            return response;
        }));
    }
    valiteUserType(response) {
        let isUserAffiliate = response.data.is_affiliate;
        if (isUserAffiliate) {
            this.setUserAffiliateValue(response.data);
        }
        else {
            this.setUserAdminValue(response.data);
        }
    }
    UserAffiliateEmailConfirmation(userName) {
        console.log(httpOptions);
        return this.http
            .put(this.urlApi.concat('/useraffiliateinfo/email_confirmation/', userName), {}, httpOptions)
            .pipe(map((data) => {
            return data;
        }), catchError((error) => {
            return throwError(error);
        }));
    }
    logoutUser() {
        this.cartService.removeAllCart();
        localStorage.removeItem('currentUserAdmin');
        localStorage.removeItem('currentUserAffiliate');
        this.currentUserAffiliateSubject.next(null);
        this.currentUserAdminSubject.next(null);
        this.toastr.clear();
        return of({ success: false });
    }
    setUserAffiliateValue(user) {
        localStorage.setItem('currentUserAffiliate', JSON.stringify(user));
        this.currentUserAffiliateSubject.next(user);
    }
    setUserAdminValue(user) {
        localStorage.setItem('currentUserAdmin', JSON.stringify(user));
        this.currentUserAdminSubject.next(user);
    }
    getLoginMovementsByAffiliatedId(affiliateId) {
        return this.http
            .get(`${this.urlApi}/auth/login_movements/${affiliateId}`, httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    fetchIpAddress() {
        return this.http
            .get('https://api.ipify.org?format=json')
            .pipe(map((data) => data.ip));
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map