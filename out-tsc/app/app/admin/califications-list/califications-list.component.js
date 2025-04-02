import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
const header = [
    'Nombre del Calificación',
    'Descripción',
    'Estado de Calificación',
    'Fecha de Registro',
];
let CalificationsListComponent = class CalificationsListComponent {
    constructor(modalService, gradingService, printService, clipboardService, toastr) {
        this.modalService = modalService;
        this.gradingService = gradingService;
        this.printService = printService;
        this.clipboardService = clipboardService;
        this.toastr = toastr;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.properties = [];
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadCalificationList();
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
            size: 'xl',
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    loadCalificationList() {
        this.gradingService.getAll().subscribe((resp) => {
            if (resp !== null) {
                this.temp = [...resp];
                this.rows = resp;
            }
            setTimeout(() => {
                this.loadingIndicator = false;
            }, 500);
        });
    }
    onPrint() {
        const body = this.temp.map((items) => {
            const data = [
                items.name,
                items.description,
                items.status === true ? 'Activo' : 'Inactivo',
                items.created_at,
            ];
            return data;
        });
        this.printService.print(header, body, 'Lista de Calificaciones', false);
    }
    clipBoardCopy() {
        let properties = ['name', 'description', 'status', 'created_at'];
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
        this.gradingService.delete(id).subscribe((response) => {
            if (response.success) {
                this.deleteRecordSuccess(1);
                this.loadCalificationList();
            }
        });
    }
};
__decorate([
    ViewChild('table')
], CalificationsListComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], CalificationsListComponent.prototype, "onResize", null);
CalificationsListComponent = __decorate([
    Component({
        selector: 'app-califications-list',
        templateUrl: './califications-list.component.html',
        providers: [ToastrService],
    })
], CalificationsListComponent);
export { CalificationsListComponent };
//# sourceMappingURL=califications-list.component.js.map