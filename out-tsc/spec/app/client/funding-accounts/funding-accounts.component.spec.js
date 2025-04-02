import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { FundingAccountsComponent } from './funding-accounts.component';
describe('FundingAccountsComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [FundingAccountsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(FundingAccountsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=funding-accounts.component.spec.js.map