import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { TeamComponent } from './team.component';
describe('TeamComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [TeamComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TeamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=team.component.spec.js.map