import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductConfiguration } from '@app/core/models/product-configuration-model/product-configuration.model';
const header = [
    'Código del Producto',
    'Nombre del Producto',
    'Tipo',
    'Val. Comisionable',
    'Vol. Puntos',
    'Precio de Venta',
    'Existencias',
];
let ProductsAndServicesComponent = class ProductsAndServicesComponent {
    constructor(modalService, productService, printService, toastr, configurationService) {
        this.modalService = modalService;
        this.productService = productService;
        this.printService = printService;
        this.toastr = toastr;
        this.configurationService = configurationService;
        this.rows = [];
        this.temp = [];
        this.productConfiguration = new ProductConfiguration();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadProductList();
        this.loadProductConfiguration();
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        if (this.table) {
            this.table.recalculate();
            this.table.recalculateColumns();
        }
    }
    loadProductList() {
        this.productService.getAllProductsAdmin().subscribe((resp) => {
            this.temp = [...resp];
            this.rows = resp;
            this.loadingIndicator = false;
        });
    }
    loadProductConfiguration() {
        this.configurationService.getProductConfiguration().subscribe((resp) => {
            if (resp != null) {
                this.productConfiguration = resp;
            }
        });
    }
    getRowHeight(row) {
        return row.height;
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    createOpenModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
    }
    onPrint() {
        const body = this.temp.map((items) => {
            const data = [
                items.productCode,
                items.name,
                items.productType ? 'Afiliación' : 'Producto',
                'COM ' + items.commissionableValue,
                'PNT ' + items.valuePoints,
                'USD ' + items.salePrice,
                items.inventory ? '∞' : '0',
            ];
            return data;
        });
        this.printService.print(header, body, 'Lista de Productos', false);
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
        this.productService.delete(id).subscribe((response) => {
            if (response.success) {
                this.deleteRecordSuccess(1);
                this.loadProductList();
            }
        });
    }
};
__decorate([
    ViewChild('table')
], ProductsAndServicesComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], ProductsAndServicesComponent.prototype, "onResize", null);
ProductsAndServicesComponent = __decorate([
    Component({
        selector: 'app-products-and-services',
        templateUrl: './products-and-services.component.html',
    })
], ProductsAndServicesComponent);
export { ProductsAndServicesComponent };
//# sourceMappingURL=products-and-services.component.js.map