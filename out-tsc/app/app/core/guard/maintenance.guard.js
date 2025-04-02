import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
let MaintenanceGuard = class MaintenanceGuard {
    constructor(router, configurationService) {
        this.router = router;
        this.configurationService = configurationService;
        this.isUnderMaintenance = false;
        this.configurationService.checkMaintenance().subscribe((maintenance) => {
            this.isUnderMaintenance = maintenance;
        });
    }
    canActivate() {
        return this.configurationService.checkMaintenance().pipe(map((isUnderMaintenance) => {
            if (isUnderMaintenance) {
                this.router.navigate(['/maintenance']);
                return false;
            }
            return true;
        }));
    }
};
MaintenanceGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MaintenanceGuard);
export { MaintenanceGuard };
//# sourceMappingURL=maintenance.guard.js.map