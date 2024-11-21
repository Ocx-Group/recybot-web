import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { CoinpaymentsComponent } from './coinpayments.component';
describe('CoinpaymentsComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [CoinpaymentsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(CoinpaymentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=coinpayments.component.spec.js.map