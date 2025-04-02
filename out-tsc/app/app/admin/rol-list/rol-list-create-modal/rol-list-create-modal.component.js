import { __decorate } from "tslib";
import { Component, ViewChild, Output, EventEmitter, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { Rol } from '@app/core/models/rol-model/rol.model';
import { ToastrService } from 'ngx-toastr';
let RolListCreateModalComponent = class RolListCreateModalComponent {
    constructor(modalService, rolService, formBuilder, toastr) {
        this.modalService = modalService;
        this.rolService = rolService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.submitted = false;
        this.rolGlobal = new Rol();
        this.loadRolList = new EventEmitter();
    }
    get create_rol_controls() {
        return this.createRolForm.controls;
    }
    ngOnInit() {
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
    createOpenModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
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
                this.loadRolList.emit();
            },
            error: (err) => {
                this.showError('Error!' + err);
            },
        });
    }
};
__decorate([
    ViewChild('rolCreateModal')
], RolListCreateModalComponent.prototype, "rolCreateModal", void 0);
__decorate([
    Output('loadRolList')
], RolListCreateModalComponent.prototype, "loadRolList", void 0);
RolListCreateModalComponent = __decorate([
    Component({
        selector: 'app-rol-list-create-modal',
        templateUrl: './rol-list-create-modal.component.html',
        providers: [ToastrService],
    })
], RolListCreateModalComponent);
export { RolListCreateModalComponent };
//# sourceMappingURL=rol-list-create-modal.component.js.map