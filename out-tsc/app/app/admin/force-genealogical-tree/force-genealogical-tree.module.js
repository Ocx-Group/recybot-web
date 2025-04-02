import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForceGenealogicalTreeComponent } from './force-genealogical-tree-component/force-genealogical-tree.component';
import { PageForceGenealogicalTreeComponent } from './page/page-force-genealogical-tree.component';
import { TranslateModule } from '@ngx-translate/core';
let ForceGenealogicalTreeModule = class ForceGenealogicalTreeModule {
};
ForceGenealogicalTreeModule = __decorate([
    NgModule({
        declarations: [
            ForceGenealogicalTreeComponent,
            PageForceGenealogicalTreeComponent,
        ],
        imports: [CommonModule, TranslateModule],
    })
], ForceGenealogicalTreeModule);
export { ForceGenealogicalTreeModule };
//# sourceMappingURL=force-genealogical-tree.module.js.map