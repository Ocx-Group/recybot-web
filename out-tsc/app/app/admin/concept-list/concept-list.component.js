import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
const header = [
    'Nombre del Concepto',
    'Estado del concepto',
    'Grupo de calculo',
    'Pagar concepto a',
    'Calcular concepto',
    'Compresión',
    'Igualación',
];
let ConceptListComponent = class ConceptListComponent {
    constructor(modalService, conceptService, printService, clipboardService, toastr) {
        this.modalService = modalService;
        this.conceptService = conceptService;
        this.printService = printService;
        this.clipboardService = clipboardService;
        this.toastr = toastr;
        this.rows = [];
        this.temp = [];
        this.properties = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadConceptList();
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
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }
    createOpenModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
    }
    loadConceptList() {
        this.conceptService.getAll().subscribe((resp) => {
            if (resp !== null) {
                this.temp = [...resp];
                this.rows = resp;
            }
            setTimeout(() => {
                this.loadingIndicator = false;
            }, 500);
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
        this.conceptService.delete(id).subscribe((response) => {
            if (response.success) {
                this.deleteRecordSuccess(1);
                this.loadConceptList();
            }
        });
    }
    onPrint() {
        const body = this.temp.map((items) => {
            const data = [
                items.name,
                items.active ? 'Activo' : 'Inactivo',
                items.paymentGroup.name,
                items.payConcept === 1
                    ? 'Patrocinador Personal(Matrix Unilevel)'
                    : 'Patrocinador de Ubicación(Matrix Forzada)',
                items.calculateBy === 1
                    ? 'Calificación Igual (==)'
                    : 'Calificación ó Mayor (>=)',
                items.compression ? 'Activo' : 'Inactivo',
                items.equalization ? 'Activo' : 'Inactivo',
            ];
            return data;
        });
        this.printService.print(header, body, 'Lista de Conceptos', false);
    }
    clipBoardCopy() {
        this.properties = [
            'name',
            'description',
            'status',
            'payConcept',
            'calculateBy',
            'compression',
            'equalization',
            'createdAt',
        ];
        let value = JSON.stringify(this.temp, this.properties);
        value = value.replace(/[[\]"']/g, '');
        this.clipboardService.copyFromContent(value);
        if (this.temp.length === 0) {
            this.toastr.info('No data to copy');
        }
        else {
            this.toastr.success('Copied ' + this.temp.length + ' rows successfully');
        }
    }
};
__decorate([
    ViewChild('table')
], ConceptListComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], ConceptListComponent.prototype, "onResize", null);
ConceptListComponent = __decorate([
    Component({
        selector: 'app-concept-list',
        templateUrl: './concept-list.component.html',
        providers: [ToastrService],
    })
], ConceptListComponent);
export { ConceptListComponent };
//# sourceMappingURL=concept-list.component.js.map