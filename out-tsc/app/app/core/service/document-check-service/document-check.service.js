import { __awaiter, __decorate } from "tslib";
import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { NavigationEnd } from "@angular/router";
import { filter } from "rxjs";
let DocumentCheckService = class DocumentCheckService {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event) => {
            if (event.urlAfterRedirects === '/signin') {
                if (this.checkInterval) {
                    clearInterval(this.checkInterval);
                    this.checkInterval = null;
                }
            }
        });
        this.authService.currentUserAffiliate.subscribe(user => {
            if (user && !user.card_id_authorization && !this.isOnSignInRoute()) {
                this.showDocumentCheckIfNotVisible();
                if (this.checkInterval) {
                    clearInterval(this.checkInterval);
                }
                this.checkInterval = setInterval(() => {
                    this.showDocumentCheckIfNotVisible();
                }, 120000);
            }
            else {
                if (this.checkInterval) {
                    clearInterval(this.checkInterval);
                    this.checkInterval = null;
                }
            }
        });
    }
    isOnSignInRoute() {
        return window.location.hash === '#/signin';
    }
    showDocumentCheckIfNotVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Swal.isVisible() && !this.isOnSignInRoute()) {
                yield this.showDocumentCheck();
            }
        });
    }
    showDocumentCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Swal.fire({
                title: 'IMPORTANTE',
                html: 'Confirme su información personal y verifique su identidad adjuntando una foto de su documento de identidad y un selfie. Por favor, asegúrese de que el N° de Identificación y la Fecha de nacimiento coincidan con la documentación proporcionada. Para completar esta acción, haga clic en el botón OK',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'Ok',
            });
            if (result.isConfirmed) {
                this.router.navigateByUrl('/app/edit-user');
            }
            return result;
        });
    }
};
DocumentCheckService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], DocumentCheckService);
export { DocumentCheckService };
//# sourceMappingURL=document-check.service.js.map