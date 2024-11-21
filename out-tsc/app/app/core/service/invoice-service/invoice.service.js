import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.walletService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let InvoiceService = class InvoiceService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.walletService;
    }
    getAllInvoicesUser(id) {
        return this.http.get(this.urlApi.concat('/invoice/GetAllInvoicesByUserId?id=', id.toString()), httpOptions).pipe(map((response) => {
            if (Array.isArray(response)) {
                return response;
            }
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getAllInvoices() {
        return this.http.get(this.urlApi.concat('/invoice/GetAllInvoices'), httpOptions).pipe(map((response) => {
            if (Array.isArray(response)) {
                return response;
            }
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    getAllInvoicesForTradingAcademyPurchases() {
        return this.http
            .get(this.urlApi.concat('/invoice/GetAllInvoicesForTradingAcademyPurchases'), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    sendInvitationsForUpcomingCourses(link, code) {
        let params = new HttpParams()
            .set('link', link)
            .set('code', code);
        const urlWithParams = `${this.urlApi}/invoice/SendInvitationsForUpcomingCourses?${params.toString()}`;
        return this.http
            .post(urlWithParams, {}, httpOptions)
            .pipe(map((response) => {
            return response;
        }));
    }
    getAllInvoicesForModelOneAndTwo() {
        return this.http
            .get(this.urlApi.concat('/invoice/GetAllInvoicesForModelOneAndTwo'), httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    processAndReturnBalancesForModels1A1B2(request) {
        return this.http
            .post(this.urlApi.concat('/invoice/ProcessAndReturnBalancesForModels1A1B2'), request, httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    createInvoice(invoiceId) {
        const options = {
            responseType: 'blob',
            params: new HttpParams().set('invoiceId', invoiceId.toString()),
            headers: new HttpHeaders({
                'Authorization': environment.tokens.walletService.toString(),
                'X-Client-ID': environment.tokens.clientID.toString()
            })
        };
        return this.http.get(`${this.urlApi}/invoice/create_invoice`, options);
    }
    createInvoiceByReference(reference) {
        const options = {
            responseType: 'blob',
            params: new HttpParams().set('reference', reference.toString()),
            headers: new HttpHeaders({
                'Authorization': environment.tokens.walletService.toString(),
                'X-Client-ID': environment.tokens.clientID.toString()
            }),
            observe: 'response'
        };
        return this.http.get(`${this.urlApi}/invoice/create_invoice_by_reference`, options)
            .pipe(map((response) => {
            const brandIdHeader = response.headers.get('X-Brand-Id');
            const brandId = brandIdHeader ? parseInt(brandIdHeader, 10) : null;
            console.log('Brand ID:', brandId);
            return {
                blob: response.body,
                brandId: brandId
            };
        }));
    }
};
InvoiceService = __decorate([
    Injectable({ providedIn: 'root' })
], InvoiceService);
export { InvoiceService };
//# sourceMappingURL=invoice.service.js.map