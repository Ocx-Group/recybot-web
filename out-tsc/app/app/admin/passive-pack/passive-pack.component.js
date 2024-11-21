import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
let PassivePackComponent = class PassivePackComponent {
    constructor(modalService, invoiceService) {
        this.modalService = modalService;
        this.invoiceService = invoiceService;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadInvoiceList();
    }
    onResize(event) {
        if (this.table) {
            this.scrollBarHorizontal = window.innerWidth < 1200;
            this.table.recalculate();
            this.table.recalculateColumns();
        }
    }
    loadInvoiceList() {
        this.invoiceService.getAllInvoices().subscribe((resp) => {
            if (resp != null) {
                const data = resp.map(invoice => {
                    return invoice.invoiceDetail.map(detail => {
                        return Object.assign(Object.assign({}, detail), { invoiceId: invoice.id, affiliate: invoice.affiliateId, number: invoice.invoiceNumber, status: invoice.status });
                    });
                }).flat();
                this.temp = [...data];
                this.rows = data;
                this.loadingIndicator = false;
            }
        });
    }
    getRowHeight(row) {
        return row.height;
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.invoiceId.toString().toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    passivePackDetailModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
    }
    runPassivePackModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
    }
};
__decorate([
    ViewChild('table')
], PassivePackComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], PassivePackComponent.prototype, "onResize", null);
PassivePackComponent = __decorate([
    Component({
        selector: 'app-passive-pack',
        templateUrl: './passive-pack.component.html',
    })
], PassivePackComponent);
export { PassivePackComponent };
//# sourceMappingURL=passive-pack.component.js.map