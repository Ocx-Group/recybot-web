import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
// Select some icons (use an object, not an array)
let IconsModule = class IconsModule {
};
IconsModule = __decorate([
    NgModule({
        imports: [FeatherModule.pick(allIcons)],
        exports: [FeatherModule],
    })
], IconsModule);
export { IconsModule };
//# sourceMappingURL=feather-icons.module.js.map