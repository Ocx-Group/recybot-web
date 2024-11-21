import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { TickViewComponent } from './ticket-view-admin.component';
describe('TickViewComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [TickViewComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TickViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ticket-view-admin.component.spec.js.map