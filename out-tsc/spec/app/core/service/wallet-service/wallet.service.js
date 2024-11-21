import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.walletService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let WalletService = class WalletService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.walletService;
    }
    createWallet(model) {
        return this.http
            .post(this.urlApi.concat('/wallet'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    getBalanceInformationAdmin() {
        return this.http
            .get(this.urlApi.concat('/wallet/GetBalanceInformationAdmin'), httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    getAllWallets() {
        return this.http
            .get(this.urlApi.concat('/wallet/GetAllWallets'), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    getWalletByAffiliateId(id) {
        return this.http
            .get(this.urlApi.concat('/wallet/GetWalletByAffiliateId/', id.toString()), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    getBalanceInformationByAffiliateId(id) {
        return this.http
            .get(this.urlApi.concat('/wallet/GetBalanceInformationByAffiliateId/', id.toString()), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    getStatisticsInformationByAffiliateId(id) {
        return this.http
            .get(`${this.urlApi}/userStatistics/${id}`, httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    payWithMyBalance(model) {
        return this.http
            .post(this.urlApi.concat('/wallet/payWithMyBalance'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    payWithMyBalanceForOthers(model) {
        return this.http
            .post(this.urlApi.concat('/wallet/payWithMyBalanceForOthers'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    payWithMyBalanceModel2(model) {
        return this.http
            .post(this.urlApi.concat('/wallet/payWithMyBalanceModel2'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    payMembershipWithMyBalance(model) {
        return this.http
            .post(this.urlApi.concat('/wallet/payMembershipWithMyBalance'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    payWithMyBalanceAdmin(model) {
        return this.http
            .post(this.urlApi.concat('/wallet/payWithMyBalanceAdmin'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    payWithMyBalanceCourses(model) {
        return this.http
            .post(this.urlApi.concat('/wallet/payWithMyBalanceCourses'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    transferBalanceForMembership(model) {
        return this.http
            .post(this.urlApi.concat('/wallet/transferBalanceForNewAffiliates'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    transferBalance(model) {
        return this.http
            .post(this.urlApi.concat('/wallet/transferBalance'), JSON.stringify(model), httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    rejectOrCancelRevertDebitTransaction(option, id) {
        return this.http
            .post(this.urlApi.concat('/wallet/rejectOrCancelRevertDebitTransaction?option=', option.toString()), id, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    getPurchasesInMyNetwork(id) {
        return this.http
            .get(this.urlApi.concat('/wallet/getPurchasesMadeInMyNetwork/', id.toString()), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    createBalanceAdmin(model) {
        return this.http
            .post(this.urlApi.concat('/wallet/createCreditAdmin'), model, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
};
WalletService = __decorate([
    Injectable({ providedIn: 'root' })
], WalletService);
export { WalletService };
//# sourceMappingURL=wallet.service.js.map