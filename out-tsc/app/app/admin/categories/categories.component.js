import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
const header = ['Nombre de Categoría', 'Descripción', 'Categoría Padre'];
let CategoriesComponent = class CategoriesComponent {
    constructor(modalService, productCategoryService, toastr, printService) {
        this.modalService = modalService;
        this.productCategoryService = productCategoryService;
        this.toastr = toastr;
        this.printService = printService;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.properties = [];
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadCategoryList();
    }
    onResize(event) {
        if (this.table) {
            this.scrollBarHorizontal = window.innerWidth < 1200;
            this.table.recalculate();
            this.table.recalculateColumns();
        }
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
    loadCategoryList() {
        this.productCategoryService.getAll().subscribe((resp) => {
            this.temp = [...resp];
            this.rows = resp;
            this.loadingIndicator = false;
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
        this.productCategoryService.delete(id).subscribe((response) => {
            if (response.success) {
                this.deleteRecordSuccess(1);
                this.loadCategoryList();
            }
        });
    }
    onPrint() {
        const body = this.temp.map((items) => {
            const data = [items.name, items.description, items.category];
            return data;
        });
        this.printService.print(header, body, 'Lista de Categorías', false);
    }
};
__decorate([
    ViewChild('table')
], CategoriesComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], CategoriesComponent.prototype, "onResize", null);
CategoriesComponent = __decorate([
    Component({
        selector: 'app-categories',
        templateUrl: './categories.component.html',
    })
], CategoriesComponent);
export { CategoriesComponent };
//# sourceMappingURL=categories.component.js.map