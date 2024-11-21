import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { EducationalCoursesComponent } from './educational-courses.component';
describe('EducationalCoursesComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [EducationalCoursesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(EducationalCoursesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=educational-courses.component.spec.js.map