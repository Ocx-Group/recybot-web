import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
let TransactionsCommissionComponent = class TransactionsCommissionComponent {
    constructor() {
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.table.recalculate();
        this.table.recalculateColumns();
    }
    getRowHeight(row) {
        return row.height;
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    clipBoardCopy() { }
    onPrint() { }
};
__decorate([
    ViewChild('table')
], TransactionsCommissionComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], TransactionsCommissionComponent.prototype, "onResize", null);
TransactionsCommissionComponent = __decorate([
    Component({
        selector: 'app-transactions-commission',
        templateUrl: './transactions-commission.component.html'
    })
], TransactionsCommissionComponent);
export { TransactionsCommissionComponent };
//# sourceMappingURL=transactions-commission.component.js.map