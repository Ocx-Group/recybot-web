import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import { Rol } from '@app/core/models/rol-model/rol.model';
import { User } from '@app/core/models/user-model/user.model';
let RolListSummaryModalComponent = class RolListSummaryModalComponent {
    constructor(modalService, userService, toastr) {
        this.modalService = modalService;
        this.userService = userService;
        this.toastr = toastr;
        this.rolData = new Rol();
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    summaryOpenModal(content, rol) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
        let user = new User();
        this.rolData.name = rol.name;
        this.rolData.description = rol.description;
        user.rol_id = rol.id;
        this.getUsersByRolId(user);
    }
    getUsersByRolId(user) {
        this.userService.getUsersByRolId(user).subscribe({
            next: (result) => {
                this.temp = [...result];
                this.rows = result;
                setTimeout(() => {
                    this.loadingIndicator = false;
                }, 500);
            },
            error: (err) => {
                this.showError('Error!' + err);
            },
        });
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    closeModals() {
        this.modalService.dismissAll();
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
};
__decorate([
    ViewChild('table')
], RolListSummaryModalComponent.prototype, "table", void 0);
__decorate([
    ViewChild('rolDetailModal')
], RolListSummaryModalComponent.prototype, "rolDetailModal", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], RolListSummaryModalComponent.prototype, "onResize", null);
RolListSummaryModalComponent = __decorate([
    Component({
        selector: 'app-rol-list-summary-modal',
        templateUrl: './rol-list-summary-modal.component.html',
    })
], RolListSummaryModalComponent);
export { RolListSummaryModalComponent };
//# sourceMappingURL=rol-list-summary-modal.component.js.map