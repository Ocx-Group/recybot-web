import { __decorate, __param } from "tslib";
import { NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, HostListener, } from '@angular/core';
import { ROUTES } from './sidebar-items';
import { Subject, takeUntil } from 'rxjs';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { Grading } from '@app/core/models/grading-model/grading.model';
let SidebarComponent = class SidebarComponent {
    constructor(document, renderer, elementRef, authService, affiliateService, gradingService, router) {
        this.document = document;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.authService = authService;
        this.affiliateService = affiliateService;
        this.gradingService = gradingService;
        this.router = router;
        this.user = new UserAffiliate();
        this.grading = new Grading();
        this.destroy$ = new Subject();
        this.headerHeight = 60;
        this.routerObj = null;
        this.routerObj = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // close sidebar on mobile screen after menu select
                this.renderer.removeClass(this.document.body, 'overlay-open');
                this.sidebbarClose();
            }
        });
    }
    windowResizecall() {
        if (window.innerWidth < 1025) {
            this.renderer.removeClass(this.document.body, 'side-closed');
        }
        this.setMenuHeight();
        this.checkStatuForResize();
    }
    onGlobalClick(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.renderer.removeClass(this.document.body, 'overlay-open');
            this.sidebbarClose();
        }
    }
    callToggleMenu(event, length) {
        if (length > 0) {
            const parentElement = event.target.closest('li');
            const activeClass = parentElement.classList.contains('active');
            if (activeClass) {
                this.renderer.removeClass(parentElement, 'active');
            }
            else {
                this.renderer.addClass(parentElement, 'active');
            }
        }
    }
    ngOnInit() {
        this.authService.currentUserAffiliate
            .pipe(takeUntil(this.destroy$))
            .subscribe((user) => {
            if (user) {
                this.user = user;
                this.refreshUserInfoData(this.user.id);
            }
        });
        if (this.user) {
            this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
        }
        this.initLeftSidebar();
        this.bodyTag = this.document.body;
    }
    ngOnDestroy() {
        this.routerObj.unsubscribe();
        this.destroy$.next(true);
        this.destroy$.complete();
    }
    initLeftSidebar() {
        const _this = this;
        // Set menu height
        _this.setMenuHeight();
        _this.checkStatuForResize();
    }
    setMenuHeight() {
        this.innerHeight = window.innerHeight;
        const height = this.innerHeight - this.headerHeight;
        this.listMaxHeight = height + '';
        this.listMaxWidth = '500px';
    }
    checkStatuForResize() {
        if (window.innerWidth < 1025) {
            this.renderer.addClass(this.document.body, 'sidebar-gone');
        }
        else {
            this.renderer.removeClass(this.document.body, 'sidebar-gone');
        }
    }
    mouseHover() {
        const body = this.elementRef.nativeElement.closest('body');
        if (body.classList.contains('submenu-closed')) {
            this.renderer.addClass(this.document.body, 'side-closed-hover');
            this.renderer.removeClass(this.document.body, 'submenu-closed');
        }
    }
    mouseOut() {
        const body = this.elementRef.nativeElement.closest('body');
        if (body.classList.contains('side-closed-hover')) {
            this.renderer.removeClass(this.document.body, 'side-closed-hover');
            this.renderer.addClass(this.document.body, 'submenu-closed');
        }
    }
    sidebbarClose() {
        if (window.innerWidth < 1025) {
            this.renderer.addClass(this.document.body, 'sidebar-gone');
        }
    }
    refreshUserInfoData(id) {
        this.affiliateService.getAffiliateById(id).subscribe({
            next: (value) => {
                this.user = value.data;
                this.getGradingInfo(this.user.external_grading_before_id);
            },
            error: () => {
            },
        });
    }
    getGradingInfo(id) {
        this.gradingService.getGradingById(id).subscribe((response) => {
            if (response.success) {
                this.grading = response.data;
            }
        });
    }
};
__decorate([
    HostListener('window:resize', ['$event'])
], SidebarComponent.prototype, "windowResizecall", null);
__decorate([
    HostListener('document:mousedown', ['$event'])
], SidebarComponent.prototype, "onGlobalClick", null);
SidebarComponent = __decorate([
    Component({
        selector: 'app-sidebar',
        templateUrl: './sidebar.component.html',
        styleUrls: ['./sidebar.component.sass'],
    }),
    __param(0, Inject(DOCUMENT))
], SidebarComponent);
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map