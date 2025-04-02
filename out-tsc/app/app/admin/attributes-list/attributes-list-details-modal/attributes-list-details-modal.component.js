import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
import { Validators, } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductAttributeValue } from '@app/core/models/product-attribute-value-model/product-attribute-value.model';
let AttributesListDetailsModalComponent = class AttributesListDetailsModalComponent {
    constructor(modalService, formBuilder, productAttributeService, productAttributeValueService, toastr) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.productAttributeService = productAttributeService;
        this.productAttributeValueService = productAttributeValueService;
        this.toastr = toastr;
        this.active = 1;
        this.submitted = false;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.attributesList = [];
        this.productAttributeValue = new ProductAttributeValue();
    }
    ngOnInit() {
        this.loadValidation();
        this.loadAttributesList();
    }
    loadValidation() {
        this.detailsAttributesForm = this.formBuilder.group({
            attribute_group: ['', Validators.required],
            position: ['', Validators.required],
            value: ['', Validators.required],
        });
    }
    get details_attributes_controls() {
        return this.detailsAttributesForm.controls;
    }
    onResize(event) {
        if (this.table) {
            this.scrollBarHorizontal = window.innerWidth < 1200;
            this.table.recalculate();
            this.table.recalculateColumns();
        }
    }
    loadAttributesList() {
        this.productAttributeService.getAll().subscribe((resp) => {
            if (resp != null) {
                this.attributesList = resp;
                this.loadingIndicator = false;
            }
        });
    }
    loadAttributesValuesList(id) {
        this.productAttributeValueService
            .getAttributeValueByAttributeId(id)
            .subscribe((resp) => {
            if (resp != null) {
                this.temp = [...resp];
                this.rows = resp;
                this.loadingIndicator = false;
            }
        });
    }
    getRowHeight(row) {
        return row.height;
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    detailsOpenModal(content, row) {
        this.productAttributeValue.idAttribute = row;
        this.loadAttributesValuesList(row);
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
    }
    onAddRowSave() {
        this.submitted = true;
        if (this.detailsAttributesForm.invalid) {
            return;
        }
        this.productAttributeValue.idAttribute = this.detailsAttributesForm.value.attribute_group;
        this.productAttributeValue.position = this.detailsAttributesForm.value.position;
        this.productAttributeValue.attributeValue = this.detailsAttributesForm.value.value;
        this.productAttributeValueService.createProductAttributeValue(this.productAttributeValue).subscribe((resp) => {
            if (resp.success) {
                this.showSuccess('The attribute value was created successfully!');
                this.loadAttributesValuesList(this.productAttributeValue.idAttribute);
                this.detailsAttributesForm.reset();
            }
        });
    }
    deleteSingleRow(value) {
        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonColor: '#8963ff',
            cancelButtonColor: '#fb7823',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.value) {
                this.deleteRecord(value);
            }
        });
    }
    deleteRecordSuccess(count) {
        this.toastr.success(count + ' Records Deleted Successfully', '');
    }
    deleteRecord(id) {
        this.productAttributeValueService.delete(id).subscribe((response) => {
            if (response.success) {
                this.deleteRecordSuccess(1);
                this.loadAttributesValuesList(this.productAttributeValue.idAttribute);
            }
        });
    }
};
__decorate([
    ViewChild('attributesDetailsModal')
], AttributesListDetailsModalComponent.prototype, "attributesDetailsModal", void 0);
__decorate([
    ViewChild('table')
], AttributesListDetailsModalComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], AttributesListDetailsModalComponent.prototype, "onResize", null);
AttributesListDetailsModalComponent = __decorate([
    Component({
        selector: 'app-attributes-list-details-modal',
        templateUrl: './attributes-list-details-modal.component.html',
    })
], AttributesListDetailsModalComponent);
export { AttributesListDetailsModalComponent };
//# sourceMappingURL=attributes-list-details-modal.component.js.map