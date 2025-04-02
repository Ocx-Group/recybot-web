import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let MembershipManagerService = class MembershipManagerService {
    constructor() {
        this.showModalSubject = new Subject();
        this.closeModalSubject = new Subject();
        this.showModal$ = this.showModalSubject.asObservable();
        this.closeModal$ = this.closeModalSubject.asObservable();
    }
    show() {
        this.showModalSubject.next();
    }
    close() {
        this.closeModalSubject.next();
    }
};
MembershipManagerService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MembershipManagerService);
export { MembershipManagerService };
//# sourceMappingURL=membership-manager.service.js.map