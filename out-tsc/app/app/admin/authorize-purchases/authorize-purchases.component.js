import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
const ALERTS = [
    {
        type: 'info',
        message: '',
    },
];
const header = [
    'Afiliado',
    'Orden',
    'Fecha',
    'Método de Pago',
    'Banco',
    'Soporte',
    'Fecha Transacción',
];
let AuthorizePurchasesComponent = class AuthorizePurchasesComponent {
    constructor(toastr, clipboardService, printService) {
        this.toastr = toastr;
        this.clipboardService = clipboardService;
        this.printService = printService;
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
        req.open('GET', `assets/data/admin/authorize-purchases-data.json`);
        req.onload = () => {
            cb(JSON.parse(req.response));
        };
        req.send();
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
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
    onPrint() {
        const body = this.temp.map((items) => {
            const data = [
                items.affiliate,
                items.order,
                items.date,
                items.paidMethod,
                items.bank,
                items.support,
                items.transactionDate,
            ];
            return data;
        });
        this.printService.print(header, body, 'Lista de Ordenes por Autorizar', false);
    }
};
__decorate([
    ViewChild('table')
], AuthorizePurchasesComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], AuthorizePurchasesComponent.prototype, "onResize", null);
AuthorizePurchasesComponent = __decorate([
    Component({
        selector: 'app-authorize-purchases',
        templateUrl: './authorize-purchases.component.html',
        providers: [ToastrService],
    })
], AuthorizePurchasesComponent);
export { AuthorizePurchasesComponent };
//# sourceMappingURL=authorize-purchases.component.js.map