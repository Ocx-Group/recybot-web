import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
let MainLayoutComponent = class MainLayoutComponent {
    constructor(documentCheckService, termsConditionsService, authService, membershipManagerService, affiliateService, toast, ticketHubService) {
        this.documentCheckService = documentCheckService;
        this.termsConditionsService = termsConditionsService;
        this.authService = authService;
        this.membershipManagerService = membershipManagerService;
        this.affiliateService = affiliateService;
        this.toast = toast;
        this.ticketHubService = ticketHubService;
        this.user = new UserAffiliate();
    }
    ngOnInit() {
        this.user = this.authService.currentUserAffiliateValue;
        // if (this.user.message_alert == 0) {
        //   this.showAlert();
        // }
    }
    ngAfterViewInit() {
        // if (!this.user.termsConditions) {
        //   this.showTermsConditionsModal();
        // }
        if (this.user.activation_date == null) {
            this.showMembershipManager();
        }
    }
    showMembershipManager() {
        this.membershipManagerService.show();
    }
    showTermsConditionsModal() {
        this.termsConditionsService.show();
    }
    messageReceived() {
        this.affiliateService.updateMessageAlert(this.user.id).subscribe({
            next: (value) => {
                this.showSuccess('Mensaje recibido correctamente');
                this.authService.setUserAffiliateValue(this.user);
            },
            error: (err) => {
                this.showError('Error');
            },
        });
    }
    // showAlert() {
    //   Swal.fire({
    //     icon: "info",
    //     title: 'Habilitación de Retiros de Saldo disponible a su billetera',
    //     html: `
    //           <p>Querida familia de recycoin,</p>
    //           <p>Nos complace anunciar que el próximo martes, 23 de abril, estaremos habilitando los retiros de saldo. Esta es una oportunidad para que todos nuestros miembros puedan gestionar sus recursos de manera más efectiva dentro de nuestra plataforma.</p>
    //           <p>¡Agradecemos su paciencia y confianza en nosotros! Prepárense para realizar sus retiros.</p>
    //       `,
    //     confirmButtonText: 'OK',
    //     confirmButtonColor: '#3085d6',
    //     showCancelButton: false,
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.messageReceived();
    //     }
    //   });
    // }
    showSuccess(message) {
        this.toast.success(message);
    }
    showError(message) {
        this.toast.error(message);
    }
};
MainLayoutComponent = __decorate([
    Component({
        selector: 'app-main-layout',
        templateUrl: './main-layout.component.html',
        styleUrls: [],
    })
], MainLayoutComponent);
export { MainLayoutComponent };
//# sourceMappingURL=main-layout.component.js.map