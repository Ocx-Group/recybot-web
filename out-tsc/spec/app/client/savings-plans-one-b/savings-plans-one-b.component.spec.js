import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { SavingsPlansOneBComponent } from './savings-plans-one-b.component';
describe('SavingsPlansOneBComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [SavingsPlansOneBComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(SavingsPlansOneBComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=savings-plans-one-b.component.spec.js.map