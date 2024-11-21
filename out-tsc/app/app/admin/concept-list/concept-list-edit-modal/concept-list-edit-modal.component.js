import { __decorate } from "tslib";
import { Component, ViewChild, Output, EventEmitter, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { ConceptList } from '@app/core/models/concept-model/concept-list.model';
let ConceptListEditModalComponent = class ConceptListEditModalComponent {
    constructor(modalService, formBuilder, toastr, paymentGroupService, conceptService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.paymentGroupService = paymentGroupService;
        this.conceptService = conceptService;
        this.submitted = false;
        this.calculateGroup = [];
        this.payConceptData = [];
        this.calculateConceptData = [];
        this.conceptListModel = new ConceptList();
        this.conceptValue = new ConceptList();
        this.loadConceptList = new EventEmitter();
    }
    ngOnInit() {
        this.loadValidations();
        this.fetchCalculateConcept();
        this.fetchPayConcept();
        this.loadCalculateGroupList();
    }
    editOpenModal(content, value) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
        this.conceptValue = value;
        this.editConceptForm.setValue({
            concept_name: this.conceptValue.name,
            calculate_group: this.conceptValue.paymentGroupId,
            paid_concept: this.conceptValue.payConcept,
            calculate_concept: this.conceptValue.calculateBy,
            compression: this.conceptValue.compression,
            equalization: this.conceptValue.equalization,
            ignore_activation: this.conceptValue.ignoreActivationOrder,
            active: this.conceptValue.active,
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    get edit_concept_controls() {
        return this.editConceptForm.controls;
    }
    loadValidations() {
        this.editConceptForm = this.formBuilder.group({
            concept_name: ['', Validators.required],
            calculate_group: ['', Validators.required],
            paid_concept: ['', Validators.required],
            calculate_concept: ['', Validators.required],
            compression: [],
            equalization: [],
            ignore_activation: [],
            active: [],
        });
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    fetchPayConcept() {
        this.conceptService.getPayConceptList().subscribe((resp) => {
            this.payConceptData = resp;
        });
    }
    fetchCalculateConcept() {
        this.conceptService.getCalculateConceptList().subscribe((resp) => {
            this.calculateConceptData = resp;
        });
    }
    loadCalculateGroupList() {
        this.paymentGroupService
            .getAll()
            .subscribe((paymentGroups) => {
            if (paymentGroups !== null) {
                this.calculateGroup = [...paymentGroups];
            }
            setTimeout(() => { }, 500);
        });
    }
    onAddRowSave() {
        var _a, _b, _c, _d;
        this.submitted = true;
        if (this.editConceptForm.invalid) {
            return;
        }
        this.conceptListModel.id = this.conceptValue.id;
        this.conceptListModel.name = this.editConceptForm.value.concept_name;
        this.conceptListModel.paymentGroupId =
            this.editConceptForm.value.calculate_group;
        this.conceptListModel.payConcept = this.editConceptForm.value.paid_concept;
        this.conceptListModel.calculateBy =
            this.editConceptForm.value.calculate_concept;
        this.conceptListModel.compression =
            (_a = this.editConceptForm.value.compression) !== null && _a !== void 0 ? _a : false;
        this.conceptListModel.equalization =
            (_b = this.editConceptForm.value.equalization) !== null && _b !== void 0 ? _b : false;
        this.conceptListModel.ignoreActivationOrder =
            (_c = this.editConceptForm.value.ignore_activation) !== null && _c !== void 0 ? _c : false;
        this.conceptListModel.active = (_d = this.editConceptForm.value.active) !== null && _d !== void 0 ? _d : false;
        this.conceptService
            .updateConcept(this.conceptListModel)
            .subscribe((resp) => {
            this.showSuccess('The concept was update successfully!');
            this.closeModals();
            this.loadConceptList.emit();
        });
    }
};
__decorate([
    ViewChild('conceptEditModal')
], ConceptListEditModalComponent.prototype, "conceptEditModal", void 0);
__decorate([
    Output('loadConceptList')
], ConceptListEditModalComponent.prototype, "loadConceptList", void 0);
ConceptListEditModalComponent = __decorate([
    Component({
        selector: 'app-concept-list-edit-modal',
        templateUrl: './concept-list-edit-modal.component.html',
    })
], ConceptListEditModalComponent);
export { ConceptListEditModalComponent };
//# sourceMappingURL=concept-list-edit-modal.component.js.map