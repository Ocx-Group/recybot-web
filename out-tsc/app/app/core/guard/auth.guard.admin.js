import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthGuardAdmin = class AuthGuardAdmin {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(route, state) {
        if (this.authService.currentUserAdminValue) {
            return true;
        }
        this.router.navigate(['/signin']);
        return false;
    }
};
AuthGuardAdmin = __decorate([
    Injectable({
        providedIn: 'root',
    })
], AuthGuardAdmin);
export { AuthGuardAdmin };
//# sourceMappingURL=auth.guard.admin.js.map