import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { TicketViewComponent } from './ticket-view.component';
describe('TicketViewComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [TicketViewComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TicketViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ticket-view.component.spec.js.map