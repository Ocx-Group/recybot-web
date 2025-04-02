import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let ImageProfileService = class ImageProfileService {
    constructor(authService) {
        this.authService = authService;
        this.imageURLSubject = new BehaviorSubject(null);
        this.imageURL$ = this.imageURLSubject.asObservable();
        const imageUrl = (this.authService.currentUserAffiliateValue ? this.authService.currentUserAffiliateValue.image_profile_url : null) ||
            (this.authService.currentUserAdminValue ? this.authService.currentUserAdminValue.image_profile_url : null);
        this.setImageURL(imageUrl);
    }
    setImageURL(url) {
        this.imageURLSubject.next(url);
    }
};
ImageProfileService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ImageProfileService);
export { ImageProfileService };
//# sourceMappingURL=image-profile.service.js.map