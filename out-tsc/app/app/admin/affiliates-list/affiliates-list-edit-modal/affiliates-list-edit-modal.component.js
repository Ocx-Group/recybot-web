import { __decorate } from "tslib";
import { Component, EventEmitter, Output, ViewChild, } from '@angular/core';
import { Validators, FormControl, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
let AffiliatesListEditModalComponent = class AffiliatesListEditModalComponent {
    constructor(modalService, formBuilder, toastr, affiliateService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.affiliateService = affiliateService;
        this.submitted = false;
        this.listCountry = [];
        this.affiliate = new UserAffiliate();
        this.loadAffiliateList = new EventEmitter();
    }
    editOpenModal(content, affiliate) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
        this.affiliate = affiliate;
        this.fetchCountry();
        this.getUserInfo(this.affiliate.id);
    }
    setValues(affiliate) {
        var _a, _b, _c, _d, _e, _f;
        this.affiliate = affiliate;
        let birthdayFormatted = '';
        const birthdayDate = new Date(affiliate.birthday);
        birthdayFormatted = birthdayDate.toISOString().split('T')[0];
        this.editAffiliateForm.setValue({
            identification: affiliate.identification,
            user_name: affiliate.user_name,
            name: affiliate.name,
            last_name: affiliate.last_name,
            email: affiliate.email,
            father: affiliate.father_user ? (_a = affiliate.father_user.user_name) !== null && _a !== void 0 ? _a : '' : '',
            phone: affiliate.phone,
            address: (_b = affiliate.address) !== null && _b !== void 0 ? _b : '',
            status: affiliate.status !== 1,
            tax_id: (_c = affiliate.tax_id) !== null && _c !== void 0 ? _c : '',
            country: affiliate.country,
            zip_code: affiliate.zip_code,
            created_at: affiliate.created_at,
            birthday: birthdayFormatted,
            beneficiary_name: (_d = affiliate.beneficiary_name) !== null && _d !== void 0 ? _d : '',
            legal_authorized_first: (_e = affiliate.legal_authorized_first) !== null && _e !== void 0 ? _e : '',
            legal_authorized_second: (_f = affiliate.legal_authorized_second) !== null && _f !== void 0 ? _f : '',
        });
    }
    ngOnInit() {
        this.loadValidations();
    }
    getUserInfo(id) {
        this.affiliateService.getAffiliateById(id).subscribe((response) => {
            if (response.success) {
                this.setValues(response.data);
            }
        });
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    fetchCountry() {
        this.affiliateService.getCountries().subscribe((data) => {
            this.listCountry = data;
        });
    }
    loadValidations() {
        this.editAffiliateForm = this.formBuilder.group({
            identification: [],
            user_name: new FormControl({ value: '', disabled: true }),
            name: new FormControl({ value: '', disabled: true }),
            last_name: new FormControl({ value: '', disabled: true }),
            email: ['', Validators.required],
            father: new FormControl({ value: '', disabled: true }),
            phone: ['', Validators.required],
            address: [],
            country: [],
            tax_id: [],
            zip_code: [],
            created_at: new FormControl({ value: '', disabled: true }),
            birthday: [],
            status: [],
            beneficiary_name: [],
            legal_authorized_first: [],
            legal_authorized_second: [],
        });
    }
    onEditRowSave() {
        this.submitted = true;
        if (this.editAffiliateForm.invalid) {
            return;
        }
        this.affiliate.identification = this.editAffiliateForm.value.identification;
        this.affiliate.phone = this.editAffiliateForm.value.phone;
        this.affiliate.address = this.editAffiliateForm.value.address;
        this.affiliate.zip_code = this.editAffiliateForm.value.zip_code;
        this.affiliate.email = this.editAffiliateForm.value.email;
        this.affiliate.country = this.editAffiliateForm.value.country;
        this.affiliate.birthday = this.editAffiliateForm.value.birthday;
        this.affiliate.tax_id = this.editAffiliateForm.value.tax_id;
        this.affiliate.beneficiary_name = this.editAffiliateForm.value.beneficiary_name;
        this.affiliate.status = this.editAffiliateForm.value.status === true ? 0 : 1;
        this.affiliate.legal_authorized_first = this.editAffiliateForm.value.legal_authorize_first;
        this.affiliate.legal_authorized_second = this.editAffiliateForm.value.legal_authorize_second;
        this.affiliateService.updateAffiliate(this.affiliate).subscribe((response) => {
            if (response !== null) {
                this.showSuccess('The credentials is valid!');
                this.setValues(response);
            }
            else {
                this.showError('Error!');
                console.log('error', response);
            }
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
};
__decorate([
    ViewChild('affiliateEditModal')
], AffiliatesListEditModalComponent.prototype, "affiliateEditModal", void 0);
__decorate([
    Output('loadAffiliateList')
], AffiliatesListEditModalComponent.prototype, "loadAffiliateList", void 0);
AffiliatesListEditModalComponent = __decorate([
    Component({
        selector: 'app-affiliates-list-edit-modal',
        templateUrl: './affiliates-list-edit-modal.component.html',
        providers: [ToastrService],
    })
], AffiliatesListEditModalComponent);
export { AffiliatesListEditModalComponent };
//# sourceMappingURL=affiliates-list-edit-modal.component.js.map