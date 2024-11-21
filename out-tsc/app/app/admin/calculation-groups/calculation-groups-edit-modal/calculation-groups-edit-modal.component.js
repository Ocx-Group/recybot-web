import { __decorate } from "tslib";
import { PaymentGroup } from '@app/core/models/payment-group-model/payment.group.model';
import { Component, EventEmitter, Output, ViewChild, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
let CalculationGroupsEditModalComponent = class CalculationGroupsEditModalComponent {
    constructor(paymentGroupService, toastr, modalService, formBuilder) {
        this.paymentGroupService = paymentGroupService;
        this.toastr = toastr;
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.submitted = false;
        this.paymentGroup = new PaymentGroup();
        this.loadCalculationList = new EventEmitter();
    }
    get edit_calculation_controls() {
        return this.editCalculationForm.controls;
    }
    ngOnInit() {
        this.loadValidations();
    }
    loadValidations() {
        this.editCalculationForm = this.formBuilder.group({
            calculation_name: ['', Validators.required],
            description: ['', Validators.required],
        });
    }
    editOpenModal(content, paymentGroup) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
        this.paymentGroup.id = paymentGroup.id;
        this.editCalculationForm.setValue({
            calculation_name: paymentGroup.name,
            description: paymentGroup.description,
        });
    }
    updateCalculationGroup() {
        this.submitted = true;
        if (this.editCalculationForm.invalid) {
            return;
        }
        this.paymentGroup.name = this.editCalculationForm.value.calculation_name;
        this.paymentGroup.description = this.editCalculationForm.value.description;
        this.paymentGroupService
            .updatePaymentGroup(this.paymentGroup)
            .subscribe((response) => {
            if (response.success) {
                this.showSuccess('The payment group was update successfully!');
                this.closeModals();
                this.loadCalculationList.emit();
            }
        });
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    closeModals() {
        this.modalService.dismissAll();
    }
};
__decorate([
    ViewChild('calculationEditModal')
], CalculationGroupsEditModalComponent.prototype, "calculationEditModal", void 0);
__decorate([
    Output('loadCalculationList')
], CalculationGroupsEditModalComponent.prototype, "loadCalculationList", void 0);
CalculationGroupsEditModalComponent = __decorate([
    Component({
        selector: 'app-calculation-groups-edit-modal',
        templateUrl: './calculation-groups-edit-modal.component.html',
        providers: [ToastrService],
    })
], CalculationGroupsEditModalComponent);
export { CalculationGroupsEditModalComponent };
//# sourceMappingURL=calculation-groups-edit-modal.component.js.map