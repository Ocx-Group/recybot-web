import { __decorate } from "tslib";
import { Component, Input, ViewEncapsulation, Output, EventEmitter, } from '@angular/core';
let UnilevelTreeComponentComponent = class UnilevelTreeComponentComponent {
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
], UnilevelTreeComponentComponent.prototype, "data", void 0);
__decorate([
    Input()
], UnilevelTreeComponentComponent.prototype, "hasParent", void 0);
__decorate([
    Input('nodeTemplate')
], UnilevelTreeComponentComponent.prototype, "nodeTemplate", void 0);
__decorate([
    Output('loadFamilyTree')
], UnilevelTreeComponentComponent.prototype, "loadFamilyTree", void 0);
UnilevelTreeComponentComponent = __decorate([
    Component({
        selector: 'app-unilevel-tree-component',
        exportAs: 'orgChart',
        templateUrl: './unilevel-tree-component.component.html',
        styleUrls: ['./unilevel-tree-component.component.scss'],
        host: {
            '[class.ng13-org-chart-zoom-out]': 'zoomOut',
        },
        encapsulation: ViewEncapsulation.None,
    })
], UnilevelTreeComponentComponent);
export { UnilevelTreeComponentComponent };
//# sourceMappingURL=unilevel-tree-component.component.js.map