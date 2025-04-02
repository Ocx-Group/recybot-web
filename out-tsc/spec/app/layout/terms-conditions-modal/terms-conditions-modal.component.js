import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { Subject, takeUntil } from 'rxjs';
let TermsConditionsModalComponent = class TermsConditionsModalComponent {
    constructor(termsConditionsService, modalService, renderer, affiliateService, authService, toast) {
        this.termsConditionsService = termsConditionsService;
        this.modalService = modalService;
        this.renderer = renderer;
        this.affiliateService = affiliateService;
        this.authService = authService;
        this.toast = toast;
        this.showButton = false;
        this.destroy$ = new Subject();
        this.user = new UserAffiliate();
    }
    ngOnInit() {
        this.user = this.authService.currentUserAffiliateValue;
        this.termsConditionsService.showModal$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.modalService.open(this.termsModal, { backdrop: 'static', keyboard: false, centered: true });
        });
    }
    ngOnDestroy() {
        this.close();
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngAfterViewInit() {
        const modalBodyScroll = document.querySelector('.modal-body');
        if (modalBodyScroll) {
            this.renderer.listen(modalBodyScroll, 'scroll', (event) => {
            });
        }
    }
    showSuccess(message) {
        this.toast.success(message);
    }
    showError(message) {
        this.toast.error(message);
    }
    onScroll(event) {
        const scrollTop = event.target.scrollTop;
        const scrollHeight = event.target.scrollHeight;
        const offsetHeight = event.target.offsetHeight;
        if (scrollTop + offsetHeight >= scrollHeight - 5) {
            this.showAcceptButton();
        }
    }
    showAcceptButton() {
        this.showButton = true;
    }
    close() {
        this.modalService.dismissAll();
    }
    acceptTerms() {
        this.user.termsConditions = true;
        this.affiliateService.updateAffiliate(this.user).subscribe({
            next: (value) => {
                this.showSuccess('Términos y condiciones actualizados correctamente');
                this.authService.setUserAffiliateValue(this.user);
                this.close();
            },
            error: (err) => {
                this.showError('Error');
            },
        });
    }
};
__decorate([
    ViewChild('termsModal', { static: true })
], TermsConditionsModalComponent.prototype, "termsModal", void 0);
__decorate([
    ViewChild('acceptButton', { static: false })
], TermsConditionsModalComponent.prototype, "acceptButton", void 0);
TermsConditionsModalComponent = __decorate([
    Component({
        selector: 'app-terms-conditions-modal',
        templateUrl: './terms-conditions-modal.component.html',
        styleUrls: ['./terms-conditions-modal.component.scss']
    })
], TermsConditionsModalComponent);
export { TermsConditionsModalComponent };
//# sourceMappingURL=terms-conditions-modal.component.js.map