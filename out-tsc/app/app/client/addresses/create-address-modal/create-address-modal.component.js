import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AffiliateAddress } from '@app/core/models/affiliate-address-model/affiliate-address.model';
let CreateAddressModalComponent = class CreateAddressModalComponent {
    constructor(modalService, auth) {
        this.modalService = modalService;
        this.auth = auth;
        this.submitted = false;
    }
    ngOnInit() {
        this.user = this.auth.currentUserAffiliateValue;
        this.initCreateAddressGroup();
    }
    get create_address_controls() {
        return this.createAddressGroup.controls;
    }
    openCreateAddressModal() {
        this.modalService.open(this.modalContent, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            centered: true,
        });
    }
    initCreateAddressGroup() {
        this.createAddressGroup = new FormGroup({
            fiscal_identification: new FormControl(),
            address_name: new FormControl(),
            name: new FormControl(),
            lastName: new FormControl(),
            company: new FormControl(),
            iva_number: new FormControl(),
            address: new FormControl(),
            address_line_2: new FormControl(),
            postal_code: new FormControl(),
            country: new FormControl(),
            state: new FormControl(),
            city: new FormControl(),
            landline_phone: new FormControl(),
            mobile_phone: new FormControl(),
            other: new FormControl()
        });
    }
    saveNewAddress() {
        this.submitted = true;
        if (this.createAddressGroup.invalid)
            return;
    }
    setNewAddress() {
        const affiliateAddress = new AffiliateAddress();
        affiliateAddress.affiliateId = this.user.id;
        affiliateAddress.fiscalIdentification = this.createAddressGroup.value.fiscal_identification;
        affiliateAddress.addressName = this.createAddressGroup.value.address_name;
        affiliateAddress.name = this.createAddressGroup.value.name;
        affiliateAddress.lastName = this.createAddressGroup.value.lastName;
        affiliateAddress.company = this.createAddressGroup.value.company;
        affiliateAddress.ivaNumber = this.createAddressGroup.value.iva_number;
        affiliateAddress.address = this.createAddressGroup.value.address;
        affiliateAddress.addressLine2 = this.createAddressGroup.value.address_line_2;
        affiliateAddress.postalCode = this.createAddressGroup.value.postal_code;
        affiliateAddress.city = this.createAddressGroup.value.city;
        affiliateAddress.state = this.createAddressGroup.value.state;
        affiliateAddress.country = this.user.country;
        affiliateAddress.landlinePhone = this.createAddressGroup.value.landline_phone;
        affiliateAddress.mobilePhone = this.createAddressGroup.value.mobile_phone;
        affiliateAddress.other = this.createAddressGroup.value.other;
        affiliateAddress.date = new Date();
        affiliateAddress.email = this.user.email;
        return affiliateAddress;
    }
};
__decorate([
    ViewChild('createAddressModal', { static: true })
], CreateAddressModalComponent.prototype, "modalContent", void 0);
CreateAddressModalComponent = __decorate([
    Component({
        selector: 'app-create-address-modal',
        templateUrl: './create-address-modal.component.html'
    })
], CreateAddressModalComponent);
export { CreateAddressModalComponent };
//# sourceMappingURL=create-address-modal.component.js.map