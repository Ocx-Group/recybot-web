import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
let RequestWalletComponent = class RequestWalletComponent {
    constructor(modalService) {
        this.modalService = modalService;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.newUserImg = 'assets/images/users/user-2.png';
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
        req.open('GET', `assets/data/datatable-wallet-data.json`);
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
    addRow(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
        this.register.patchValue({
            id: this.getId(10, 100),
            img: this.newUserImg,
        });
    }
    getId(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};
__decorate([
    ViewChild('table')
], RequestWalletComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], RequestWalletComponent.prototype, "onResize", null);
RequestWalletComponent = __decorate([
    Component({
        selector: 'app-request-wallet',
        templateUrl: './request-wallet.component.html'
    })
], RequestWalletComponent);
export { RequestWalletComponent };
//# sourceMappingURL=request-wallet.component.js.map