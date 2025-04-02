import { __decorate, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { Component, Inject, } from '@angular/core';
import { User } from '@app/core/models/user-model/user.model';
import { map } from "rxjs";
const document = window.document;
let HeaderAdminComponent = class HeaderAdminComponent {
    constructor(document, renderer, elementRef, rightSidebarService, configService, authService, router, languageService, ticketHubService) {
        this.document = document;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.rightSidebarService = rightSidebarService;
        this.configService = configService;
        this.authService = authService;
        this.router = router;
        this.languageService = languageService;
        this.ticketHubService = ticketHubService;
        this.user = new User();
        this.config = {};
        this.isNavbarCollapsed = true;
        this.listLang = [
            { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
            { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
        ];
        this.ticketHubService.connectionEstablished.subscribe((isConnected) => {
            if (isConnected) {
                this.ticketSummaries$ = this.ticketHubService.ticketSummaries.asObservable();
                this.unreadCount$ = this.ticketSummaries$.pipe(map(summaries => summaries.reduce((acc, summary) => acc + summary.unreadMessagesCount, 0)));
                this.onLoadAllTickets();
            }
            else {
                console.error('Waiting for connection to be established...');
            }
        });
    }
    ngOnInit() {
        this.config = this.configService.configData;
        this.langStoreValue = localStorage.getItem('lang');
        const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
        this.countryName = val.map((element) => element.text);
        if (val.length === 0) {
            if (this.flagvalue === undefined) {
                this.defaultFlag = 'assets/images/flags/us.jpg';
            }
        }
        else {
            this.flagvalue = val.map((element) => element.flag);
        }
        this.getCurrentUser();
    }
    ngAfterViewInit() {
        // set theme on startup
        if (localStorage.getItem('theme')) {
            this.renderer.removeClass(this.document.body, this.config.layout.variant);
            this.renderer.addClass(this.document.body, localStorage.getItem('theme'));
        }
        else {
            this.renderer.addClass(this.document.body, this.config.layout.variant);
        }
        if (localStorage.getItem('menuOption')) {
            this.renderer.addClass(this.document.body, localStorage.getItem('menuOption'));
        }
        else {
            this.renderer.addClass(this.document.body, this.config.layout.sidebar.backgroundColor + '-sidebar');
        }
        if (localStorage.getItem('sidebar_status')) {
            if (localStorage.getItem('sidebar_status') === 'close') {
                this.renderer.addClass(this.document.body, 'side-closed');
                this.renderer.addClass(this.document.body, 'submenu-closed');
            }
            else {
                this.renderer.removeClass(this.document.body, 'side-closed');
                this.renderer.removeClass(this.document.body, 'submenu-closed');
            }
        }
        else {
            if (this.config.layout.sidebar.collapsed === true) {
                this.renderer.addClass(this.document.body, 'side-closed');
                this.renderer.addClass(this.document.body, 'submenu-closed');
            }
        }
    }
    setLanguage(text, lang, flag) {
        this.countryName = text;
        this.flagvalue = flag;
        this.langStoreValue = lang;
        this.languageService.setLanguage(lang);
    }
    mobileMenuSidebarOpen(event, className) {
        if (window.innerWidth < 1025) {
            const hasClass = event.target.classList.contains(className);
            if (hasClass) {
                this.renderer.removeClass(this.document.body, className);
                this.renderer.addClass(this.document.body, 'sidebar-gone');
            }
            else {
                this.renderer.addClass(this.document.body, className);
                this.renderer.removeClass(this.document.body, 'sidebar-gone');
            }
        }
        else {
            const hasClass = this.document.body.classList.contains('side-closed');
            if (hasClass) {
                this.renderer.removeClass(this.document.body, 'side-closed');
                this.renderer.removeClass(this.document.body, 'submenu-closed');
            }
            else {
                this.renderer.addClass(this.document.body, 'side-closed');
                this.renderer.addClass(this.document.body, 'submenu-closed');
            }
        }
    }
    toggleRightSidebar() {
        this.rightSidebarService.sidebarState.subscribe((isRunning) => {
            this.isOpenSidebar = isRunning;
        });
        this.rightSidebarService.setRightSidebar((this.isOpenSidebar = !this.isOpenSidebar));
    }
    logout() {
        this.authService.logoutUser().subscribe((res) => {
            if (!res.success) {
                this.router.navigate(['/signin']).then();
            }
        });
    }
    getCurrentUser() {
        this.user = this.authService.currentUserAdminValue;
    }
    onTicketClick(ticketId) {
        this.ticketHubService.connectionEstablished.subscribe({
            next: (e) => {
                this.ticketHubService.markTicketMessagesAsRead(ticketId)
                    .then(() => {
                    this.ticketHubService.setTicket(ticketId);
                    this.router.navigate(['admin/ticket-for-admin/message']).then();
                })
                    .catch(error => console.error('Error al marcar mensajes:', error));
            }, error: () => {
            }
        });
    }
    onLoadAllTickets() {
        this.ticketHubService.getAllTicketSummaries()
            .catch(error => console.error('Error al cargar tickets:', error));
    }
};
HeaderAdminComponent = __decorate([
    Component({
        selector: 'app-header-admin',
        templateUrl: './header-admin.component.html',
        styleUrls: ['./header-admin.component.sass'],
    }),
    __param(0, Inject(DOCUMENT))
], HeaderAdminComponent);
export { HeaderAdminComponent };
//# sourceMappingURL=header-admin.component.js.map