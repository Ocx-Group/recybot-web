import { __decorate } from "tslib";
import { Component, EventEmitter, Output, ViewChild, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { ProductAttribute } from '@app/core/models/product-attribute-model/product-attribute.model';
let AttributesListCreateModalComponent = class AttributesListCreateModalComponent {
    constructor(formBuilder, productAttributeService, modalService, toastr) {
        this.formBuilder = formBuilder;
        this.productAttributeService = productAttributeService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.submitted = false;
        this.productAttributes = new ProductAttribute();
        this.loadAttributesList = new EventEmitter();
    }
    ngOnInit() {
        this.attributeValidation();
        this.getAttributesType();
    }
    attributeValidation() {
        this.createAttributeForm = this.formBuilder.group({
            name: ['', Validators.required],
            attribute_type: ['', Validators.required],
            description: [],
            position: ['', Validators.required],
        });
    }
    get create_attribute_controls() {
        return this.createAttributeForm.controls;
    }
    onAddRowSave() {
        this.submitted = true;
        if (this.createAttributeForm.invalid) {
            return;
        }
        this.productAttributes.name = this.createAttributeForm.value.name;
        this.productAttributes.description =
            this.createAttributeForm.value.description;
        this.productAttributes.attribute =
            this.createAttributeForm.value.attribute_type;
        this.productAttributes.position = this.createAttributeForm.value.position;
        this.productAttributeService
            .createProductAttribute(this.productAttributes)
            .subscribe((resp) => {
            if (resp.success) {
                this.showSuccess('The attribute was created successfully!');
                this.closeModals();
                this.createAttributeForm.reset();
                this.loadAttributesList.emit();
            }
        });
    }
    getAttributesType() {
        this.productAttributeService.getAttributeType().subscribe((resp) => {
            this.attributesType = resp;
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
    ViewChild('attributesCreateModal')
], AttributesListCreateModalComponent.prototype, "attributesCreateModal", void 0);
__decorate([
    Output('loadAttributesList')
], AttributesListCreateModalComponent.prototype, "loadAttributesList", void 0);
AttributesListCreateModalComponent = __decorate([
    Component({
        selector: 'app-attributes-list-create-modal',
        templateUrl: './attributes-list-create-modal.component.html',
    })
], AttributesListCreateModalComponent);
export { AttributesListCreateModalComponent };
//# sourceMappingURL=attributes-list-create-modal.component.js.map