import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ConfigService = class ConfigService {
    constructor() {
        this.setConfigData();
    }
    setConfigData() {
        this.configData = {
            layout: {
                variant: 'light',
                theme_color: 'green',
                sidebar: {
                    collapsed: false,
                    backgroundColor: 'light', // options:  light & dark
                },
            },
        };
    }
};
ConfigService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ConfigService);
export { ConfigService };
//# sourceMappingURL=config.service.js.map