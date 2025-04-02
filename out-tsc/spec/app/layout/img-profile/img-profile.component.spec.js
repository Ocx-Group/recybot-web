import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { ImgProfileComponent } from './img-profile.component';
describe('ImgProfileComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [ImgProfileComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ImgProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=img-profile.component.spec.js.map