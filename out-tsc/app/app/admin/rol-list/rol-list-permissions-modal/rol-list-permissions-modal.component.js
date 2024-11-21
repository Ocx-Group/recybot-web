import { __decorate } from "tslib";
import { Component, ViewChild, HostListener, } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SelectionType, } from '@swimlane/ngx-datatable';
import { Rol } from '@app/core/models/rol-model/rol.model';
import { Privilege } from '@app/core/models/privilege-model/privilege.model';
let RolListPermissionsModalComponent = class RolListPermissionsModalComponent {
    constructor(modalService, privilegeService, toastr) {
        this.modalService = modalService;
        this.privilegeService = privilegeService;
        this.toastr = toastr;
        this.title = '';
        this.rol = new Rol();
        this.rows = [];
        this.temp = [];
        this.SelectionType = SelectionType;
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.selected = [];
    }
    ngOnInit() { }
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
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    loadPermissionsList(rolId) {
        this.privilegeService.getMenuConfigurations(rolId).subscribe({
            next: (menuConfiguration) => {
                this.temp = [...menuConfiguration];
                this.rows = menuConfiguration;
                setTimeout(() => {
                    this.loadingIndicator = false;
                }, 500);
            },
            error: (err) => {
                this.showError('Error!' + err);
            },
        });
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        // filter our data
        if (this.temp && this.table) {
            const temp = this.temp.filter((d) => {
                var _a;
                return ((_a = d.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().indexOf(val)) !== -1 || !val;
            });
            this.rows = temp;
            this.table.offset = 0;
        }
    }
    updateOrcreatePrivilege(menu) {
        let privilege = new Privilege();
        privilege.menu_configuration_id = menu.menu_configuration_id;
        privilege.rol_id = this.idRole;
        privilege.can_create = menu.can_create;
        privilege.can_edit = menu.can_edit;
        privilege.can_delete = menu.can_delete;
        privilege.can_read = menu.can_read;
        if (menu.privilege_id === null) {
            this.privilegeService.createPrivilege(privilege).subscribe({
                next: (value) => {
                    this.loadPermissionsList(privilege.rol_id);
                },
                error: (err) => {
                    this.showError('Error!' + err);
                },
            });
        }
        else {
            privilege.id = menu.privilege_id;
            this.privilegeService.updatePrivilege(privilege).subscribe({
                next: (value) => {
                    this.loadPermissionsList(privilege.rol_id);
                },
                error: (err) => {
                    this.showError('Error!' + err);
                },
            });
        }
    }
    permissionsOpenModal(content, rol) {
        this.loadPermissionsList(rol.id);
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
        this.title = rol.name;
        this.idRole = rol.id;
    }
    closeModals() {
        this.modalService.dismissAll();
    }
};
__decorate([
    ViewChild('table')
], RolListPermissionsModalComponent.prototype, "table", void 0);
__decorate([
    ViewChild('permissionsCreateModal')
], RolListPermissionsModalComponent.prototype, "permissionsCreateModal", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], RolListPermissionsModalComponent.prototype, "onResize", null);
RolListPermissionsModalComponent = __decorate([
    Component({
        selector: 'app-rol-list-permissions-modal',
        templateUrl: './rol-list-permissions-modal.component.html',
        providers: [ToastrService],
    })
], RolListPermissionsModalComponent);
export { RolListPermissionsModalComponent };
//# sourceMappingURL=rol-list-permissions-modal.component.js.map