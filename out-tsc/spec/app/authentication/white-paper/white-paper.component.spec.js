import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { WhitePapperComponent } from './white-paper.component';
describe('WhitePapperComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [WhitePapperComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(WhitePapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=white-paper.component.spec.js.map