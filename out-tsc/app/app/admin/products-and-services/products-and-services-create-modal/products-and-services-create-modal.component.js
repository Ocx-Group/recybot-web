import { __decorate } from "tslib";
import { Component, EventEmitter, Output, ViewChild, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { Product } from '@app/core/models/product-model/product.model';
let ProductsAndServicesCreateModalComponent = class ProductsAndServicesCreateModalComponent {
    constructor(formBuilder, modalService, toastr, paymentGroupService, productCategoryService, productService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.toastr = toastr;
        this.paymentGroupService = paymentGroupService;
        this.productCategoryService = productCategoryService;
        this.productService = productService;
        this.submitted = false;
        this.product = new Product();
        this.paymentsGroup = [];
        this.categoriesList = [];
        this.loadProductList = new EventEmitter();
    }
    ngOnInit() {
        this.productValidation();
        this.loadCalculationList();
        this.loadCategoryList();
    }
    get create_product_controls() {
        return this.createProductForm.controls;
    }
    productValidation() {
        this.createProductForm = this.formBuilder.group({
            name: ['', Validators.required],
            bar_code: [''],
            description: [''],
            category: [''],
            keyword: [''],
            calculate_group: ['', Validators.required],
            sale_price: ['', Validators.required],
            taxes: [''],
            commissionable_value: [''],
            binary_points: [''],
            qualified_points: [''],
            product_weight: [''],
            inventory: [],
            minimum_purchase: [true],
            visible_product: [true],
            product_visible_public_store: [true],
            product_type: [],
            hide_points: [],
            pack_product: [],
            offer: [],
            hide_commissionable_value: [],
            activate_gallery_zoom: [],
            recurring_product: [],
            product_home: [],
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    onAddRowSave() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.submitted = true;
        if (this.createProductForm.invalid) {
            return;
        }
        this.product.name = this.createProductForm.value.name;
        this.product.productCode = this.createProductForm.value.bar_code;
        this.product.description = this.createProductForm.value.description;
        this.product.categoryId = parseInt(this.createProductForm.value.category);
        this.product.keyWord = this.createProductForm.value.keyword;
        this.product.paymentGroup = parseInt(this.createProductForm.value.calculate_group);
        this.product.salePrice = this.createProductForm.value.sale_price;
        this.product.tax = this.createProductForm.value.taxes;
        this.product.commissionableValue = this.createProductForm.value.commissionable_value;
        this.product.binaryPoints = this.createProductForm.value.binary_points;
        this.product.associatedQualification = this.createProductForm.value.qualified_points;
        this.product.weight = this.createProductForm.value.product_weight;
        this.product.inventory = (_a = this.createProductForm.value.inventory) !== null && _a !== void 0 ? _a : false;
        this.product.acumCompMin = this.createProductForm.value.minimum_purchase;
        this.product.visible = this.createProductForm.value.visible_product;
        this.product.visiblePublic = this.createProductForm.value.product_visible_public_store;
        this.product.productType = (_b = this.createProductForm.value.product_type) !== null && _b !== void 0 ? _b : false;
        this.product.hidePoint = (_c = this.createProductForm.value.hide_points) !== null && _c !== void 0 ? _c : false;
        this.product.productPacks = (_d = this.createProductForm.value.pack_product) !== null && _d !== void 0 ? _d : false;
        this.product.offer = (_e = this.createProductForm.value.offer) !== null && _e !== void 0 ? _e : false;
        this.product.hideCommissionable = (_f = this.createProductForm.value.hide_commissionable_value) !== null && _f !== void 0 ? _f : false;
        this.product.activeZoomPhotos = (_g = this.createProductForm.value.activate_gallery_zoom) !== null && _g !== void 0 ? _g : false;
        this.product.recurringProduct = (_h = this.createProductForm.value.recurring_product) !== null && _h !== void 0 ? _h : false;
        this.product.productHome = (_j = this.createProductForm.value.product_home) !== null && _j !== void 0 ? _j : false;
        this.productService.createProduct(this.product).subscribe((resp) => {
            if (resp.success) {
                this.showSuccess('The product was created successfully!');
                this.closeModals();
                this.createProductForm.reset();
                this.loadProductList.emit();
            }
        });
    }
    loadCalculationList() {
        this.paymentGroupService
            .getAll()
            .subscribe((paymentGroups) => {
            if (paymentGroups !== null) {
                this.paymentsGroup = paymentGroups;
            }
        });
    }
    loadCategoryList() {
        this.productCategoryService.getAll().subscribe((resp) => {
            this.categoriesList = resp;
        });
    }
};
__decorate([
    ViewChild('createProductModal')
], ProductsAndServicesCreateModalComponent.prototype, "createProductModal", void 0);
__decorate([
    Output('loadProductList')
], ProductsAndServicesCreateModalComponent.prototype, "loadProductList", void 0);
ProductsAndServicesCreateModalComponent = __decorate([
    Component({
        selector: 'app-products-and-services-create-modal',
        templateUrl: './products-and-services-create-modal.component.html',
    })
], ProductsAndServicesCreateModalComponent);
export { ProductsAndServicesCreateModalComponent };
//# sourceMappingURL=products-and-services-create-modal.component.js.map