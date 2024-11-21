import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
let EmailConfirmationComponent = class EmailConfirmationComponent {
    constructor(authService, activatedRoute, router) {
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        let userName = this.activatedRoute.snapshot.params.userName;
        if (userName === null) {
            this.router.navigate(['/signin']);
        }
        this.emailConfirmation(userName);
    }
    emailConfirmation(userName) {
        this.authService.UserAffiliateEmailConfirmation(userName).subscribe((result) => {
            Swal.fire({
                title: 'Su correo electrónico ha sido confirmado correctamente.',
                showCancelButton: false,
                confirmButtonColor: '#8963ff',
                confirmButtonText: 'Ingresar',
            }).then((result) => {
                this.router.navigate(['/signin']);
            });
        }, (err) => {
            this.router.navigate(['/signin']);
        });
    }
};
EmailConfirmationComponent = __decorate([
    Component({
        selector: 'app-email-confirmation',
        templateUrl: './email.confirmation.component.html'
    })
], EmailConfirmationComponent);
export { EmailConfirmationComponent };
//# sourceMappingURL=email.confirmation.component.js.map