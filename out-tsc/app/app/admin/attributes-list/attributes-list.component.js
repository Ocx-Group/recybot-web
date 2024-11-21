import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
const header = ['Nombre', 'Descripción', 'No. Valores', 'Posición'];
let AttributesListComponent = class AttributesListComponent {
    constructor(modalService, productAttributeService, toastr, printService) {
        this.modalService = modalService;
        this.productAttributeService = productAttributeService;
        this.toastr = toastr;
        this.printService = printService;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadAttributesList();
    }
    createOpenModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
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
    loadAttributesList() {
        this.productAttributeService.getAll().subscribe((resp) => {
            if (resp != null) {
                this.temp = [...resp];
                this.rows = resp;
                this.loadingIndicator = false;
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
        this.productAttributeService.delete(id).subscribe((response) => {
            if (response.success) {
                this.deleteRecordSuccess(1);
                this.loadAttributesList();
            }
        });
    }
    onPrint() {
        const body = this.temp.map((items) => {
            const data = [items.name, items.description, items, items.position];
            return data;
        });
        this.printService.print(header, body, 'Lista de Atributos', false);
    }
};
__decorate([
    ViewChild('table')
], AttributesListComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], AttributesListComponent.prototype, "onResize", null);
AttributesListComponent = __decorate([
    Component({
        selector: 'app-attributes-list',
        templateUrl: './attributes-list.component.html',
    })
], AttributesListComponent);
export { AttributesListComponent };
//# sourceMappingURL=attributes-list.component.js.map