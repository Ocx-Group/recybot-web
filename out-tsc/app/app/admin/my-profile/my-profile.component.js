import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
import { User } from '@app/core/models/user-model/user.model';
const header = ['Movimientos', 'IP', 'Fecha'];
let MyProfileComponent = class MyProfileComponent {
    constructor(modalService, userService, printService, clipboardService, toastr) {
        this.modalService = modalService;
        this.userService = userService;
        this.printService = printService;
        this.clipboardService = clipboardService;
        this.toastr = toastr;
        this.user = new User();
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.getCurrentUser();
        this.getUserInfo();
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
    getCurrentUser() {
        let result = localStorage.getItem('currentUserAdmin');
        let object = JSON.parse(result);
        this.userCookie = object;
    }
    getUserInfo() {
        this.userService.getUser(this.userCookie).subscribe((response) => {
            if (response.success) {
                this.user = response.data;
            }
        });
    }
    openEditPasswordUploadModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
    }
    onPrintPdf() {
        const body = this.temp.map((items) => {
            const data = [items.movements, items.ip, items.date];
            return data;
        });
        this.printService.print(header, body, 'Últimos Movimientos', false);
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
], MyProfileComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], MyProfileComponent.prototype, "onResize", null);
MyProfileComponent = __decorate([
    Component({
        selector: 'app-my-profile',
        templateUrl: './my-profile.component.html',
    })
], MyProfileComponent);
export { MyProfileComponent };
//# sourceMappingURL=my-profile.component.js.map