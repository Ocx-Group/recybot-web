import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
let WalkwaysBenchesComponent = class WalkwaysBenchesComponent {
    constructor() {
        this.rows = [];
        this.loadingIndicator = true;
        this.active = 1;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.table.recalculate();
        this.table.recalculateColumns();
    }
};
__decorate([
    ViewChild('table')
], WalkwaysBenchesComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], WalkwaysBenchesComponent.prototype, "onResize", null);
WalkwaysBenchesComponent = __decorate([
    Component({
        selector: 'app-news-admin',
        templateUrl: './walkways-benches.component.html'
    })
], WalkwaysBenchesComponent);
export { WalkwaysBenchesComponent };
//# sourceMappingURL=walkways-benches.component.js.map