import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ConfirmPaymentTransaction } from '@app/core/models/payment-transaction-model/confirm-payment-transaction';
import Swal from 'sweetalert2';
let WireTransferListComponent = class WireTransferListComponent {
    constructor(paymentTransactionService, toast) {
        this.paymentTransactionService = paymentTransactionService;
        this.toast = toast;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadAllWireTransactions();
    }
    showSuccess(message) {
        this.toast.success(message);
    }
    showError(message) {
        this.toast.error(message);
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.userName.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    loadAllWireTransactions() {
        this.paymentTransactionService.getAllWireTransactions().subscribe((data) => {
            this.rows = data;
            this.temp = [...data];
            this.loadingIndicator = false;
        });
    }
    confirmPaymentTransaction(row) {
        Swal.fire({
            title: 'Confirmar pago',
            text: '¿Estás seguro de realizar el pago?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                let payment = new ConfirmPaymentTransaction();
                payment.id = row.id;
                payment.userName = row.userName;
                this.paymentTransactionService.confirmPayment(payment).subscribe({
                    next: (value) => {
                        this.showSuccess('Pago confirmado');
                        this.loadAllWireTransactions();
                    },
                    error: (err) => {
                        this.showError(err);
                    },
                });
            }
        });
    }
};
__decorate([
    ViewChild('table')
], WireTransferListComponent.prototype, "table", void 0);
WireTransferListComponent = __decorate([
    Component({
        selector: 'app-wire-transfer-list',
        templateUrl: './wire-transfer-list.component.html'
    })
], WireTransferListComponent);
export { WireTransferListComponent };
//# sourceMappingURL=wire-transfer-list.component.js.map