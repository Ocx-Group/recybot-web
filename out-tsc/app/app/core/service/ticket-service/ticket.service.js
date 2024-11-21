import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, map } from 'rxjs';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.accountService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let TicketService = class TicketService {
    constructor(http) {
        this.http = http;
        this.currentTicket = new BehaviorSubject(null);
        this.urlApi = environment.apis.accountService;
    }
    createTicket(ticket) {
        return this.http
            .post(this.urlApi.concat('/ticket'), ticket, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getAllTicketsByAffiliateId(affiliateId) {
        return this.http
            .get(`${this.urlApi}/ticket/GetAllTickets/${affiliateId}`, httpOptions)
            .pipe(map((response) => {
            return response.data;
        }));
    }
    setTicket(ticket) {
        this.currentTicket.next(ticket);
    }
    getTicket() {
        return this.currentTicket.asObservable();
    }
};
TicketService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TicketService);
export { TicketService };
//# sourceMappingURL=ticket.service.js.map