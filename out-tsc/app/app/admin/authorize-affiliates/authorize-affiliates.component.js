import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
const ALERTS = [
    {
        type: 'info',
        message: '',
    },
];
const header = [
    'Id',
    'User',
    'Email',
    'Identity',
    'Register Day',
    'Father',
    'Sponsor',
    'Binary Sponsor',
];
let AuthorizeAffiliatesComponent = class AuthorizeAffiliatesComponent {
    constructor(toastr, clipboardService, printService, affiliateService, modalService) {
        this.toastr = toastr;
        this.clipboardService = clipboardService;
        this.printService = printService;
        this.affiliateService = affiliateService;
        this.modalService = modalService;
        this.show = true;
        this.linkMsj = 'hide';
        this.rows = [];
        this.temp = [];
        this.approvedArray = [];
        this.disapprovedArray = [];
        this.loadingIndicator = true;
        this.approvedSelectAll = false;
        this.disApprovedSelectAll = false;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.alerts = Array.from(ALERTS);
    }
    ngOnInit() {
        this.loadAffiliateList();
    }
    loadAffiliateList() {
        this.affiliateService.getAllAffiliatesAuthorization().subscribe((affiliates) => {
            if (affiliates !== null) {
                this.temp = [...affiliates];
                this.rows = affiliates;
            }
            setTimeout(() => {
                this.loadingIndicator = false;
            }, 500);
        });
    }
    openModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.table.recalculate();
        this.table.recalculateColumns();
    }
    setApprovedArray(id) {
        let index = this.disapprovedArray.indexOf(id);
        if (index > -1) {
            this.disapprovedArray.splice(index, 1);
        }
        this.approvedArray.push(id);
    }
    setdisapprovedArray(id) {
        let index = this.approvedArray.indexOf(id);
        if (index > -1) {
            this.approvedArray.splice(index, 1);
        }
        this.disapprovedArray.push(id);
    }
    selectionProcess() {
        if (this.approvedArray.length === 0 && this.disapprovedArray.length === 0) {
            this.showError('You must select at least one user to be processed!');
        }
        this.affiliateService
            .authorizationAffiliates(this.approvedArray, this.disapprovedArray)
            .subscribe((response) => {
            if (response.success) {
                this.showSuccess('The affiliations have been processed successfully!');
                this.loadAffiliateList();
            }
            else {
                this.showError('Error!');
            }
        });
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    fillApprovedArray() {
        this.disapprovedArray = [];
        this.rows.forEach((item) => {
            this.approvedArray.push(item.id);
        });
        this.approvedSelectAll = true;
        this.disApprovedSelectAll = false;
    }
    fillDisapprovedArray() {
        this.approvedArray = [];
        this.rows.forEach((item) => {
            this.disapprovedArray.push(item.id);
        });
        this.approvedSelectAll = false;
        this.disApprovedSelectAll = true;
    }
    getRowHeight(row) {
        return row.height;
    }
    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/admin/authorize-affiliates-data.json`);
        req.onload = () => {
            cb(JSON.parse(req.response));
        };
        req.send();
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    close(alert) {
        this.alerts.splice(this.alerts.indexOf(alert), 1);
    }
    showMsj() {
        if (this.show) {
            this.show = false;
            this.linkMsj = 'show';
        }
        else {
            this.show = true;
            this.linkMsj = 'hide';
        }
    }
    clipBoardCopy() {
        const extractData = this.temp.map((items) => {
            const data = [
                items.id,
                items.user,
                items.email,
                items.identity,
                items.dateRegister,
                items.father,
                items.sponsor,
                items.binarySponsor,
            ];
            return data;
        });
        var string = JSON.stringify(extractData);
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
                items.user,
                items.email,
                items.identity,
                items.dateRegister,
                items.father,
                items.sponsor,
                items.binarySponsor,
            ];
            return data;
        });
        this.printService.print(header, body, 'Lista de Afiliados Autorizados', false);
    }
};
__decorate([
    ViewChild('table')
], AuthorizeAffiliatesComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], AuthorizeAffiliatesComponent.prototype, "onResize", null);
AuthorizeAffiliatesComponent = __decorate([
    Component({
        selector: 'app-authorize-affiliates',
        templateUrl: './authorize-affiliates.component.html',
        providers: [ToastrService],
    })
], AuthorizeAffiliatesComponent);
export { AuthorizeAffiliatesComponent };
//# sourceMappingURL=authorize-affiliates.component.js.map