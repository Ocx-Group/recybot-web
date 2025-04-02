import { __decorate } from "tslib";
import { Component } from '@angular/core';
const ALERTS = [
    {
        type: 'info',
        message: ''
    }
];
let CalculatedCommissionsComponent = class CalculatedCommissionsComponent {
    constructor() {
        this.show = false;
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
CalculatedCommissionsComponent = __decorate([
    Component({
        selector: 'app-calculated-commissions',
        templateUrl: './calculated-commissions.component.html'
    })
], CalculatedCommissionsComponent);
export { CalculatedCommissionsComponent };
//# sourceMappingURL=calculated-commissions.component.js.map