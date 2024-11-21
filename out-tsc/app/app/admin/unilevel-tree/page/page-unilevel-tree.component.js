import { __decorate } from "tslib";
import { Component } from '@angular/core';
import 'perfect-scrollbar';
let PageUnilevelTreeComponent = class PageUnilevelTreeComponent {
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
        this.affiliateService.getUniLevelTree(id).subscribe((users) => {
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
PageUnilevelTreeComponent = __decorate([
    Component({
        selector: 'app-page-unilevel-tree',
        templateUrl: './page-unilevel-tree.component.html',
        styleUrls: ['./page-unilevel-tree.component.scss'],
    })
], PageUnilevelTreeComponent);
export { PageUnilevelTreeComponent };
//# sourceMappingURL=page-unilevel-tree.component.js.map