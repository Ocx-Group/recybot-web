import { TestBed } from '@angular/core/testing';
import { ImageProfileService } from './image-profile.service';
describe('ImageProfileService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ImageProfileService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=image-profile.service.spec.js.map