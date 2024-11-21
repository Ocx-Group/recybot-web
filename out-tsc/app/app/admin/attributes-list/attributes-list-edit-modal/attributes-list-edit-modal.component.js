import { __decorate } from "tslib";
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Validators, } from '@angular/forms';
import { ProductAttribute } from '@app/core/models/product-attribute-model/product-attribute.model';
let AttributesListEditModalComponent = class AttributesListEditModalComponent {
    constructor(formBuilder, modalService, productAttributeService, toastr) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.productAttributeService = productAttributeService;
        this.toastr = toastr;
        this.submitted = false;
        this.productAttribute = new ProductAttribute();
        this.loadAttributesList = new EventEmitter();
    }
    ngOnInit() {
        this.attributeValidation();
        this.getAttributesType();
    }
    attributeValidation() {
        this.editAttributeForm = this.formBuilder.group({
            name: ['', Validators.required],
            attribute_type: ['', Validators.required],
            description: [],
            position: ['', Validators.required],
        });
    }
    get edit_attribute_controls() {
        return this.editAttributeForm.controls;
    }
    getAttributesType() {
        this.productAttributeService.getAttributeType().subscribe((resp) => {
            this.attributesType = resp;
        });
    }
    onAddRowSave() {
        this.submitted = true;
        if (this.editAttributeForm.invalid) {
            return;
        }
        this.productAttribute.name = this.editAttributeForm.value.name;
        this.productAttribute.attribute = parseInt(this.editAttributeForm.value.attribute_type);
        this.productAttribute.description = this.editAttributeForm.value.description;
        this.productAttribute.position = this.editAttributeForm.value.position;
        this.productAttributeService.updateProductAttribute(this.productAttribute).subscribe((resp) => {
            if (resp.success) {
                this.showSuccess('The attribute was update successfully!');
                this.closeModals();
                this.loadAttributesList.emit();
            }
        });
    }
    editOpenModal(content, row) {
        this.productAttribute = row;
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
        this.editAttributeForm.setValue({
            name: this.productAttribute.name,
            attribute_type: this.productAttribute.attribute,
            description: this.productAttribute.description,
            position: this.productAttribute.position,
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
    ViewChild('attributesEditModal')
], AttributesListEditModalComponent.prototype, "attributesEditModal", void 0);
__decorate([
    Output('loadAttributesList')
], AttributesListEditModalComponent.prototype, "loadAttributesList", void 0);
AttributesListEditModalComponent = __decorate([
    Component({
        selector: 'app-attributes-list-edit-modal',
        templateUrl: './attributes-list-edit-modal.component.html',
    })
], AttributesListEditModalComponent);
export { AttributesListEditModalComponent };
//# sourceMappingURL=attributes-list-edit-modal.component.js.map