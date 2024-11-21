import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '@app/core/models/user-model/user.model';
let UsersListDetailModalComponent = class UsersListDetailModalComponent {
    constructor(modalService, toastr, clipboardService) {
        this.modalService = modalService;
        this.toastr = toastr;
        this.clipboardService = clipboardService;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.user = new User();
    }
    detailOpenModal(content, user) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
        this.user = user;
    }
    clipBoardCopy() {
        var string = JSON.stringify(this.temp);
        var result = this.clipboardService.copyFromContent(string);
        if (this.temp.length === 0) {
            this.toastr.info('No data to copy');
        }
        else {
            this.toastr.success('Copied ' + this.temp.length + 'rows succesfully');
        }
    }
};
__decorate([
    ViewChild('userDetailModal')
], UsersListDetailModalComponent.prototype, "userDetailModal", void 0);
UsersListDetailModalComponent = __decorate([
    Component({
        selector: 'app-users-list-detail-modal',
        templateUrl: './users-list-detail-modal.component.html',
        providers: [ToastrService],
    })
], UsersListDetailModalComponent);
export { UsersListDetailModalComponent };
//# sourceMappingURL=users-list-detail-modal.component.js.map