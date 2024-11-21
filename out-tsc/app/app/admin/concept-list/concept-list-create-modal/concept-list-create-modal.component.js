import { __decorate } from "tslib";
import { Component, ViewChild, Output, EventEmitter, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { ConceptList } from '@app/core/models/concept-model/concept-list.model';
let ConceptListCreateModalComponent = class ConceptListCreateModalComponent {
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
        this.loadConceptList = new EventEmitter();
    }
    ngOnInit() {
        this.loadValidations();
        this.loadCalculateGroupList();
        this.fetchPayConcept();
        this.fetchCalculateConcept();
    }
    createOpenModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    get create_concept_controls() {
        return this.createConceptForm.controls;
    }
    loadValidations() {
        this.createConceptForm = this.formBuilder.group({
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
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    onAddRowSave() {
        var _a, _b, _c, _d;
        this.submitted = true;
        if (this.createConceptForm.invalid) {
            return;
        }
        this.conceptListModel.name = this.createConceptForm.value.concept_name;
        this.conceptListModel.paymentGroupId =
            this.createConceptForm.value.calculate_group;
        this.conceptListModel.payConcept =
            this.createConceptForm.value.paid_concept;
        this.conceptListModel.calculateBy =
            this.createConceptForm.value.calculate_concept;
        this.conceptListModel.compression =
            (_a = this.createConceptForm.value.compression) !== null && _a !== void 0 ? _a : false;
        this.conceptListModel.equalization =
            (_b = this.createConceptForm.value.equalization) !== null && _b !== void 0 ? _b : false;
        this.conceptListModel.ignoreActivationOrder =
            (_c = this.createConceptForm.value.ignore_activation) !== null && _c !== void 0 ? _c : false;
        this.conceptListModel.active = (_d = this.createConceptForm.value.active) !== null && _d !== void 0 ? _d : false;
        this.conceptService
            .createConcept(this.conceptListModel)
            .subscribe((resp) => {
            this.showSuccess(this.greeting);
            this.closeModals();
            this.loadConceptList.emit();
        });
    }
};
__decorate([
    ViewChild('conceptCreateModal')
], ConceptListCreateModalComponent.prototype, "conceptCreateModal", void 0);
__decorate([
    Output('loadConceptList')
], ConceptListCreateModalComponent.prototype, "loadConceptList", void 0);
ConceptListCreateModalComponent = __decorate([
    Component({
        selector: 'app-concept-list-create-modal',
        templateUrl: './concept-list-create-modal.component.html',
    })
], ConceptListCreateModalComponent);
export { ConceptListCreateModalComponent };
//# sourceMappingURL=concept-list-create-modal.component.js.map