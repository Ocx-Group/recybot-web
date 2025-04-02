import { __decorate } from "tslib";
import { Component, ViewChild, Output, EventEmitter, HostListener, } from '@angular/core';
import { ConceptList } from '@app/core/models/concept-model/concept-list.model';
let ConceptListDetailsModalComponent = class ConceptListDetailsModalComponent {
    constructor(modalService, conceptConfigurationService, gradingService) {
        this.modalService = modalService;
        this.conceptConfigurationService = conceptConfigurationService;
        this.gradingService = gradingService;
        this.submitted = false;
        this.detailsData = [];
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.conceptListModel = new ConceptList();
        this.conceptLevels = new ConceptList();
        this.loadConceptList = new EventEmitter();
    }
    ngOnInit() {
        this.fetchCalificationList();
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        if (this.table) {
            this.table.recalculate();
            this.table.recalculateColumns();
        }
    }
    detailsOpenModal(content, row) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
        this.conceptListModel = row;
        this.conceptLevels = row;
        this.conceptConfigurationService
            .getConceptConfigurationByConceptId(this.conceptLevels.id)
            .subscribe((resp) => {
            if (resp !== null) {
                this.temp = [...resp];
                this.rows = resp;
                this.loadingIndicator = false;
            }
        });
    }
    fetchCalificationList() {
        this.gradingService.getAll().subscribe((resp) => {
            if (resp !== null) {
                this.calificationList = resp;
            }
        });
    }
    getRowHeight(row) {
        return row.height;
    }
};
__decorate([
    ViewChild('table')
], ConceptListDetailsModalComponent.prototype, "table", void 0);
__decorate([
    ViewChild('conceptDetailsModal')
], ConceptListDetailsModalComponent.prototype, "conceptDetailsModal", void 0);
__decorate([
    Output('loadConceptList')
], ConceptListDetailsModalComponent.prototype, "loadConceptList", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], ConceptListDetailsModalComponent.prototype, "onResize", null);
ConceptListDetailsModalComponent = __decorate([
    Component({
        selector: 'app-concept-list-details-modal',
        templateUrl: './concept-list-details-modal.component.html',
    })
], ConceptListDetailsModalComponent);
export { ConceptListDetailsModalComponent };
//# sourceMappingURL=concept-list-details-modal.component.js.map