import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Incentive } from '@app/core/models/incentive-model/incentive.model';
let IncentivesListDetailsModalComponent = class IncentivesListDetailsModalComponent {
    constructor(modalService, gradingService) {
        this.modalService = modalService;
        this.gradingService = gradingService;
        this.incentive = new Incentive();
        this.active = 1;
    }
    ngOnInit() {
        this.fetchCalificationList();
        this.fetchMembership();
        this.fetchProductList();
    }
    detailsOpenModal(content, incentive) {
        this.incentive = incentive;
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
    ViewChild('incentiveDetailsModal')
], IncentivesListDetailsModalComponent.prototype, "incentiveDetailsModal", void 0);
IncentivesListDetailsModalComponent = __decorate([
    Component({
        selector: 'app-incentives-list-details-modal',
        templateUrl: './incentives-list-details-modal.component.html',
    })
], IncentivesListDetailsModalComponent);
export { IncentivesListDetailsModalComponent };
//# sourceMappingURL=incentives-list-details-modal.component.js.map