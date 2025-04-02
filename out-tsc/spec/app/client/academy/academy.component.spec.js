import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { AcademyComponent } from './academy.component';
describe('AcademyComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [AcademyComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AcademyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=academy.component.spec.js.map