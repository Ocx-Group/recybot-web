import { __decorate } from "tslib";
import { Component } from '@angular/core';
const ALERTS = [
    {
        type: 'info',
        message: 'Nota: Los datos reflejados en este modulo son las comisiones calculada del periodo actual, estos son las comisiones que estan por ser acreditadas.',
    },
    {
        type: 'light',
        message: 'TOTAL GENERAL: USD 0.00',
    },
];
let CommissionsComponent = class CommissionsComponent {
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
    ngOnInit() { }
};
CommissionsComponent = __decorate([
    Component({
        selector: 'app-commissions',
        templateUrl: './commissions.component.html',
    })
], CommissionsComponent);
export { CommissionsComponent };
//# sourceMappingURL=commissions.component.js.map