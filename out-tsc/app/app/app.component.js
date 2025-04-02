import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { NavigationStart, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
let AppComponent = class AppComponent {
    constructor(_router, location, sessionService, renderer, document) {
        this._router = _router;
        this.sessionService = sessionService;
        this.renderer = renderer;
        this.document = document;
        this._router.events.subscribe((routerEvent) => {
            if (routerEvent instanceof NavigationStart) {
                this.currentUrl = routerEvent.url.substring(routerEvent.url.lastIndexOf('/') + 1);
            }
            if (routerEvent instanceof NavigationEnd) {
            }
            window.scrollTo(0, 0);
        });
    }
    ngOnInit() {
        this.changeFavicon('assets/images/favicon.ico');
    }
    changeFavicon(url) {
        const link = this.document.querySelector("#favicon");
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = url;
        this.renderer.appendChild(this.document.head, link);
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss'],
    }),
    __param(4, Inject(DOCUMENT))
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map