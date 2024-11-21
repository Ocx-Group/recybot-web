import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { Grading } from '@app/core/models/grading-model/grading.model';
const header = ['Movimientos', 'IP', 'Fecha'];
let MyProfileComponent = class MyProfileComponent {
    constructor(modalService, printService, clipboardService, toastr, authService, gradingService, affiliateService) {
        this.modalService = modalService;
        this.printService = printService;
        this.clipboardService = clipboardService;
        this.toastr = toastr;
        this.authService = authService;
        this.gradingService = gradingService;
        this.affiliateService = affiliateService;
        this.user = new UserAffiliate();
        this.grading = new Grading();
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
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
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    getUserInfo() {
        this.userCookie = this.authService.currentUserAffiliateValue;
        this.affiliateService.getAffiliateById(this.userCookie.id).subscribe((response) => {
            if (response.success) {
                this.user = response.data;
                this.getGradingInfo(this.user.external_grading_before_id);
                this.loadLoginMovements();
            }
        });
    }
    getGradingInfo(id) {
        this.gradingService.getGradingById(id).subscribe((response) => {
            if (response.success) {
                this.grading = response.data;
            }
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
    loadLoginMovements() {
        this.authService.getLoginMovementsByAffiliatedId(this.user.id).subscribe({
            next: (response) => {
                console.log(response);
                if (response !== null) {
                    this.temp = response;
                    this.rows = [...response];
                }
                this.loadingIndicator = false;
            },
            error: (error) => {
                this.toastr.error('Error loading movements');
                this.loadingIndicator = false;
            }
        });
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