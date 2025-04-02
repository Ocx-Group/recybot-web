import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { MainOptionsComponent } from './main-options.component';
describe('MainOptionsComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [MainOptionsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MainOptionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=main-options.component.spec.js.map