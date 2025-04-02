import { __decorate } from "tslib";
import { Component, Input, ViewEncapsulation, Output, EventEmitter, } from '@angular/core';
let ClientUnilevelTreeComponentComponent = class ClientUnilevelTreeComponentComponent {
    constructor() {
        this.hasParent = false;
        this.loadFamilyTree = new EventEmitter();
        this.zoomOut = true;
    }
    onloadFamilyTree(id) {
        if (id !== 0) {
            this.loadFamilyTree.emit(id);
        }
    }
    onClick() {
        if (this.data && this.data.onClick) {
            this.data.onClick();
        }
    }
    toggleZoom() {
        this.zoomOut = !this.zoomOut;
    }
};
__decorate([
    Input('data')
], ClientUnilevelTreeComponentComponent.prototype, "data", void 0);
__decorate([
    Input()
], ClientUnilevelTreeComponentComponent.prototype, "hasParent", void 0);
__decorate([
    Input('nodeTemplate')
], ClientUnilevelTreeComponentComponent.prototype, "nodeTemplate", void 0);
__decorate([
    Output('loadFamilyTree')
], ClientUnilevelTreeComponentComponent.prototype, "loadFamilyTree", void 0);
ClientUnilevelTreeComponentComponent = __decorate([
    Component({
        selector: 'app-client-unilevel-tree-component',
        exportAs: 'orgChart',
        templateUrl: './client-unilevel-tree-component.component.html',
        styleUrls: ['./client-unilevel-tree-component.component.scss'],
        host: {
            '[class.ng13-org-chart-zoom-out]': 'zoomOut',
        },
        encapsulation: ViewEncapsulation.None,
    })
], ClientUnilevelTreeComponentComponent);
export { ClientUnilevelTreeComponentComponent };
//# sourceMappingURL=client-unilevel-tree-component.component.js.map