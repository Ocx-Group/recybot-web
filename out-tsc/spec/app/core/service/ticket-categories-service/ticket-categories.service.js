import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '@environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.accountService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let TicketCategoriesService = class TicketCategoriesService {
    constructor(http) {
        this.http = http;
        this.urlApi = environment.apis.accountService;
    }
    getAll() {
        return this.http.get(this.urlApi.concat('/ticketCategories/get_all'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
};
TicketCategoriesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TicketCategoriesService);
export { TicketCategoriesService };
//# sourceMappingURL=ticket-categories.service.js.map