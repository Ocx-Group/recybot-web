import { __decorate } from "tslib";
import { Component, EventEmitter, HostListener, Output, ViewChild, } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Validators, } from '@angular/forms';
import Swal from 'sweetalert2';
import { ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { ProductDiscount } from '@app/core/models/product-discount-model/product-discount.model';
import { Product } from '@app/core/models/product-model/product.model';
import { ProductCombination } from '@app/core/models/product-combination-model/product-combination.model';
import { ProductInventory } from '@app/core/models/product-inventory-model/product-inventory.model';
let ProductsAndServicesEditModalComponent = class ProductsAndServicesEditModalComponent {
    constructor(formBuilder, modalService, toastr, productService, productDiscountService, gradingService, productCategoryService, productAttributeValueService, productAttributeService, productCombinationService, productInventoryService, storage, http) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.toastr = toastr;
        this.productService = productService;
        this.productDiscountService = productDiscountService;
        this.gradingService = gradingService;
        this.productCategoryService = productCategoryService;
        this.productAttributeValueService = productAttributeValueService;
        this.productAttributeService = productAttributeService;
        this.productCombinationService = productCombinationService;
        this.productInventoryService = productInventoryService;
        this.storage = storage;
        this.http = http;
        this.Editor = ClassicEditor;
        this.isCheckedAttribute = false;
        this.isCheckedInventory = false;
        this.submittedProduct = false;
        this.submittedAttribute = false;
        this.submittedContentHtml = false;
        this.submittedDiscount = false;
        this.submittedInventory = false;
        this.active = 1;
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.rows = [];
        this.temp = [];
        this.rowsCombinations = [];
        this.tempCombinations = [];
        this.calificationList = [];
        this.categoriesList = [];
        this.product = new Product();
        this.productCombination = new ProductCombination();
        this.productDiscount = new ProductDiscount();
        this.productInventory = new ProductInventory();
        this.files = [];
        this.progress = 0;
        this.loadProductList = new EventEmitter();
    }
    ngOnInit() {
        this.productValidation();
        this.productAttributesValidation();
        this.productContentHtmlValidation();
        this.productDiscountValidation();
        this.productInventoryValidation();
        this.loadCalificationList();
        this.loadCategoryList();
        this.getAttributesList();
    }
    ngAfterViewInit() {
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        if (this.table) {
            this.table.recalculate();
            this.table.recalculateColumns();
        }
    }
    getRowHeight(row) {
        return row.height;
    }
    get edit_product_controls() {
        return this.editProductForm.controls;
    }
    get edit_product_attributes_controls() {
        return this.editProductAttributesForm.controls;
    }
    get edit_product_contentHtml_controls() {
        return this.editProductContentHtmlForm.controls;
    }
    get edit_product_discount_controls() {
        return this.editProductDiscountForm.controls;
    }
    get edit_product_inventory_controls() {
        return this.editProductInventoryForm.controls;
    }
    editOpenModal(content, row) {
        this.product = row;
        this.loadDiscountListByProductId(this.product.id);
        this.loadCombinationsList(this.product.id);
        // this.setFilesFromProductImage();
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
        this.editProductForm.setValue({
            name: this.product.name,
            bar_code: this.product.productCode,
            description: this.product.description,
            category: this.product.categoryId,
            keyword: this.product.keyWord,
            calculate_group: this.product.paymentGroup,
            sale_price: this.product.salePrice,
            taxes: this.product.tax,
            commissionable_value: this.product.commissionableValue,
            binary_points: this.product.binaryPoints,
            qualified_points: this.product.associatedQualification,
            product_weight: this.product.weight,
            inventory: this.product.inventory,
            minimum_purchase: this.product.acumCompMin,
            visible_product: this.product.visible,
            product_visible_public_store: this.product.visiblePublic,
            product_type: this.product.productType,
            hide_points: this.product.hidePoint,
            pack_product: this.product.productPacks,
            offer: this.product.offer,
            hide_commissionable_value: this.product.hideCommissionable,
            activate_gallery_zoom: this.product.activeZoomPhotos,
            recurring_product: this.product.recurringProduct,
            product_home: this.product.productHome,
            base_amount_pack: this.product.baseAmount,
            amount_day_pay: this.product.amountDayPay,
            days_wait: this.product.daysWait
        });
        this.isCheckedAttribute = this.product.activateCombinations;
        this.isCheckedInventory = this.product.inventory;
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    productValidation() {
        this.editProductForm = this.formBuilder.group({
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
            minimum_purchase: [],
            visible_product: [],
            product_visible_public_store: [],
            product_type: [],
            hide_points: [],
            pack_product: [],
            offer: [],
            hide_commissionable_value: [],
            activate_gallery_zoom: [],
            recurring_product: [],
            product_home: [],
            base_amount_pack: [],
            amount_day_pay: [],
            days_wait: []
        });
    }
    productAttributesValidation() {
        this.editProductAttributesForm = this.formBuilder.group({
            attribute_name: [''],
            attribute_value: [''],
            attribute_combination: [{ value: '', disabled: true }],
            attribute_reference: [],
        });
    }
    productContentHtmlValidation() {
        this.editProductContentHtmlForm = this.formBuilder.group({
            enable_content_html: [''],
        });
    }
    productDiscountValidation() {
        this.editProductDiscountForm = this.formBuilder.group({
            discount_name: ['', Validators.required],
            discount_description: [''],
            discount_calification: ['', Validators.required],
            discount_percentage: ['', Validators.required],
            discount_percentage_commissionable: [''],
            discount_commissionable: [],
            discount_percentage_binary_points: [''],
            discount_binary_points: [],
            discount_percentage_qualified_points: [''],
            discount_qualified_points: [],
        });
    }
    productInventoryValidation() {
        this.editProductInventoryForm = this.formBuilder.group({
            inventory_note: ['', Validators.required],
            inventory_support: [''],
            inventory_combination: [''],
            inventory_quantity: [''],
            inventory_type: [''],
        });
    }
    onSaveProduct() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.submittedProduct = true;
        if (this.editProductForm.invalid) {
            return;
        }
        this.product.name = this.editProductForm.value.name;
        this.product.productCode = this.editProductForm.value.bar_code;
        this.product.description = this.editProductForm.value.description;
        this.product.categoryId = parseInt(this.editProductForm.value.category);
        this.product.keyWord = this.editProductForm.value.keyword;
        this.product.paymentGroup = parseInt(this.editProductForm.value.calculate_group);
        this.product.salePrice = this.editProductForm.value.sale_price;
        this.product.tax = this.editProductForm.value.taxes;
        this.product.commissionableValue =
            this.editProductForm.value.commissionable_value;
        this.product.binaryPoints = this.editProductForm.value.binary_points;
        this.product.associatedQualification =
            this.editProductForm.value.qualified_points;
        this.product.weight = this.editProductForm.value.product_weight;
        this.product.inventory = (_a = this.editProductForm.value.inventory) !== null && _a !== void 0 ? _a : false;
        this.product.acumCompMin = this.editProductForm.value.minimum_purchase;
        this.product.visible = this.editProductForm.value.visible_product;
        this.product.visiblePublic =
            this.editProductForm.value.product_visible_public_store;
        this.product.productType = (_b = this.editProductForm.value.product_type) !== null && _b !== void 0 ? _b : false;
        this.product.hidePoint = (_c = this.editProductForm.value.hide_points) !== null && _c !== void 0 ? _c : false;
        this.product.productPacks =
            (_d = this.editProductForm.value.pack_product) !== null && _d !== void 0 ? _d : false;
        this.product.offer = (_e = this.editProductForm.value.offer) !== null && _e !== void 0 ? _e : false;
        this.product.hideCommissionable =
            (_f = this.editProductForm.value.hide_commissionable_value) !== null && _f !== void 0 ? _f : false;
        this.product.activeZoomPhotos =
            (_g = this.editProductForm.value.activate_gallery_zoom) !== null && _g !== void 0 ? _g : false;
        this.product.recurringProduct =
            (_h = this.editProductForm.value.recurring_product) !== null && _h !== void 0 ? _h : false;
        this.product.productHome = (_j = this.editProductForm.value.product_home) !== null && _j !== void 0 ? _j : false;
        this.product.amountDayPay = this.editProductForm.value.amount_day_pay;
        this.product.baseAmount = this.editProductForm.value.base_amount_pack;
        this.product.daysWait = this.editProductForm.value.days_wait;
        this.productService.updateProduct(this.product).subscribe((resp) => {
            if (resp.success) {
                this.showSuccess('The product was update successfully!');
                this.closeModals();
                this.loadProductList.emit();
            }
        });
    }
    onSaveProductAttribute() {
        this.submittedAttribute = true;
        if (this.editProductAttributesForm.invalid) {
            return;
        }
        this.productCombination.idAttributes = parseInt(this.editProductAttributesForm.value.attribute_name);
        this.productCombination.idProduct = this.product.id;
        this.productCombination.displayBigBanner =
            this.product.productsCategory.displayBigBanner;
        this.productCombinationService
            .createProductCombination(this.productCombination)
            .subscribe((resp) => {
            if (resp.success) {
                this.showSuccess('The product combination was create successfully!');
                this.editProductAttributesForm.reset();
                this.loadCombinationsList(this.product.id);
            }
        });
    }
    onSaveProductDiscount() {
        var _a, _b, _c;
        this.submittedDiscount = true;
        if (this.editProductForm.invalid) {
            return;
        }
        this.productDiscount.idProduct = this.product.id;
        this.productDiscount.name =
            this.editProductDiscountForm.value.discount_name;
        this.productDiscount.description =
            this.editProductDiscountForm.value.discount_description;
        this.productDiscount.qualification =
            this.editProductDiscountForm.value.discount_calification;
        this.productDiscount.percentage =
            this.editProductDiscountForm.value.discount_percentage;
        this.productDiscount.pCommissionable =
            this.editProductDiscountForm.value.discount_percentage_commissionable;
        this.productDiscount.pBinaryPoints =
            this.editProductDiscountForm.value.discount_percentage_binary_points;
        this.productDiscount.pPointsQualify =
            this.editProductDiscountForm.value.discount_percentage_qualified_points;
        this.productDiscount.pointsQualify =
            (_a = this.editProductDiscountForm.value.discount_qualified_points) !== null && _a !== void 0 ? _a : false;
        this.productDiscount.binaryPoints =
            (_b = this.editProductDiscountForm.value.discount_binary_points) !== null && _b !== void 0 ? _b : false;
        this.productDiscount.commissionable =
            (_c = this.editProductDiscountForm.value.discount_commissionable) !== null && _c !== void 0 ? _c : false;
        this.productDiscountService
            .createProductDiscount(this.productDiscount)
            .subscribe((resp) => {
            if (resp.success) {
                this.showSuccess('The product discount was create successfully!');
                this.editProductDiscountForm.reset();
                this.loadDiscountListByProductId(this.product.id);
            }
        });
    }
    onSaveProductInventory() {
        this.submittedInventory = true;
        if (this.editProductInventoryForm.invalid) {
            return;
        }
        this.productInventory.idProduct = this.product.id;
        this.productInventory.note = this.editProductInventoryForm.value.inventory_note;
        this.productInventory.support = this.editProductInventoryForm.value.inventory_support;
        this.productInventory.idCombination = parseInt(this.editProductInventoryForm.value.inventory_combination);
        this.productInventory.type = parseInt(this.editProductInventoryForm.value.inventory_type);
        if (this.productInventory.type === 0) {
            this.productInventory.ingress = this.editProductInventoryForm.value.inventory_quantity;
            this.productInventory.egress = 0;
        }
        else {
            this.productInventory.egress = this.editProductInventoryForm.value.inventory_quantity;
            this.productInventory.ingress = 0;
        }
        this.productInventoryService.createProductInventory(this.productInventory).subscribe((resp) => {
            if (resp.success) {
                this.showSuccess('The product inventory was create successfully!');
            }
        });
    }
    deleteSingleRowDiscount(value) {
        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonColor: '#8963ff',
            cancelButtonColor: '#fb7823',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.value) {
                this.deleteRecordDiscount(value);
            }
        });
    }
    deleteRecordSuccess(count) {
        this.toastr.success(count + ' Records Deleted Successfully', '');
    }
    deleteRecordDiscount(id) {
        this.productDiscountService.delete(id).subscribe((response) => {
            if (response.success) {
                this.deleteRecordSuccess(1);
                this.loadDiscountListByProductId(this.product.id);
            }
        });
    }
    deleteSingleRowCombination(value) {
        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonColor: '#8963ff',
            cancelButtonColor: '#fb7823',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.value) {
                this.deleteRecordCombination(value);
            }
        });
    }
    deleteRecordCombination(id) {
        this.productCombinationService.delete(id).subscribe((response) => {
            if (response.success) {
                this.deleteRecordSuccess(1);
                this.loadCombinationsList(this.product.id);
            }
        });
    }
    checkboxChangedAttribute() {
        this.product.activateCombinations = this.isCheckedAttribute;
        this.productService.updateProduct(this.product).subscribe(() => {
            if (this.product.activateCombinations) {
                this.showSuccess('Product attributes have been activated!');
                this.loadProductList.emit();
            }
            else {
                this.showSuccess('Product attributes have been deactivated!');
                this.loadProductList.emit();
            }
        });
    }
    getAttributesList() {
        this.productAttributeService
            .getAll()
            .subscribe((resp) => {
            if (resp != null) {
                this.attributesList = resp;
            }
        });
    }
    getNameValue(event) {
        let idAttribute = this.editProductAttributesForm.value.attribute_name;
        let value = this.editProductAttributesForm.value.attribute_value;
        const foundAttributeName = this.attributesList.find((item) => item.id == idAttribute);
        if (foundAttributeName) {
            this.editProductAttributesForm.patchValue({
                attribute_combination: foundAttributeName.name + ' : ' + value,
            });
        }
        this.productCombination.codeRef = foundAttributeName.name + ' : ' + value;
    }
    getAttributesValues(event) {
        this.editProductAttributesForm.patchValue({
            attribute_combination: '',
        });
        let id = event.target.value;
        if (id != null && id != '') {
            this.productAttributeValueService
                .getAttributeValueByAttributeId(id)
                .subscribe((resp) => {
                if (resp != null) {
                    this.attributesValuesList = resp;
                }
            });
        }
        else {
            this.attributesValuesList = [];
        }
    }
    loadDiscountListByProductId(id) {
        this.productDiscountService
            .getAllProductsDiscountByProductId(id)
            .subscribe((resp) => {
            this.temp = [...resp];
            this.rows = resp;
            this.loadingIndicator = false;
        });
    }
    loadCalificationList() {
        this.gradingService.getAll().subscribe((resp) => {
            if (resp !== null) {
                this.calificationList = resp;
            }
        });
    }
    loadCategoryList() {
        this.productCategoryService.getAll().subscribe((resp) => {
            this.categoriesList = resp;
        });
    }
    loadCombinationsList(id) {
        this.productCombinationService
            .getProductCombinationByProductId(id)
            .subscribe((resp) => {
            if (resp != null) {
                this.tempCombinations = [...resp];
                this.rowsCombinations = resp;
            }
        });
    }
    onFileSelected(event) {
        const file = event.addedFiles[0];
        this.files.push(file);
        const filePath = 'products/' + `${this.product.id}` + '.jpg';
        this.fileRef = ref(this.storage, filePath);
        this.startUpload();
    }
    startUpload() {
        if (!this.files[0]) {
            this.toastr.error('No file selected');
            return;
        }
        this.uploadTask = uploadBytesResumable(this.fileRef, this.files[0]);
        let toastReference = this.toastr.info('Upload started...', 'Progress', {
            progressBar: true,
            progressAnimation: 'increasing',
            timeOut: 0,
            extendedTimeOut: 0,
            disableTimeOut: true,
            tapToDismiss: false
        });
        this.uploadTask.on('state_changed', snapshot => {
            this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${this.progress}% done`);
            toastReference.toastRef.componentInstance.progress = this.progress;
        }, error => {
            console.error('Upload failed:', error);
            this.toastr.error('Upload failed');
        }, () => {
            getDownloadURL(this.uploadTask.snapshot.ref)
                .then(downloadURL => {
                this.product.image = downloadURL;
                return this.productService.updateProduct(this.product).toPromise();
            })
                .then(() => {
                this.toastr.clear(toastReference.toastId);
                this.toastr.success('Image updated successfully');
                this.files = [];
            })
                .catch(err => {
                console.error('Error updating product:', err);
                this.toastr.error('Error updating product');
            });
        });
    }
    deleteImage() {
        const filePath = 'products/' + `${this.product.id}` + '.jpg';
        this.product.image = null;
        this.productService.updateProduct(this.product).subscribe({
            next: () => {
                this.showSuccess('Image deleted successfully');
            },
            error: () => {
                this.toastr.error('error');
            },
        });
        this.files = [];
    }
    deleteFile(f) {
        if (0 > -1) {
            this.files.splice(0, 1);
        }
    }
};
__decorate([
    ViewChild('fileInput')
], ProductsAndServicesEditModalComponent.prototype, "fileInput", void 0);
__decorate([
    ViewChild('editProductModal')
], ProductsAndServicesEditModalComponent.prototype, "editProductModal", void 0);
__decorate([
    ViewChild('table')
], ProductsAndServicesEditModalComponent.prototype, "table", void 0);
__decorate([
    Output('loadProductList')
], ProductsAndServicesEditModalComponent.prototype, "loadProductList", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], ProductsAndServicesEditModalComponent.prototype, "onResize", null);
ProductsAndServicesEditModalComponent = __decorate([
    Component({
        selector: 'app-products-and-services-edit-modal',
        templateUrl: './products-and-services-edit-modal.component.html',
    })
], ProductsAndServicesEditModalComponent);
export { ProductsAndServicesEditModalComponent };
//# sourceMappingURL=products-and-services-edit-modal.component.js.map