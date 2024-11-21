import { __decorate } from "tslib";
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { ProductCategory } from '@app/core/models/product-category-model/product-category.model';
let CategoriesCreateModalComponent = class CategoriesCreateModalComponent {
    constructor(formBuilder, productCategoryService, modalService, toastr) {
        this.formBuilder = formBuilder;
        this.productCategoryService = productCategoryService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.submitted = false;
        this.checkboxSmallBanner = false;
        this.checkboxBigBanner = false;
        this.selectedFile = null;
        this.categories = [];
        this.productCategory = new ProductCategory();
        this.loadCategoryList = new EventEmitter();
    }
    ngOnInit() {
        this.categorieValidation();
        this.categoryList();
    }
    get create_categorie_controls() {
        return this.createCategorieForm.controls;
    }
    categorieValidation() {
        this.createCategorieForm = this.formBuilder.group({
            categorie: [0],
            name: ['', Validators.required],
            description: [''],
            activate_big_banner: [],
            activate_small_banner: [],
        });
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
    closeModals() {
        this.modalService.dismissAll();
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    onAddRowSave() {
        var _a, _b;
        this.submitted = true;
        if (this.createCategorieForm.invalid) {
            return;
        }
        this.productCategory.name = this.createCategorieForm.value.name;
        this.productCategory.category = parseInt(this.createCategorieForm.value.categorie);
        this.productCategory.description = this.createCategorieForm.value.description;
        this.productCategory.displaySmallBanner = (_a = this.createCategorieForm.value.activate_small_banner) !== null && _a !== void 0 ? _a : false;
        this.productCategory.displayBigBanner = (_b = this.createCategorieForm.value.activate_big_banner) !== null && _b !== void 0 ? _b : false;
        this.productCategoryService.createCategory(this.productCategory).subscribe((resp) => {
            if (resp.success) {
                this.showSuccess('The category was created successfully!');
                this.closeModals();
                this.createCategorieForm.reset();
                this.loadCategoryList.emit();
            }
        });
    }
    categoryList() {
        this.productCategoryService.getAll().subscribe((resp) => {
            this.categories = resp;
        });
    }
};
__decorate([
    ViewChild('categoriesCreateModal')
], CategoriesCreateModalComponent.prototype, "categoriesCreateModal", void 0);
__decorate([
    Output('loadCategoryList')
], CategoriesCreateModalComponent.prototype, "loadCategoryList", void 0);
CategoriesCreateModalComponent = __decorate([
    Component({
        selector: 'app-categories-create-modal',
        templateUrl: './categories-create-modal.component.html',
    })
], CategoriesCreateModalComponent);
export { CategoriesCreateModalComponent };
//# sourceMappingURL=categories-create-modal.component.js.map