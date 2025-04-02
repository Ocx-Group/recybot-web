import { __decorate, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { Component, Inject, } from '@angular/core';
import { map } from 'rxjs';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
const document = window.document;
let HeaderComponent = class HeaderComponent {
    constructor(document, renderer, elementRef, rightSidebarService, configService, authService, router, languageService, configureWalletService, cartService, ticketHubService) {
        this.document = document;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.rightSidebarService = rightSidebarService;
        this.configService = configService;
        this.authService = authService;
        this.router = router;
        this.languageService = languageService;
        this.configureWalletService = configureWalletService;
        this.cartService = cartService;
        this.ticketHubService = ticketHubService;
        this.user = new UserAffiliate();
        this.subscriptions = [];
        this.config = {};
        this.isNavbarCollapsed = true;
        this.totalItem = 0;
        this.listLang = [
            { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
            { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
        ];
        this.ticketHubService.connectionEstablished.subscribe((isConnected) => {
            if (isConnected) {
                this.ticketSummaries$ = this.ticketHubService.ticketSummaries.asObservable();
                this.unreadCount$ = this.ticketSummaries$.pipe(map(summaries => summaries.reduce((acc, summary) => acc + summary.unreadMessagesCount, 0)));
                this.onLoadTickets(this.authService.currentUserAffiliateValue.id);
            }
            else {
                console.error('Waiting for connection to be established...');
            }
        });
    }
    ngOnInit() {
        this.user = this.authService.currentUserAffiliateValue;
        this.config = this.configService.configData;
        this.cartService.productList.subscribe((items) => {
            this.totalItem = items.reduce((total, item) => total + item.quantity, 0);
        });
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
    }
    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
    openConfigureWalletModal() {
        this.configureWalletService.openConfigureWalletModal();
    }
    onTicketClick(ticketId) {
        this.ticketHubService.connectionEstablished.subscribe({
            next: (e) => {
                this.ticketHubService.markTicketMessagesAsRead(ticketId)
                    .then(() => {
                    this.ticketHubService.setTicket(ticketId);
                    this.router.navigate(['app/tickets/message']).then();
                })
                    .catch(error => console.error('Error al marcar mensajes:', error));
            }, error: () => {
            }
        });
    }
    onLoadTickets(affiliateId) {
        this.ticketHubService.getTicketSummariesByAffiliateId(affiliateId)
            .catch(error => console.error('Error al cargar tickets:', error));
    }
};
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.scss'],
    }),
    __param(0, Inject(DOCUMENT))
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map