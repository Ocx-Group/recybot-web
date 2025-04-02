import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { combineLatest, map } from "rxjs";
let ModelsVisibilityService = class ModelsVisibilityService {
    constructor(configService, authService) {
        this.configService = configService;
        this.authService = authService;
    }
    canUserSeePaymentModels() {
        return combineLatest([
            this.configService.getGeneralConfiguration(),
            this.authService.currentUserAffiliate
        ]).pipe(map(([config, userAffiliate]) => {
            console.log(userAffiliate);
            if (config.success && config.data && userAffiliate) {
                const cutoffDate = new Date(config.data.paymentModelCutoffDate);
                return new Date(userAffiliate.created_at) < cutoffDate;
            }
            return true;
        }));
    }
};
ModelsVisibilityService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ModelsVisibilityService);
export { ModelsVisibilityService };
//# sourceMappingURL=models-visibility.service.js.map