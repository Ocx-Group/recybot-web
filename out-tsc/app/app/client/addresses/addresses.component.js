import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
let AddressesComponent = class AddressesComponent {
    constructor(affiliateAddressService, auth) {
        this.affiliateAddressService = affiliateAddressService;
        this.auth = auth;
        this.user = new UserAffiliate();
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.user = this.auth.currentUserAffiliateValue;
        this.loadAddressesByAffiliate();
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
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    loadAddressesByAffiliate() {
        this.affiliateAddressService.getAffiliateAddressByAffiliateId(this.user.id).subscribe({
            next: (value) => {
                if (value.data) {
                    this.rows = [...value.data];
                    this.temp = value.data;
                    this.loadingIndicator = false;
                }
            },
            error: (err) => {
            },
        });
    }
};
__decorate([
    ViewChild('table')
], AddressesComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], AddressesComponent.prototype, "onResize", null);
AddressesComponent = __decorate([
    Component({
        selector: 'app-addresses',
        templateUrl: './addresses.component.html',
    })
], AddressesComponent);
export { AddressesComponent };
//# sourceMappingURL=addresses.component.js.map