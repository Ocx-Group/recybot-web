import { __decorate } from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
let LogoComponent = class LogoComponent {
    constructor(logoService) {
        this.logoService = logoService;
        this.logoClass = '';
        this.subscription = this.logoService.isDarkTheme$.subscribe(isDark => {
            this.logoSrc = this.logoService.getLogoSrc();
        });
    }
    ngOnInit() {
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
__decorate([
    Input()
], LogoComponent.prototype, "logoClass", void 0);
LogoComponent = __decorate([
    Component({
        selector: 'app-logo',
        templateUrl: './logo.component.html',
        styleUrls: ['./logo.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], LogoComponent);
export { LogoComponent };
//# sourceMappingURL=logo.component.js.map