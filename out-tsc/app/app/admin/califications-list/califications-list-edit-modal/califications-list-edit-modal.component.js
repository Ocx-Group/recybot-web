import { __decorate } from "tslib";
import { Component, ViewChild, Output, EventEmitter, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { Grading } from '@app/core/models/grading-model/grading.model';
const ALERTS = [
    {
        type: 'info',
        message: '',
    },
];
let CalificationsListEditModalComponent = class CalificationsListEditModalComponent {
    constructor(formBuilder, gradingService, toastr, modalService) {
        this.formBuilder = formBuilder;
        this.gradingService = gradingService;
        this.toastr = toastr;
        this.modalService = modalService;
        this.submitted = false;
        this.active = 1;
        this.show = true;
        this.linkMsj = 'hide';
        this.grading = new Grading();
        this.loadCalculationList = new EventEmitter();
        this.alerts = Array.from(ALERTS);
    }
    ngOnInit() {
        this.calificationValidations();
        this.fetchProductList();
        this.fetchMembership();
        this.fetchCalificationList();
    }
    get edit_calification_controls() {
        return this.editCalificationForm.controls;
    }
    editOpenModal(content, grading) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
        this.grading.id = grading.id;
        this.editCalificationForm.setValue({
            calification_name: grading.name,
            description: grading.description,
            status: grading.status,
            personal_shopping: grading.personal_purchases,
            personal_purchases_exact: grading.personal_purchases_exact,
            network_shopping: grading.purchases_network,
            full_period: grading.full_period,
            scope_level: grading.scope_level,
            infinite: grading.is_infinity,
            binary_volume: grading.binary_volume,
            calification_points: grading.volume_points,
            network_points_qualify: grading.volume_points_network,
            children_left_leg: grading.children_left_leg,
            children_right_leg: grading.children_right_leg,
            front_by_matrix: grading.front_by_matrix.toString(),
            exact_front_ratings: grading.exact_front_ratings,
            qualified_fronts1: grading.front_score_1,
            qualified_fronts2: grading.front_score_2,
            qualified_fronts3: grading.front_score_3,
            qualification_qualified_fronts1: grading.front_qualif_1,
            qualification_qualified_fronts2: grading.front_qualif_2,
            qualification_qualified_fronts3: grading.front_qualif_3,
            products: grading.products,
            affiliations: grading.affiliations,
            network_scope_level: grading.network_scope_level,
            network_leaders: grading.network_leaders,
            network_leaders_qualifier: grading.network_leaders_qualifier,
            leader_by_matrix: grading.leader_by_matrix.toString(),
        });
    }
    showMsj() {
        if (this.show) {
            this.show = false;
            this.linkMsj = 'show';
        }
        else {
            this.show = true;
            this.linkMsj = 'hide';
        }
    }
    calificationValidations() {
        this.editCalificationForm = this.formBuilder.group({
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
            front_by_matrix: [],
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
            leader_by_matrix: [],
        });
    }
    onAddRowSave() {
        var _a, _b, _c, _d, _e;
        this.submitted = true;
        if (this.editCalificationForm.invalid) {
            return;
        }
        this.grading.name = this.editCalificationForm.value.calification_name;
        this.grading.description = this.editCalificationForm.value.description;
        this.grading.status = (_a = this.editCalificationForm.value.status) !== null && _a !== void 0 ? _a : false;
        this.grading.personal_purchases =
            this.editCalificationForm.value.personal_shopping;
        this.grading.personal_purchases_exact =
            (_b = this.editCalificationForm.value.personal_purchases_exact) !== null && _b !== void 0 ? _b : false;
        this.grading.purchases_network =
            this.editCalificationForm.value.network_shopping;
        this.grading.full_period =
            (_c = this.editCalificationForm.value.full_period) !== null && _c !== void 0 ? _c : false;
        this.grading.scope_level = this.editCalificationForm.value.scope_level;
        this.grading.is_infinity =
            (_d = this.editCalificationForm.value.infinite) !== null && _d !== void 0 ? _d : false;
        this.grading.binary_volume = this.editCalificationForm.value.binary_volume;
        this.grading.volume_points =
            this.editCalificationForm.value.calification_points;
        this.grading.volume_points_network =
            this.editCalificationForm.value.network_points_qualify;
        this.grading.children_left_leg =
            this.editCalificationForm.value.children_left_leg;
        this.grading.children_right_leg =
            this.editCalificationForm.value.children_right_leg;
        this.grading.front_by_matrix = parseInt(this.editCalificationForm.value.front_by_matrix);
        this.grading.front_score_1 =
            this.editCalificationForm.value.qualified_fronts1;
        this.grading.front_score_2 =
            this.editCalificationForm.value.qualified_fronts2;
        this.grading.front_score_3 =
            this.editCalificationForm.value.qualified_fronts3;
        this.grading.front_qualif_1 =
            this.editCalificationForm.value.qualification_qualified_fronts1;
        this.grading.front_qualif_2 =
            this.editCalificationForm.value.qualification_qualified_fronts2;
        this.grading.front_qualif_3 =
            this.editCalificationForm.value.qualification_qualified_fronts3;
        this.grading.exact_front_ratings =
            (_e = this.editCalificationForm.value.exact_front_ratings) !== null && _e !== void 0 ? _e : false;
        this.grading.products = this.editCalificationForm.value.products;
        this.grading.affiliations = this.editCalificationForm.value.affiliations;
        this.grading.leader_by_matrix = parseInt(this.editCalificationForm.value.leader_by_matrix);
        this.grading.network_scope_level =
            this.editCalificationForm.value.network_scope_level;
        this.grading.network_leaders =
            this.editCalificationForm.value.network_leaders;
        this.grading.network_leaders_qualifier =
            this.editCalificationForm.value.network_leaders_qualifier;
        this.gradingService.updateGrading(this.grading).subscribe(() => {
            this.showSuccess('The calification was update successfully!');
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
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    closeModals() {
        this.modalService.dismissAll();
    }
};
__decorate([
    ViewChild('calificationEditModal')
], CalificationsListEditModalComponent.prototype, "calificationEditModal", void 0);
__decorate([
    Output('loadCalificationList')
], CalificationsListEditModalComponent.prototype, "loadCalculationList", void 0);
CalificationsListEditModalComponent = __decorate([
    Component({
        selector: 'app-califications-list-edit-modal',
        templateUrl: './califications-list-edit-modal.component.html',
    })
], CalificationsListEditModalComponent);
export { CalificationsListEditModalComponent };
//# sourceMappingURL=califications-list-edit-modal.component.js.map