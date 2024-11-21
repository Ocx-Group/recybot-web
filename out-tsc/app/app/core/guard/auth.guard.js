import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(route, state) {
        if (this.authService.currentUserAffiliateValue) {
            return true;
        }
        this.router.navigate(['/signin']);
        return false;
    }
};
AuthGuard = __decorate([
    Injectable({
        providedIn: 'root',
    })
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map