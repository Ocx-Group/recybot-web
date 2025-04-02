import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
const header = ['Usuario', 'Rol', 'Nombre', 'Apellido', 'Correo'];
let UsersListComponent = class UsersListComponent {
    constructor(userService, modalService, toastr, clipboardService, printService, rolService) {
        this.userService = userService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.clipboardService = clipboardService;
        this.printService = printService;
        this.rolService = rolService;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.items = [];
    }
    ngOnInit() {
        this.onFillDropdownRol();
        this.loadUserList();
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.table.recalculate();
        this.table.recalculateColumns();
    }
    getRowHeight(row) {
        return row.height;
    }
    loadUserList() {
        this.userService.getAll().subscribe({
            next: (value) => {
                this.temp = [...value];
                this.rows = value;
                setTimeout(() => {
                    this.loadingIndicator = false;
                }, 500);
            },
            error: (err) => {
                this.showError('Error!' + err);
            },
        });
    }
    createOpenModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    onFillDropdownRol() {
        this.rolService.getAll().subscribe({
            next: (roles) => {
                for (const result of roles) {
                    this.items.push(result);
                }
            },
            error: (err) => {
                this.showError('Error!' + err);
            },
        });
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
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
        this.userService.deleteUser(value).subscribe({
            next: (resp) => {
                this.deleteRecordSuccess(1);
                this.loadUserList();
            },
            error: (err) => {
                this.showError('Error!' + err);
            },
        });
    }
    deleteRecordSuccess(count) {
        this.toastr.success(count + ' Records Deleted Successfully', '');
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
    onPrint() {
        const body = this.temp.map((items) => {
            const data = [
                items.user_name,
                items.rol_name,
                items.name,
                items.last_name,
                items.email,
            ];
            return data;
        });
        this.printService.print(header, body, 'Lista de Usuarios', false);
    }
};
__decorate([
    ViewChild('table')
], UsersListComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], UsersListComponent.prototype, "onResize", null);
UsersListComponent = __decorate([
    Component({
        selector: 'app-users-list',
        templateUrl: './users-list.component.html',
        providers: [ToastrService],
    })
], UsersListComponent);
export { UsersListComponent };
//# sourceMappingURL=users-list.component.js.map