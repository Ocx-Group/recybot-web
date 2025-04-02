import { __decorate } from "tslib";
import { Component, EventEmitter, Output, ViewChild, } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
let AuthorizeAffiliatesEditModalComponent = class AuthorizeAffiliatesEditModalComponent {
    constructor(modalService, formBuilder, toastr, affiliateService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.affiliateService = affiliateService;
        this.user = new UserAffiliate();
        this.loadAffiliateList = new EventEmitter();
    }
    editOpenModal(content, affiliate) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
        this.user = affiliate;
    }
    ngOnInit() {
    }
    sendEmail() {
        this.affiliateService
            .sendEmailConfirm(this.user.id)
            .subscribe((response) => {
            if (response.success) {
                this.showSuccess('The email was sent correctly.');
            }
            else {
                this.showError('Error!');
            }
        });
    }
    authorization() {
        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonColor: '#8963ff',
            cancelButtonColor: '#fb7823',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.value) {
                let approvedArray = [];
                approvedArray.push(this.user.id);
                this.selectionProcess(approvedArray, []);
            }
        });
    }
    delete() {
        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonColor: '#8963ff',
            cancelButtonColor: '#fb7823',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.value) {
                let disApprovedArray = [];
                disApprovedArray.push(this.user.id);
                this.selectionProcess([], disApprovedArray);
            }
        });
    }
    selectionProcess(approvedArray, disApprovedArray) {
        this.affiliateService
            .authorizationAffiliates(approvedArray, disApprovedArray)
            .subscribe((response) => {
            if (response.success) {
                this.showSuccess('The affiliation have been processed successfully.');
                this.loadAffiliateList.emit();
                this.closeModals();
            }
            else {
                this.showError('Error!');
            }
        });
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    closeModals() {
        this.modalService.dismissAll();
    }
};
__decorate([
    ViewChild('authorizeAffiliateEditModal')
], AuthorizeAffiliatesEditModalComponent.prototype, "authorizeAffiliateEditModal", void 0);
__decorate([
    Output('loadAffiliateList')
], AuthorizeAffiliatesEditModalComponent.prototype, "loadAffiliateList", void 0);
AuthorizeAffiliatesEditModalComponent = __decorate([
    Component({
        selector: 'app-authorize-affiliates-edit-modal',
        templateUrl: './authorize-affiliates-edit-modal.component.html',
        providers: [ToastrService],
    })
], AuthorizeAffiliatesEditModalComponent);
export { AuthorizeAffiliatesEditModalComponent };
//# sourceMappingURL=authorize-affiliates-edit-modal.component.js.map