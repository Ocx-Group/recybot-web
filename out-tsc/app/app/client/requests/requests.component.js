import { __decorate } from "tslib";
import { BalanceInformation } from '@app/core/models/wallet-model/balance-information.model';
import { Component, ViewChild, HostListener } from '@angular/core';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { WalletWithdrawalsConfiguration } from '@app/core/models/wallet-withdrawals-configuration-model/wallet-withdrawals-configuration.model';
let RequestsComponent = class RequestsComponent {
    constructor(walletRequestService, authService, toastr, configurationService, walletService) {
        this.walletRequestService = walletRequestService;
        this.authService = authService;
        this.toastr = toastr;
        this.configurationService = configurationService;
        this.walletService = walletService;
        this.user = new UserAffiliate();
        this.balanceInfo = new BalanceInformation();
        this.walletWithdrawalsConfig = new WalletWithdrawalsConfiguration();
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.getUserInfo();
        this.loadWalletRequest();
        this.loadWalletWithdrawalConfiguration();
        this.setAvailableBalance();
    }
    loadWalletRequest() {
        this.walletRequestService
            .getWalletRequestByAffiliateId(this.user.id)
            .subscribe({
            next: (resp) => {
                if (resp != null) {
                    this.temp = [...resp];
                    this.rows = resp;
                }
                this.loadingIndicator = false;
            },
            error: (err) => {
                this.showError('Error');
            },
        });
    }
    setAvailableBalance() {
        this.walletService.getBalanceInformationByAffiliateId(this.user.id).subscribe(balanceInfo => {
            this.balanceInfo = balanceInfo;
        });
    }
    loadWalletWithdrawalConfiguration() {
        this.configurationService.getWithdrawalsWalletConfiguration().subscribe({
            next: (resp) => {
                this.walletWithdrawalsConfig.minimum_amount = resp.minimum_amount;
                this.walletWithdrawalsConfig.maximum_amount = resp.maximum_amount;
            },
            error: (err) => {
                this.showError('Error');
            },
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
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.observation.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    getUserInfo() {
        this.authService.currentUserAffiliate.subscribe({
            next: (value) => {
                this.user = value;
            }
        });
    }
    showError(message) {
        this.toastr.error(message);
    }
};
__decorate([
    ViewChild('table')
], RequestsComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], RequestsComponent.prototype, "onResize", null);
RequestsComponent = __decorate([
    Component({
        selector: 'app-requests',
        templateUrl: './requests.component.html',
    })
], RequestsComponent);
export { RequestsComponent };
//# sourceMappingURL=requests.component.js.map