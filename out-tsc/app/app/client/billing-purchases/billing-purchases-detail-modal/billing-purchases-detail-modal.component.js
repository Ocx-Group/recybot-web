import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Invoice } from '@app/core/models/invoice-model/invoice.model';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { Subject, takeUntil } from 'rxjs';
let BillingPurchasesDetailModalComponent = class BillingPurchasesDetailModalComponent {
    constructor(modalService, auth, affiliateService, toastr) {
        this.modalService = modalService;
        this.auth = auth;
        this.affiliateService = affiliateService;
        this.toastr = toastr;
        this.invoice = new Invoice();
        this.user = new UserAffiliate();
        this.countries = [];
        this.destroy$ = new Subject();
        this.Math = Math;
    }
    ngOnInit() {
        this.getAllCountries();
        this.getCurrentUser();
    }
    getAllCountries() {
        this.affiliateService.getCountries().subscribe({
            next: (resp) => {
                this.countries = resp;
            },
            error: (err) => {
                this.toastr.error('error');
            },
        });
    }
    getCountryName(id) {
        let countryName = '';
        this.countries.find((item) => {
            if (item.id === id) {
                countryName = item.name;
                return true;
            }
        });
        return countryName;
    }
    getCurrentUser() {
        this.suscription = this.auth.currentUserAffiliate
            .pipe(takeUntil(this.destroy$))
            .subscribe((user) => {
            this.user = user;
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
        this.suscription.unsubscribe();
    }
    billingPurchasesOpenModal(content, invoice) {
        this.totalDiscount = invoice.invoiceDetail[0].productDiscount;
        this.totalTax = invoice.invoiceDetail[0].productIva;
        const subTotal = invoice.invoiceDetail.reduce((accumulator, item) => {
            return accumulator + (item.productPrice * item.productQuantity);
        }, 0);
        this.subTotal = subTotal;
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
            centered: true,
        });
        this.invoice = invoice;
    }
};
__decorate([
    ViewChild('billingPurchasesDetailModal')
], BillingPurchasesDetailModalComponent.prototype, "billingPurchasesDetailModal", void 0);
BillingPurchasesDetailModalComponent = __decorate([
    Component({
        selector: 'app-billing-purchases-detail-modal',
        templateUrl: './billing-purchases-detail-modal.component.html',
    })
], BillingPurchasesDetailModalComponent);
export { BillingPurchasesDetailModalComponent };
//# sourceMappingURL=billing-purchases-detail-modal.component.js.map