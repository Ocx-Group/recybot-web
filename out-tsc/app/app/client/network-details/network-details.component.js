import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { StatisticsInformation } from "@app/core/models/wallet-model/statisticsInformation";
let NetworkDetailsComponent = class NetworkDetailsComponent {
    constructor(walletService, authService, toastr, renderer, document) {
        this.walletService = walletService;
        this.authService = authService;
        this.toastr = toastr;
        this.renderer = renderer;
        this.document = document;
        this.user = new UserAffiliate();
        this.information = new StatisticsInformation();
    }
    ngOnInit() {
        this.user = this.authService.currentUserAffiliateValue;
        this.loadInformation();
        this.contractSidebar();
    }
    ngOnDestroy() {
        this.expandSidebar();
    }
    loadInformation() {
        this.walletService.getStatisticsInformationByAffiliateId(this.user.id).subscribe({
            next: (value) => {
                this.information = value;
            },
            error: (err) => {
                this.showError('Error');
            },
        });
    }
    showError(message) {
        this.toastr.error(message);
    }
    contractSidebar() {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
    }
    expandSidebar() {
        this.renderer.removeClass(this.document.body, 'side-closed');
        this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
};
NetworkDetailsComponent = __decorate([
    Component({
        selector: 'app-network-details',
        templateUrl: './network-details.component.html',
        styleUrls: ['./network-details.component.scss']
    }),
    __param(4, Inject(DOCUMENT))
], NetworkDetailsComponent);
export { NetworkDetailsComponent };
//# sourceMappingURL=network-details.component.js.map