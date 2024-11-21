import { __decorate } from "tslib";
import { Component } from '@angular/core';
import 'perfect-scrollbar';
let ViewUnilevelTreeComponent = class ViewUnilevelTreeComponent {
    constructor(authService, spinnerService, affiliateService) {
        this.authService = authService;
        this.spinnerService = spinnerService;
        this.affiliateService = affiliateService;
        this.btnBack = false;
        this.tree = {
            id: 0,
            userName: '',
            image: '',
            children: [],
        };
        this.showDiv = false;
        this.typeSelected = 'cube-transition';
    }
    ngOnInit() {
        this.active = 1;
        this.user = this.authService.currentUserAffiliateValue;
        this.userId = this.user.id;
        if (this.userId) {
            this.onloadFamilyTree(this.userId);
            this.btnBack = false;
        }
    }
    onloadFamilyTree(id) {
        this.showDiv = false;
        this.spinnerService.show();
        this.btnBack = true;
        switch (this.active) {
            case 1:
                this.affiliateService.getUniLevelTree(id).subscribe((users) => {
                    if (users !== null) {
                        console.log(users);
                        this.tree = users;
                        setTimeout(() => {
                            this.spinnerService.hide();
                            this.showDiv = true;
                        }, 500);
                    }
                }, error => {
                    this.spinnerService.hide();
                });
                break;
            case 2:
                this.affiliateService.getBinaryTree(id).subscribe((users) => {
                    if (users !== null) {
                        console.log(users);
                        this.tree = users;
                        setTimeout(() => {
                            this.spinnerService.hide();
                            this.showDiv = true;
                        }, 500);
                    }
                }, error => {
                    this.spinnerService.hide();
                });
                break;
            case 3:
                this.affiliateService.getTreeModel5(id).subscribe((users) => {
                    if (users !== null) {
                        console.log(users);
                        this.tree = users;
                        setTimeout(() => {
                            this.spinnerService.hide();
                            this.showDiv = true;
                        }, 500);
                    }
                }, error => {
                    this.spinnerService.hide();
                });
                break;
            case 4:
                this.affiliateService.getTreeModel6(id).subscribe((users) => {
                    if (users !== null) {
                        console.log(users);
                        this.tree = users;
                        setTimeout(() => {
                            this.spinnerService.hide();
                            this.showDiv = true;
                        }, 500);
                    }
                }, error => {
                    this.spinnerService.hide();
                });
                break;
        }
    }
    onTabChange(newActiveId) {
        this.active = newActiveId;
        this.onloadFamilyTree(this.userId);
        this.btnBack = false;
    }
};
ViewUnilevelTreeComponent = __decorate([
    Component({
        selector: 'app-view-unilevel-tree',
        templateUrl: './view-unilevel-tree.component.html',
        styleUrls: ['./view-unilevel-tree.component.scss'],
    })
], ViewUnilevelTreeComponent);
export { ViewUnilevelTreeComponent };
//# sourceMappingURL=view-unilevel-tree.component.js.map