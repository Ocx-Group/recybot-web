import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let SessionService = class SessionService {
    constructor(ngZone, router) {
        this.ngZone = ngZone;
        this.router = router;
        this.idleTimeout = 30 * 60 * 1000;
        this.userActivity = new Subject();
        this.listenToUserActivity();
        this.startTimer();
    }
    listenToUserActivity() {
        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('mousemove', () => this.ngZone.run(() => this.userHasBeenActive()));
            window.addEventListener('keypress', () => this.ngZone.run(() => this.userHasBeenActive()));
            window.addEventListener('scroll', () => this.ngZone.run(() => this.userHasBeenActive()));
        });
    }
    userHasBeenActive() {
        this.userActivity.next();
    }
    startTimer() {
        this.userActivity.subscribe(() => {
            clearTimeout(this.idleTimer);
            this.idleTimer = setTimeout(() => {
                this.router.navigate(['/signin']).then();
            }, this.idleTimeout);
        });
    }
};
SessionService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SessionService);
export { SessionService };
//# sourceMappingURL=session.service.js.map