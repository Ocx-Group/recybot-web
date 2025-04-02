import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
const ALERTS = [
    {
        type: 'info',
        message: '',
    },
];
let PeriodClosingComponent = class PeriodClosingComponent {
    constructor(toastr, clipboardService) {
        this.toastr = toastr;
        this.clipboardService = clipboardService;
        this.show = true;
        this.linkMsj = 'hide';
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.alerts = Array.from(ALERTS);
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
        req.open('GET', `assets/data/list-affiliates.json`);
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
    clipBoardCopy() {
        var string = JSON.stringify(this.temp);
        var result = this.clipboardService.copyFromContent(string);
        if (this.temp.length === 0) {
            this.toastr.info('no data to copy');
        }
        else {
            this.toastr.success('copied ' + this.temp.length + ' rows successfully');
        }
    }
};
__decorate([
    ViewChild('table')
], PeriodClosingComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], PeriodClosingComponent.prototype, "onResize", null);
PeriodClosingComponent = __decorate([
    Component({
        selector: 'app-period-closing',
        templateUrl: './period-closing.component.html',
        providers: [ToastrService]
    })
], PeriodClosingComponent);
export { PeriodClosingComponent };
//# sourceMappingURL=period-closing.component.js.map