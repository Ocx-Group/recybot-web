import { __decorate } from "tslib";
import { Component, Input, ViewEncapsulation, Output, EventEmitter, } from '@angular/core';
let BinaryGenealogicalTreeComponent = class BinaryGenealogicalTreeComponent {
    constructor() {
        this.hasParent = false;
        this.loadFamilyTree = new EventEmitter();
        this.zoomOut = false;
    }
    onloadFamilyTree(id) {
        if (id !== 0) {
            this.loadFamilyTree.emit(id);
        }
    }
};
__decorate([
    Input('data')
], BinaryGenealogicalTreeComponent.prototype, "data", void 0);
__decorate([
    Input()
], BinaryGenealogicalTreeComponent.prototype, "hasParent", void 0);
__decorate([
    Input('nodeTemplate')
], BinaryGenealogicalTreeComponent.prototype, "nodeTemplate", void 0);
__decorate([
    Output('loadFamilyTree')
], BinaryGenealogicalTreeComponent.prototype, "loadFamilyTree", void 0);
BinaryGenealogicalTreeComponent = __decorate([
    Component({
        selector: 'app-binary-genealogical-tree',
        exportAs: 'orgChart',
        templateUrl: './binary-genealogical-tree.component.html',
        styleUrls: ['./binary-genealogical-tree.component.scss'],
        host: {
            '[class.ng13-org-chart-zoom-out]': 'zoomOut',
        },
        encapsulation: ViewEncapsulation.None,
    })
], BinaryGenealogicalTreeComponent);
export { BinaryGenealogicalTreeComponent };
//# sourceMappingURL=binary-genealogical-tree.component.js.map