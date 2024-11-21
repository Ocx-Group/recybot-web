import { __decorate, __param } from "tslib";
import { NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, } from '@angular/core';
import { ROUTESADMIN } from './sidebar-admin-items';
import { User } from '@app/core/models/user-model/user.model';
import { Subject, takeUntil } from 'rxjs';
let SidebarAdminComponent = class SidebarAdminComponent {
    constructor(document, renderer, elementRef, authService, router, userService) {
        this.document = document;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.authService = authService;
        this.router = router;
        this.userService = userService;
        this.user = new User();
        this.headerHeight = 60;
        this.routerObj = null;
        this.destroy$ = new Subject();
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
        this.authService.currentUserAdmin
            .pipe(takeUntil(this.destroy$))
            .subscribe((user) => {
            if (user) {
                this.user = user;
                this.getUserInfo();
            }
        });
        if (this.authService.currentUserAdminValue) {
            this.sidebarItems = ROUTESADMIN.filter((sidebarItem) => sidebarItem);
        }
        this.initLeftSidebar();
        this.bodyTag = this.document.body;
        this.getCurrentUser();
        this.getUserInfo();
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
    getCurrentUser() {
        let result = localStorage.getItem('currentUserAdmin');
        this.userCookie = JSON.parse(result);
    }
    getUserInfo() {
        this.userService.getUser(this.user).subscribe((response) => {
            if (response.success) {
                this.user = response.data;
            }
        });
    }
};
__decorate([
    HostListener('window:resize', ['$event'])
], SidebarAdminComponent.prototype, "windowResizecall", null);
__decorate([
    HostListener('document:mousedown', ['$event'])
], SidebarAdminComponent.prototype, "onGlobalClick", null);
SidebarAdminComponent = __decorate([
    Component({
        selector: 'app-sidebar-admin',
        templateUrl: './sidebar-admin.component.html',
        styleUrls: ['./sidebar-admin.component.sass'],
    }),
    __param(0, Inject(DOCUMENT))
], SidebarAdminComponent);
export { SidebarAdminComponent };
//# sourceMappingURL=sidebar-admin.component.js.map