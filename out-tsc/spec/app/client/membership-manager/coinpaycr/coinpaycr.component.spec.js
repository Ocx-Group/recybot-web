import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { CoinpaycrComponent } from './coinpaycr.component';
describe('CoinpaycrComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [CoinpaycrComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(CoinpaycrComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=coinpaycr.component.spec.js.map