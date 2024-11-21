import { __decorate } from "tslib";
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProductCategory } from '@app/core/models/product-category-model/product-category.model';
let CategoriesEditModalComponent = class CategoriesEditModalComponent {
    constructor(formBuilder, modalService, productCategoryService, toastr) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.productCategoryService = productCategoryService;
        this.toastr = toastr;
        this.categoriesList = [];
        this.submitted = false;
        this.checkboxSmallBanner = false;
        this.checkboxBigBanner = false;
        this.selectedFile = null;
        this.category = new ProductCategory();
        this.loadCategoryList = new EventEmitter();
    }
    ngOnInit() {
        this.categorieValidation();
        this.categoryList();
    }
    get edit_categorie_controls() {
        return this.editCategorieForm.controls;
    }
    editOpenModal(content, row) {
        this.category = row;
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
        this.editCategorieForm.setValue({
            categorie: this.category.category,
            name: this.category.name,
            description: this.category.description,
            activate_big_banner: this.category.displayBigBanner,
            activate_small_banner: this.category.displaySmallBanner,
        });
    }
    categorieValidation() {
        this.editCategorieForm = this.formBuilder.group({
            categorie: [0],
            name: [''],
            description: [],
            activate_big_banner: [''],
            activate_small_banner: [''],
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
    }
    uploadFile() { }
    onChangeSmallBanner() {
        this.checkboxSmallBanner = !this.checkboxSmallBanner;
    }
    onChangeBigBanner() {
        this.checkboxBigBanner = !this.checkboxBigBanner;
    }
    onAddRowSave() {
        this.submitted = true;
        if (this.editCategorieForm.invalid) {
            return;
        }
        this.category.name = this.editCategorieForm.value.name;
        this.category.category = this.editCategorieForm.value.categorie;
        this.category.description = this.editCategorieForm.value.description;
        this.category.displayBigBanner = this.editCategorieForm.value.activate_big_banner;
        this.category.displaySmallBanner = this.editCategorieForm.value.activate_small_banner;
        this.productCategoryService.updateCategory(this.category).subscribe((resp) => {
            if (resp.success) {
                this.showSuccess('The category was update successfully!');
                this.closeModals();
                this.loadCategoryList.emit();
            }
        });
    }
    categoryList() {
        this.productCategoryService.getAll().subscribe((resp) => {
            this.categoriesList = resp;
        });
    }
};
__decorate([
    ViewChild('categoriesEditModal')
], CategoriesEditModalComponent.prototype, "categoriesEditModal", void 0);
__decorate([
    Output('loadCategoryList')
], CategoriesEditModalComponent.prototype, "loadCategoryList", void 0);
CategoriesEditModalComponent = __decorate([
    Component({
        selector: 'app-categories-edit-modal',
        templateUrl: './categories-edit-modal.component.html',
    })
], CategoriesEditModalComponent);
export { CategoriesEditModalComponent };
//# sourceMappingURL=categories-edit-modal.component.js.map