import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { TermsConditionsModalComponent } from './terms-conditions-modal.component';
describe('TermsConditionsModalComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [TermsConditionsModalComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TermsConditionsModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=terms-conditions-modal.component.spec.js.map