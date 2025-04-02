import { __decorate } from "tslib";
import { Component } from '@angular/core';
const ALERTS = [
    {
        type: 'info',
        message: '',
    },
];
let CalculateCommissionsComponent = class CalculateCommissionsComponent {
    constructor() {
        this.show = true;
        this.linkMsj = 'hide';
        this.alerts = Array.from(ALERTS);
    }
    close(alert) {
        this.alerts.splice(this.alerts.indexOf(alert), 1);
    }
    showMsj() {
        if (this.show) {
            this.show = false;
            this.linkMsj = 'show';
        }
        else {
            this.show = true;
            this.linkMsj = 'hide';
        }
    }
};
CalculateCommissionsComponent = __decorate([
    Component({
        selector: 'app-calculate-commissions',
        templateUrl: './calculate-commissions.component.html',
    })
], CalculateCommissionsComponent);
export { CalculateCommissionsComponent };
//# sourceMappingURL=calculate-commissions.component.js.map