import { __decorate } from "tslib";
import { Validators } from '@angular/forms';
import { Component, ViewChild, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
const header = ['Grupo de Calculo', 'Descripción', 'Fecha de Registro'];
let CalculationGroupsComponent = class CalculationGroupsComponent {
    constructor(modalService, paymentGroupService, toastr, formBuilder, printService, clipboardService) {
        this.modalService = modalService;
        this.paymentGroupService = paymentGroupService;
        this.toastr = toastr;
        this.formBuilder = formBuilder;
        this.printService = printService;
        this.clipboardService = clipboardService;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadCalculationList();
        this.loadValidations();
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
            size: 'lg',
        });
    }
    editOpenModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    loadValidations() {
        this.createCalculationForm = this.formBuilder.group({
            calculation_name: ['', Validators.required],
            description: ['', Validators.required],
        });
    }
    loadCalculationList() {
        this.paymentGroupService
            .getAll()
            .subscribe((paymentGroups) => {
            if (paymentGroups !== null) {
                this.temp = [...paymentGroups];
                this.rows = paymentGroups;
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
    deleteRecord(value) {
        this.paymentGroupService.delete(value).subscribe((response) => {
            if (response.success) {
                this.deleteRecordSuccess(1);
                this.loadCalculationList();
            }
        });
    }
    deleteRecordSuccess(count) {
        this.toastr.success(count + ' Records Deleted Successfully', '');
    }
    onPrint() {
        const body = this.temp.map((items) => {
            const data = [items.name, items.description, items.createdAt];
            return data;
        });
        this.printService.print(header, body, 'Lista Grupos de Calculo', false);
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
};
__decorate([
    ViewChild('table')
], CalculationGroupsComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], CalculationGroupsComponent.prototype, "onResize", null);
CalculationGroupsComponent = __decorate([
    Component({
        selector: 'app-calculation-groups',
        templateUrl: './calculation-groups.component.html',
        providers: [ToastrService],
    })
], CalculationGroupsComponent);
export { CalculationGroupsComponent };
//# sourceMappingURL=calculation-groups.component.js.map