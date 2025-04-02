import { __decorate } from "tslib";
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: environment.tokens.accountService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let AffiliateService = class AffiliateService {
    constructor(http) {
        this.http = http;
        this.idSource = new BehaviorSubject(null);
        this.currentId = this.idSource.asObservable();
        this.urlApi = environment.apis.accountService;
    }
    changeId(id) {
        this.idSource.next(id);
    }
    getAll() {
        return this.http
            .get(this.urlApi.concat('/userAffiliateInfo/get_all'), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getAllAffiliatesAuthorization() {
        return this.http
            .get(this.urlApi.concat('/userAffiliateInfo/get_all_without_authorization'), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getCountries() {
        return this.http
            .get(this.urlApi.concat('/auth/countries'), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    updateAffiliate(affiliate) {
        return this.http
            .put(`${this.urlApi}/useraffiliateinfo/${affiliate.id}`, affiliate, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    updateUserProfile(affiliate) {
        return this.http
            .put(`${this.urlApi}/useraffiliateinfo/update_user_profile/${affiliate.id}`, affiliate, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    authorizationAffiliates(approvedArray, disApprovedArray) {
        let request = { approvedArray, disApprovedArray };
        return this.http
            .post(this.urlApi.concat('/useraffiliateinfo/authorization_affiliates'), request, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    sendEmailConfirm(id) {
        return this.http
            .post(this.urlApi.concat('/useraffiliateinfo/send_email_confirmation/', id.toString()), {}, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getAffiliateByUserName(username) {
        return this.http
            .get(this.urlApi.concat('/useraffiliateinfo/get_user_username/' + username), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }), catchError((error) => {
            return throwError(error);
        }));
    }
    getAffiliateById(id) {
        return this.http
            .get(`${this.urlApi}/useraffiliateinfo/get_user_id/${id}`, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }), catchError((error) => {
            return throwError(error);
        }));
    }
    GetPersonalNetwork(id) {
        return this.http
            .get(`${this.urlApi}/UserAffiliateInfo/getPersonalNetwork/${id}`, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }), catchError((error) => {
            return throwError(error);
        }));
    }
    createAffiliate(user) {
        return this.http
            .post(this.urlApi.concat('/useraffiliateinfo'), user, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updatePassword(user) {
        return this.http
            .put(this.urlApi.concat('/useraffiliateinfo/update_password_user/', user.id.toString()), user, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updatePin(user) {
        return this.http
            .put(`${this.urlApi}/useraffiliateinfo/update_pin/${user.id})`, user, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    updateSecretQuestion(data) {
        return this.http
            .put(`${this.urlApi}/useraffiliateinfo/secret_question/${data.id})`, data, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getBinaryTree(id) {
        let url = id == 0 ? `/LeaderBoard/model4/getTree` : `/LeaderBoard/model4/getTree?id=${id}`;
        return this.http
            .get(`${this.urlApi}${url}`, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return JSON.parse(response.data);
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getTreeModel5(id) {
        let url = id == 0 ? `/LeaderBoard/model5/getTree` : `/LeaderBoard/model5/getTree?id=${id}`;
        return this.http
            .get(`${this.urlApi}${url}`, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getTreeModel6(id) {
        let url = id == 0 ? `/LeaderBoard/model6/getTree` : `/LeaderBoard/model6/getTree?id=${id}`;
        return this.http
            .get(`${this.urlApi}${url}`, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getUniLevelTree(id) {
        const url = id == 0 ? `/matrix/uni_level` : `/matrix/uni_level?id=${id}`;
        return this.http
            .get(`${this.urlApi}${url}`, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    updateImageIdPath(updateImageIdPath) {
        return this.http
            .put(`${this.urlApi}/useraffiliateinfo/update_image_id_path/${updateImageIdPath.id}`, updateImageIdPath, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    generateVerificationCode(id, checkDate) {
        const params = new HttpParams().set('checkDate', checkDate.toString());
        return this.http
            .post(`${this.urlApi}/useraffiliateinfo/generateVerificationCode/${id.toString()}`, {}, { headers: httpOptions.headers, params: params })
            .pipe(map((response) => {
            if (!response.success) {
                console.error('ERROR: ' + response.message);
            }
            return response;
        }));
    }
    getTotalActiveMembers() {
        return this.http
            .get(`${this.urlApi}/useraffiliateinfo/getTotalActiveMembers`, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }), catchError((error) => {
            return throwError(error);
        }));
    }
    updateCardIdAuthorization(id, option) {
        return this.http
            .put(`${this.urlApi}/useraffiliateinfo/update_card_id_authorization/${id}`, option, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    sendPasswordRecovery(email) {
        return this.http
            .post(this.urlApi.concat('/useraffiliateinfo/sendEmailToChangePassword'), JSON.stringify(email), httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getAffiliateByVerificationCode(code) {
        return this.http
            .get(this.urlApi.concat('/useraffiliateinfo/getAffiliateByVerificationCode/' + code), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }), catchError((error) => {
            return throwError(error);
        }));
    }
    resetPassword(requestResetPassword) {
        return this.http
            .post(this.urlApi.concat('/useraffiliateinfo/resetPassword'), requestResetPassword, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getTotalAffiliatesByCountries() {
        return this.http
            .get(`${this.urlApi}/useraffiliateinfo/getTotalAffiliatesByCountries`, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }), catchError((error) => {
            return throwError(error);
        }));
    }
    updateImageProfile(id, imgProfile) {
        return this.http
            .put(`${this.urlApi}/useraffiliateinfo/update_image/${id}`, imgProfile, httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    updateMessageAlert(affiliateId) {
        return this.http
            .put(`${this.urlApi}/useraffiliateinfo/update_message_alert/${affiliateId}`, {}, httpOptions)
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
AffiliateService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], AffiliateService);
export { AffiliateService };
//# sourceMappingURL=affiliate.service.js.map