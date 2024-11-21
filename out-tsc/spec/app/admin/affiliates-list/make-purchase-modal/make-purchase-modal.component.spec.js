import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { MakePurchaseModalComponent } from './make-purchase-modal.component';
describe('MakePurchaseModalComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [MakePurchaseModalComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MakePurchaseModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=make-purchase-modal.component.spec.js.map