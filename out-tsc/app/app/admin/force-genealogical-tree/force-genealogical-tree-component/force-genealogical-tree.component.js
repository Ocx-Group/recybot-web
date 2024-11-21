import { __decorate } from "tslib";
import { Component, Input, ViewEncapsulation, } from '@angular/core';
let ForceGenealogicalTreeComponent = class ForceGenealogicalTreeComponent {
    constructor() {
        this.hasParent = false;
        this.zoomOut = false;
    }
    onClick() {
        if (this.data && this.data.onClick) {
            this.data.onClick();
        }
    }
};
__decorate([
    Input('data')
], ForceGenealogicalTreeComponent.prototype, "data", void 0);
__decorate([
    Input()
], ForceGenealogicalTreeComponent.prototype, "hasParent", void 0);
__decorate([
    Input('nodeTemplate')
], ForceGenealogicalTreeComponent.prototype, "nodeTemplate", void 0);
ForceGenealogicalTreeComponent = __decorate([
    Component({
        selector: 'app-force-genealogical-tree',
        exportAs: 'orgChart',
        templateUrl: './force-genealogical-tree.component.html',
        styleUrls: ['./force-genealogical-tree.component.scss'],
        host: {
            '[class.ng13-org-chart-zoom-out]': 'zoomOut',
        },
        encapsulation: ViewEncapsulation.None,
    })
], ForceGenealogicalTreeComponent);
export { ForceGenealogicalTreeComponent };
//# sourceMappingURL=force-genealogical-tree.component.js.map