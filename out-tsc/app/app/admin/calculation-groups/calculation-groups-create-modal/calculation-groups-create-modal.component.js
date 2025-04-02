import { __decorate } from "tslib";
import { Component, ViewChild, Output, EventEmitter, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { PaymentGroup } from '@app/core/models/payment-group-model/payment.group.model';
let CalculationGroupsCreateModalComponent = class CalculationGroupsCreateModalComponent {
    constructor(formBuilder, paymentGroupService, toastr, modalService) {
        this.formBuilder = formBuilder;
        this.paymentGroupService = paymentGroupService;
        this.toastr = toastr;
        this.modalService = modalService;
        this.submitted = false;
        this.paymentGroup = new PaymentGroup();
        this.loadCalculationList = new EventEmitter();
    }
    ngOnInit() {
        this.loadValidations();
    }
    get create_calculation_controls() {
        return this.createCalculationForm.controls;
    }
    loadValidations() {
        this.createCalculationForm = this.formBuilder.group({
            calculation_name: ['', Validators.required],
            description: ['', Validators.required],
        });
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    onAddRowSave() {
        this.submitted = true;
        if (this.createCalculationForm.invalid) {
            return;
        }
        this.paymentGroup.name = this.createCalculationForm.value.calculation_name;
        this.paymentGroup.description =
            this.createCalculationForm.value.description;
        this.paymentGroup.status = true;
        this.paymentGroupService
            .createPaymentGroup(this.paymentGroup)
            .subscribe((resp) => {
            this.showSuccess('The payment group was created successfully!');
            this.closeModals();
            this.loadCalculationList.emit();
        });
    }
};
__decorate([
    ViewChild('calculationCreateModal')
], CalculationGroupsCreateModalComponent.prototype, "calculationCreateModal", void 0);
__decorate([
    Output('loadCalculationList')
], CalculationGroupsCreateModalComponent.prototype, "loadCalculationList", void 0);
CalculationGroupsCreateModalComponent = __decorate([
    Component({
        selector: 'app-calculation-groups-create-modal',
        templateUrl: './calculation-groups-create-modal.component.html',
    })
], CalculationGroupsCreateModalComponent);
export { CalculationGroupsCreateModalComponent };
//# sourceMappingURL=calculation-groups-create-modal.component.js.map