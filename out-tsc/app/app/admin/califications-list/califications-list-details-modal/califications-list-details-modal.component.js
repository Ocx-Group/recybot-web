import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Grading } from '@app/core/models/grading-model/grading.model';
let CalificationsListDetailsModalComponent = class CalificationsListDetailsModalComponent {
    constructor(modalService, gradingService) {
        this.modalService = modalService;
        this.gradingService = gradingService;
        this.active = 1;
        this.gradingData = new Grading();
    }
    ngOnInit() {
        this.fetchCalificationList();
        this.fetchMembership();
        this.fetchProductList();
    }
    detailsOpenModal(content, grading) {
        this.gradingData = grading;
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
    }
    fetchCalificationList() {
        this.gradingService.getAll().subscribe((resp) => {
            if (resp !== null) {
                this.calificationList = resp;
            }
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
};
__decorate([
    ViewChild('calificationDetailsModal')
], CalificationsListDetailsModalComponent.prototype, "calificationDetailsModal", void 0);
CalificationsListDetailsModalComponent = __decorate([
    Component({
        selector: 'app-califications-list-details-modal',
        templateUrl: './califications-list-details-modal.component.html',
    })
], CalificationsListDetailsModalComponent);
export { CalificationsListDetailsModalComponent };
//# sourceMappingURL=califications-list-details-modal.component.js.map