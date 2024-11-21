import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.component';
describe('LogoComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [LogoComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(LogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=logo.component.spec.js.map