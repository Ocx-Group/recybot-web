import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import { ColumnMode, SelectionType, } from '@swimlane/ngx-datatable';
import { Validators, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Rol } from '@app/core/models/rol-model/rol.model';
const header = ['Id', 'Rol', 'Descripción', 'Usuarios Asociados', 'Permisos'];
let RolListComponent = class RolListComponent {
    constructor(modalService, rolService, formBuilder, toastr, clipboardService, printService, privilegeService, userService) {
        this.modalService = modalService;
        this.rolService = rolService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.clipboardService = clipboardService;
        this.printService = printService;
        this.privilegeService = privilegeService;
        this.userService = userService;
        this.countUsers = [];
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.selected = [];
        this.columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];
        this.ColumnMode = ColumnMode;
        this.SelectionType = SelectionType;
        this.submitted = false;
        this.rolGlobal = new Rol();
    }
    ngOnInit() {
        this.loadRolList();
        this.loadValidations();
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    loadValidations() {
        this.createRolForm = this.formBuilder.group({
            rol_name: ['', Validators.required],
            description: ['', Validators.required],
        });
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        if (this.table) {
            this.table.recalculate();
            this.table.recalculateColumns();
        }
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    getRowHeight(row) {
        return row.height;
    }
    loadRolList() {
        this.rolService.getAll().subscribe({
            next: (roles) => {
                this.temp = [...roles];
                this.rows = roles;
                setTimeout(() => {
                    this.loadingIndicator = false;
                }, 500);
            },
            error: (err) => {
                this.showError('Error!' + err);
            },
        });
    }
    permissionsOpenModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
    }
    createOpenModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
    }
    updateOpenModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    onAddRowSave() {
        this.submitted = true;
        if (this.createRolForm.invalid) {
            return;
        }
        let rol = new Rol();
        rol.name = this.createRolForm.value.rol_name;
        rol.description = this.createRolForm.value.description;
        this.rolService.createRol(rol).subscribe({
            next: (value) => {
                this.showSuccess('The rol was created successfully!');
                this.closeModals();
                this.loadRolList();
            },
            error: (err) => {
                this.showError('Error!' + err);
            },
        });
    }
    get create_rol_controls() {
        return this.createRolForm.controls;
    }
    onReset() {
        this.submitted = false;
        this.createRolForm.reset();
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
        this.rolService.deleteRol(value).subscribe({
            next: (value) => {
                this.deleteRecordSuccess(1);
                this.loadRolList();
            },
            error: (err) => {
                this.showError('Error!' + err);
            },
        });
    }
    deleteRecordSuccess(count) {
        this.toastr.success(count + ' Records Deleted Successfully', '');
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    clipBoardCopy() {
        var string = JSON.stringify(this.temp);
        var result = this.clipboardService.copyFromContent(string);
        if (this.temp.length === 0) {
            this.toastr.info('no data to copy');
        }
        else {
            this.toastr.success('copied ' + this.temp.length + ' rows successfully');
        }
    }
    onPrint() {
        const body = this.temp.map((items) => {
            const data = [
                items.id,
                items.name,
                items.description,
                items.associated_users,
                items.permissions,
            ];
            return data;
        });
        this.printService.print(header, body, 'Lista de Roles', false);
    }
    onCountPermissions() {
        this.privilegeService.getAllPrivileges().subscribe((result) => { });
    }
};
__decorate([
    ViewChild('table')
], RolListComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], RolListComponent.prototype, "onResize", null);
RolListComponent = __decorate([
    Component({
        selector: 'app-rol-list',
        templateUrl: './rol-list.component.html',
        providers: [ToastrService],
    })
], RolListComponent);
export { RolListComponent };
//# sourceMappingURL=rol-list.component.js.map