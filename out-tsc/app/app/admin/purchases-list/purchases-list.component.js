import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
const header = [
    'Afiliado',
    'Nombre y Apellido',
    'No. Factura',
    'Fecha',
    'Estado Factura',
    'Pagado'
];
let PurchasesListComponent = class PurchasesListComponent {
    constructor(toastr, clipboardService, printService) {
        this.toastr = toastr;
        this.clipboardService = clipboardService;
        this.printService = printService;
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
        req.open('GET', `assets/data/admin/purchases-list-data.json`);
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
                items.nameAndLastName,
                items.noBill,
                items.date,
                items.billState,
                items.paid
            ];
            return data;
        });
        this.printService.print(header, body, 'Lista de Compras', false);
    }
};
__decorate([
    ViewChild('table')
], PurchasesListComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], PurchasesListComponent.prototype, "onResize", null);
PurchasesListComponent = __decorate([
    Component({
        selector: 'app-purchases-list',
        templateUrl: './purchases-list.component.html',
        providers: [ToastrService],
    })
], PurchasesListComponent);
export { PurchasesListComponent };
//# sourceMappingURL=purchases-list.component.js.map