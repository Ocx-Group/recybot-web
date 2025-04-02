import { __decorate } from "tslib";
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Validators, } from '@angular/forms';
import { Grading } from '@app/core/models/grading-model/grading.model';
let CalificationsListCreateModalComponent = class CalificationsListCreateModalComponent {
    constructor(formBuilder, gradingService, modalService, toastr) {
        this.formBuilder = formBuilder;
        this.gradingService = gradingService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.submitted = false;
        this.active = 1;
        this.grading = new Grading();
        this.loadCalculationList = new EventEmitter();
    }
    ngOnInit() {
        this.calificationValidations();
        this.fetchProductList();
        this.fetchMembership();
        this.fetchCalificationList();
    }
    get create_calification_controls() {
        return this.createCalificationForm.controls;
    }
    calificationValidations() {
        this.createCalificationForm = this.formBuilder.group({
            calification_name: ['', Validators.required],
            description: ['', Validators.required],
            status: [],
            personal_shopping: [0],
            personal_purchases_exact: [],
            network_shopping: [0],
            full_period: [],
            scope_level: [0],
            infinite: [],
            binary_volume: [0],
            calification_points: [0],
            network_points_qualify: [0],
            children_left_leg: [0],
            children_right_leg: [0],
            front_by_matrix: [0],
            exact_front_ratings: [],
            qualified_fronts1: [0],
            qualified_fronts2: [0],
            qualified_fronts3: [0],
            qualification_qualified_fronts1: [0],
            qualification_qualified_fronts2: [0],
            qualification_qualified_fronts3: [0],
            products: [0],
            affiliations: [0],
            network_scope_level: [0],
            network_leaders: [0],
            network_leaders_qualifier: [0],
            leader_by_matrix: [0],
        });
    }
    onAddRowSave() {
        var _a, _b, _c, _d, _e;
        this.submitted = true;
        if (this.createCalificationForm.invalid) {
            return;
        }
        this.grading.name = this.createCalificationForm.value.calification_name;
        this.grading.description = this.createCalificationForm.value.description;
        this.grading.status = (_a = this.createCalificationForm.value.status) !== null && _a !== void 0 ? _a : false;
        this.grading.personal_purchases = this.createCalificationForm.value.personal_shopping;
        this.grading.personal_purchases_exact = (_b = this.createCalificationForm.value.personal_purchases_exact) !== null && _b !== void 0 ? _b : false;
        this.grading.purchases_network = this.createCalificationForm.value.network_shopping;
        this.grading.full_period = (_c = this.createCalificationForm.value.full_period) !== null && _c !== void 0 ? _c : false;
        this.grading.scope_level = this.createCalificationForm.value.scope_level;
        this.grading.is_infinity = (_d = this.createCalificationForm.value.infinite) !== null && _d !== void 0 ? _d : false;
        this.grading.binary_volume = this.createCalificationForm.value.binary_volume;
        this.grading.volume_points = this.createCalificationForm.value.calification_points;
        this.grading.volume_points_network = this.createCalificationForm.value.network_points_qualify;
        this.grading.children_left_leg = this.createCalificationForm.value.children_left_leg;
        this.grading.children_right_leg = this.createCalificationForm.value.children_right_leg;
        this.grading.front_by_matrix = this.createCalificationForm.value.front_by_matrix;
        this.grading.front_score_1 = this.createCalificationForm.value.qualified_fronts1;
        this.grading.front_score_2 = this.createCalificationForm.value.qualified_fronts2;
        this.grading.front_score_3 = this.createCalificationForm.value.qualified_fronts3;
        this.grading.front_qualif_1 = this.createCalificationForm.value.qualification_qualified_fronts1;
        this.grading.front_qualif_2 = this.createCalificationForm.value.qualification_qualified_fronts2;
        this.grading.front_qualif_3 = this.createCalificationForm.value.qualification_qualified_fronts3;
        this.grading.exact_front_ratings = (_e = this.createCalificationForm.value.exact_front_ratings) !== null && _e !== void 0 ? _e : false;
        this.grading.products = this.createCalificationForm.value.products;
        this.grading.affiliations = this.createCalificationForm.value.affiliations;
        this.grading.leader_by_matrix = this.createCalificationForm.value.leader_by_matrix;
        this.grading.network_scope_level = this.createCalificationForm.value.network_scope_level;
        this.grading.network_leaders = this.createCalificationForm.value.network_leaders;
        this.grading.network_leaders_qualifier = this.createCalificationForm.value.network_leaders_qualifier;
        this.gradingService.createGrading(this.grading).subscribe(() => {
            this.showSuccess('The calification was created successfully!');
            this.closeModals();
            this.loadCalculationList.emit();
        });
    }
    fetchProductList() {
        this.gradingService.getProductList().subscribe((resp) => {
            this.productListData = resp;
        });
    }
    fetchMembership() {
        this.gradingService.getMembership().subscribe((resp) => {
            this.membershipData = resp;
        });
    }
    fetchCalificationList() {
        this.gradingService.getAll().subscribe((resp) => {
            if (resp !== null) {
                this.calificationList = resp;
            }
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
};
__decorate([
    ViewChild('calificationCreateModal')
], CalificationsListCreateModalComponent.prototype, "calificationCreateModal", void 0);
__decorate([
    Output('loadCalificationList')
], CalificationsListCreateModalComponent.prototype, "loadCalculationList", void 0);
CalificationsListCreateModalComponent = __decorate([
    Component({
        selector: 'app-califications-list-create-modal',
        templateUrl: './califications-list-create-modal.component.html',
    })
], CalificationsListCreateModalComponent);
export { CalificationsListCreateModalComponent };
//# sourceMappingURL=califications-list-create-modal.component.js.map