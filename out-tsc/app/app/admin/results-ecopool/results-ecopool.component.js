import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
let ResultsEcopoolComponent = class ResultsEcopoolComponent {
    constructor(resultsEcoPoolService) {
        this.resultsEcoPoolService = resultsEcoPoolService;
        this.temp = [];
        this.rows = [];
        this.expanded = {};
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadResults();
    }
    ngAfterViewInit() {
        this.onResize(event);
        window.addEventListener('resize', this.onResize.bind(this));
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.table.recalculate();
        this.table.recalculateColumns();
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.affiliateName.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }
    getRowHeight(row) {
        return row.height;
    }
    toggleExpandRow(row) {
        console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);
    }
    onDetailToggle(event) {
        console.log('Detail Toggled', event);
    }
    loadResults() {
        this.resultsEcoPoolService.getAllResultsEcoPool().subscribe({
            next: (value) => {
                this.temp = [...value];
                this.rows = value;
                this.loadingIndicator = false;
            },
            error: (err) => {
            },
        });
    }
};
__decorate([
    ViewChild('table')
], ResultsEcopoolComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], ResultsEcopoolComponent.prototype, "onResize", null);
ResultsEcopoolComponent = __decorate([
    Component({
        selector: 'app-results-ecopool',
        templateUrl: './results-ecopool.component.html'
    })
], ResultsEcopoolComponent);
export { ResultsEcopoolComponent };
//# sourceMappingURL=results-ecopool.component.js.map