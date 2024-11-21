import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let RightSidebarService = class RightSidebarService {
    constructor() {
        this.sidebarSubject = new BehaviorSubject(false);
        this.sidebarState = this.sidebarSubject.asObservable();
        this.setRightSidebar = (value) => {
            this.sidebarSubject.next(value);
        };
    }
};
RightSidebarService = __decorate([
    Injectable()
], RightSidebarService);
export { RightSidebarService };
//# sourceMappingURL=rightsidebar.service.js.map