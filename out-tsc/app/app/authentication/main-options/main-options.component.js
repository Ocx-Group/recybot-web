import { __decorate } from "tslib";
import { Component } from '@angular/core';
let MainOptionsComponent = class MainOptionsComponent {
    constructor(router, activateRoute, logoService) {
        this.router = router;
        this.activateRoute = activateRoute;
        this.logoService = logoService;
        this.logoUrl = '';
        this.userName = activateRoute.snapshot.paramMap.get('userName');
    }
    ngOnInit() {
        this.getLogoUrl();
        particlesJS.load('particles-js', 'assets/particles/particles.json', function () {
        });
    }
    backToTop() {
        this.router.navigate(['/signin']);
    }
    goToRegister() {
        this.router.navigate([`/signup/${this.userName}`]);
    }
    getLogoUrl() {
        this.logoUrl = this.logoService.getLogoSrc();
    }
};
MainOptionsComponent = __decorate([
    Component({
        selector: 'app-main-options',
        templateUrl: './main-options.component.html',
        styleUrls: ['./main-options.component.scss']
    })
], MainOptionsComponent);
export { MainOptionsComponent };
//# sourceMappingURL=main-options.component.js.map