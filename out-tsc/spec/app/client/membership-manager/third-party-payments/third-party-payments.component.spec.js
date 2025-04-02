import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { ThirdPartyPaymentsComponent } from './third-party-payments.component';
describe('ThirdPartyPaymentsComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [ThirdPartyPaymentsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ThirdPartyPaymentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=third-party-payments.component.spec.js.map