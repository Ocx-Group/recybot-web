import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
const header = [
    'Orden',
    'Afiliado',
    'Crédito',
    'Método de pago',
    'Banco',
    'Soporte',
    'Fecha Transacción',
    'Fecha Solicitud',
];
let WalletRefillComponent = class WalletRefillComponent {
    constructor(walletWaitService, clipboardService, printService, toastr) {
        this.walletWaitService = walletWaitService;
        this.clipboardService = clipboardService;
        this.printService = printService;
        this.toastr = toastr;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadWalletWait();
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.table.recalculate();
        this.table.recalculateColumns();
    }
    loadWalletWait() {
        this.walletWaitService.getAllWalletsWait().subscribe({
            next: (resp) => {
                this.temp = [...resp];
                this.rows = resp;
                this.loadingIndicator = false;
            },
            error: (err) => {
                this.showError('Error!');
            },
        });
    }
    getRowHeight(row) {
        return row.height;
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    clipBoardCopy() { }
    onPrint() {
        const body = this.temp.map((items) => {
            const data = [
                items.order,
                items.affiliateId,
                items.credit,
                items.paymentMethod,
                items.bank,
                items.support,
                items.depositDate,
                items.date,
            ];
            return data;
        });
        this.printService.print(header, body, 'Recarga de billetera', false);
    }
    processOption() {
        Swal.fire({
            title: 'Excuse me!',
            text: 'Are you sure about this operation? If so, click on the YES I AM SURE button.',
            showCancelButton: true,
            confirmButtonColor: '#8963ff',
            cancelButtonColor: '#fb7823',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const text = result.value;
            }
        });
    }
};
__decorate([
    ViewChild('table')
], WalletRefillComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], WalletRefillComponent.prototype, "onResize", null);
WalletRefillComponent = __decorate([
    Component({
        selector: 'app-wallet-refill',
        templateUrl: './wallet-refill.component.html',
    })
], WalletRefillComponent);
export { WalletRefillComponent };
//# sourceMappingURL=wallet-refill.component.js.map