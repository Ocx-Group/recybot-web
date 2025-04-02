import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
const header = ['Nombre del Incentivo', 'Descripción', 'Estado de Incentivo', 'Fecha de Registro'];
let IncentivesListComponent = class IncentivesListComponent {
    constructor(modalService, incentiveService, printService, clipboardService, toastr) {
        this.modalService = modalService;
        this.incentiveService = incentiveService;
        this.printService = printService;
        this.clipboardService = clipboardService;
        this.toastr = toastr;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadIncentiveList();
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.table.recalculate();
        this.table.recalculateColumns();
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
    loadIncentiveList() {
        this.incentiveService.getAll().subscribe((resp) => {
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
                items.status === 1 ? 'Activo' : 'Inactivo',
                items.created_at
            ];
            return data;
        });
        this.printService.print(header, body, 'Lista de Incentivos', false);
    }
    clipBoardCopy() {
        var string = JSON.stringify(this.temp);
        var result = this.clipboardService.copyFromContent(string);
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
        this.incentiveService.delete(id).subscribe((response) => {
            if (response.success) {
                this.deleteRecordSuccess(1);
                this.loadIncentiveList();
            }
        });
    }
};
__decorate([
    ViewChild('table')
], IncentivesListComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], IncentivesListComponent.prototype, "onResize", null);
IncentivesListComponent = __decorate([
    Component({
        selector: 'app-incentives-list',
        templateUrl: './incentives-list.component.html',
        providers: [ToastrService],
    })
], IncentivesListComponent);
export { IncentivesListComponent };
//# sourceMappingURL=incentives-list.component.js.map