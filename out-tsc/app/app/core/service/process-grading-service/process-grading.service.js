import { __decorate } from "tslib";
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject, interval } from 'rxjs';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.walletService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let ProcessGradingService = class ProcessGradingService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.progressSource = new BehaviorSubject(0);
        this.stop$ = new Subject();
        this.progress$ = this.progressSource.asObservable();
        this.urlApi = environment.apis.walletService;
    }
    execEcoPoolProcess() {
        return this.http
            .post(`${this.urlApi}/processGrading/eco_pool_process`, {}, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    createEcoPoolConfiguration(model) {
        return this.http
            .post(this.urlApi.concat('/processGrading/eco_pool_configuration'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    getEcoPoolConfiguration() {
        return this.http
            .get(this.urlApi.concat('/processGrading'), httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    getProgressPercentage(configurationId) {
        return this.http
            .get(`${this.urlApi}/processGrading/GetProgressPercentage/${configurationId}`, httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    startFetchingProgress(configurationId) {
        interval(2000).pipe(takeUntil(this.stop$), switchMap(() => this.getProgressPercentage(configurationId))).subscribe(progress => {
            this.progressSource.next(progress);
        }, error => console.error(error));
    }
    stopFetchingProgress() {
        this.stop$.next();
    }
};
ProcessGradingService = __decorate([
    Injectable({ providedIn: 'root' })
], ProcessGradingService);
export { ProcessGradingService };
//# sourceMappingURL=process-grading.service.js.map