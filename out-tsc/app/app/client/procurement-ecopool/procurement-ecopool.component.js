import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
let ProcurementEcopoolComponent = class ProcurementEcopoolComponent {
    constructor() {
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.fetch((data) => {
            this.temp = [...data];
            this.rows = data;
            setTimeout(() => {
                this.loadingIndicator = false;
            }, 500);
        });
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.table.recalculate();
        this.table.recalculateColumns();
    }
    getRowHeight(row) {
        return row.height;
    }
    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/datatable-ecopool-data.json`);
        req.onload = () => {
            cb(JSON.parse(req.response));
        };
        req.send();
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }
};
__decorate([
    ViewChild('table')
], ProcurementEcopoolComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], ProcurementEcopoolComponent.prototype, "onResize", null);
ProcurementEcopoolComponent = __decorate([
    Component({
        selector: 'app-procurement-ecopool',
        templateUrl: './procurement-ecopool.component.html'
    })
], ProcurementEcopoolComponent);
export { ProcurementEcopoolComponent };
//# sourceMappingURL=procurement-ecopool.component.js.map