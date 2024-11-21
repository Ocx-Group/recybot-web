import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let ConfigureWalletService = class ConfigureWalletService {
    constructor(modalService) {
        this.modalService = modalService;
        this.modalOpenedSource = new Subject();
        this.modalOpened$ = this.modalOpenedSource.asObservable();
    }
    setModalContent(content) {
        this.configureWalletModal = content;
    }
    openConfigureWalletModal() {
        if (!this.configureWalletModal) {
            throw new Error('Error');
        }
        this.activeModal = this.modalService.open(this.configureWalletModal, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            centered: true
        });
        this.modalOpenedSource.next();
    }
    closeConfigureWalletModal() {
        this.activeModal.close();
    }
};
ConfigureWalletService = __decorate([
    Injectable()
], ConfigureWalletService);
export { ConfigureWalletService };
//# sourceMappingURL=configure-wallet.service.js.map