import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
const header = [
    'Usuario Responsable',
    'Afiliado',
    'Crédito',
    'Débito',
    'Estado',
    'Concepto',
    'Fecha',
];
let BalanceOfWalletComponent = class BalanceOfWalletComponent {
    constructor(walletService, printService, clipboardService, toastr) {
        this.walletService = walletService;
        this.printService = printService;
        this.clipboardService = clipboardService;
        this.toastr = toastr;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadWalletBalance();
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.table.recalculate();
        this.table.recalculateColumns();
    }
    loadWalletBalance() {
        this.walletService.getAllWallets().subscribe((resp) => {
            if (resp != null) {
                this.temp = [...resp];
                this.rows = resp;
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
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
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
                items.affiliateId,
                items.userId,
                items.credit,
                items.debit,
                items.status == true ? 'Atendido' : 'No atendido',
                items.concept,
                items.date,
            ];
            return data;
        });
        this.printService.print(header, body, 'Balance de Billetera', false);
    }
};
__decorate([
    ViewChild('table')
], BalanceOfWalletComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], BalanceOfWalletComponent.prototype, "onResize", null);
BalanceOfWalletComponent = __decorate([
    Component({
        selector: 'app-balance-of-wallet',
        templateUrl: './balance-of-wallet.component.html',
    })
], BalanceOfWalletComponent);
export { BalanceOfWalletComponent };
//# sourceMappingURL=balance-of-wallet.component.js.map