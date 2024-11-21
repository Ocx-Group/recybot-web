import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
let ConceptListBinaryConfigurationModalComponent = class ConceptListBinaryConfigurationModalComponent {
    constructor(modalService, formBuilder) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        //configBinaryForm: FormGroup;
        this.submitted = false;
        this.title = 'angular13bestcode';
    }
    ngOnInit() { }
};
__decorate([
    ViewChild('configBinaryModal')
], ConceptListBinaryConfigurationModalComponent.prototype, "configBinaryModal", void 0);
ConceptListBinaryConfigurationModalComponent = __decorate([
    Component({
        selector: 'app-concept-list-binary-configuration-modal',
        templateUrl: './concept-list-binary-configuration-modal.component.html',
        styleUrls: ['./concept-list.scss'],
    })
], ConceptListBinaryConfigurationModalComponent);
export { ConceptListBinaryConfigurationModalComponent };
//# sourceMappingURL=concept-list-binary-configuration-modal.component.js.map