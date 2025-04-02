import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PageBinaryGenealogicalTreeComponent = class PageBinaryGenealogicalTreeComponent {
    constructor(router, affiliateService, spinnerService, toastr, activatedRoute) {
        this.router = router;
        this.affiliateService = affiliateService;
        this.spinnerService = spinnerService;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.tree = {
            id: 0,
            user_name: '',
            image: '',
            children: [],
        };
        this.showDiv = false;
        this.typeSelected = 'cube-transition';
    }
    ngOnInit() {
        this.userId = this.activatedRoute.snapshot.params.id;
        this.onloadFamilyTree(this.userId);
    }
    onloadFamilyTree(id) {
        this.showDiv = false;
        this.spinnerService.show();
        this.tree = {
            id: 0,
            user_name: '',
            image: '',
            children: [],
        };
        this.affiliateService.getBinaryTree(id).subscribe((users) => {
            if (users !== null) {
                this.tree = users;
                setTimeout(() => {
                    this.spinnerService.hide();
                    this.showDiv = true;
                }, 500);
            }
        });
    }
};
PageBinaryGenealogicalTreeComponent = __decorate([
    Component({
        selector: 'app-page-binary-genealogical-tree',
        templateUrl: './page-binary-genealogical-tree.component.html',
        styleUrls: ['./page-binary-genealogical-tree.component.scss'],
    })
], PageBinaryGenealogicalTreeComponent);
export { PageBinaryGenealogicalTreeComponent };
//# sourceMappingURL=page-binary-genealogical-tree.component.js.map