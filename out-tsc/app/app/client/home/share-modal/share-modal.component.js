import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
let ShareModalComponent = class ShareModalComponent {
    constructor(modalService) {
        this.modalService = modalService;
    }
    openShareModal(url) {
        navigator.clipboard.writeText(url);
        this.inlineShareButtonsConfig = this.createShareConfig(url);
        this.modalService.open(this.modalContent, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            centered: true,
        });
    }
    createShareConfig(url) {
        return {
            alignment: 'center',
            color: 'social',
            enabled: true,
            font_size: 15,
            labels: 'counts',
            language: 'en',
            networks: [
                'whatsapp',
                'linkedin',
                'messenger',
                'facebook',
                'twitter',
                'telegram',
                'pinterest',
                'reddit',
                'tumblr',
                'vk',
                'email'
            ],
            padding: 5,
            radius: 4,
            show_total: true,
            size: 80,
            url: url
        };
    }
};
__decorate([
    ViewChild('shareModal', { static: true })
], ShareModalComponent.prototype, "modalContent", void 0);
ShareModalComponent = __decorate([
    Component({
        selector: 'app-share-modal',
        templateUrl: './share-modal.component.html'
    })
], ShareModalComponent);
export { ShareModalComponent };
//# sourceMappingURL=share-modal.component.js.map