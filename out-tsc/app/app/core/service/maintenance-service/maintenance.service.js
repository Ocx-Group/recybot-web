import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.systemConfigurationService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let MaintenanceService = class MaintenanceService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.systemConfigurationService;
    }
};
MaintenanceService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MaintenanceService);
export { MaintenanceService };
//# sourceMappingURL=maintenance.service.js.map