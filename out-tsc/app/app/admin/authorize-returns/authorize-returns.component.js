import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
let AuthorizeReturnsComponent = class AuthorizeReturnsComponent {
    constructor(walletRequestService, toastr, walletService) {
        this.walletRequestService = walletRequestService;
        this.toastr = toastr;
        this.walletService = walletService;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadRequestRevertTransaction();
    }
    showSuccess(message) {
        this.toastr.success(message);
    }
    showError(message) {
        this.toastr.error(message);
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
            return d.adminUserName.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    loadRequestRevertTransaction() {
        this.walletRequestService.getAllWalletRequestRevertTransaction().subscribe({
            next: (value) => {
                this.rows = [...value];
                this.temp = value;
                this.loadingIndicator = false;
            },
            error: (err) => {
                this.showError('Error');
            },
        });
    }
    approveRevertTransaction(row) {
        this.walletService.rejectOrCancelRevertDebitTransaction(1, row.invoiceNumber).subscribe({
            next: (value) => {
                this.showSuccess('La solicitud fue aprobada correctamente.');
                this.loadRequestRevertTransaction();
            },
            error: (err) => {
                this.showError('Error');
            },
        });
    }
    denyRevertTransaction(row) {
        this.walletService.rejectOrCancelRevertDebitTransaction(0, row.invoiceNumber).subscribe({
            next: (value) => {
                this.showSuccess('La solicitud fue rechazada correctamente.');
                this.loadRequestRevertTransaction();
            },
            error: (err) => {
                this.showError('Error');
            },
        });
    }
    confirmTransaction(option, row) {
        return Swal.fire({
            title: '¿Está seguro que desea realizar la solicitud?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                if (option === 1) {
                    this.approveRevertTransaction(row);
                }
                else if (option === 0) {
                    this.denyRevertTransaction(row);
                }
            }
        });
    }
};
__decorate([
    ViewChild('table')
], AuthorizeReturnsComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], AuthorizeReturnsComponent.prototype, "onResize", null);
AuthorizeReturnsComponent = __decorate([
    Component({
        selector: 'app-authorize-returns',
        templateUrl: './authorize-returns.component.html'
    })
], AuthorizeReturnsComponent);
export { AuthorizeReturnsComponent };
//# sourceMappingURL=authorize-returns.component.js.map