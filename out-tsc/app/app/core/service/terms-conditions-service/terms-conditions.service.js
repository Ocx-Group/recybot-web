import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let TermsConditionsService = class TermsConditionsService {
    constructor() {
        this.showModalSubject = new Subject();
        this.showModal$ = this.showModalSubject.asObservable();
    }
    show() {
        this.showModalSubject.next();
    }
};
TermsConditionsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TermsConditionsService);
export { TermsConditionsService };
//# sourceMappingURL=terms-conditions.service.js.map