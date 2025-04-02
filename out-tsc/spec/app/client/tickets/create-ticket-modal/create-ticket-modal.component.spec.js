import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { CreateTicketModalComponent } from './create-ticket-modal.component';
describe('CreateTicketModalComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [CreateTicketModalComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(CreateTicketModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=create-ticket-modal.component.spec.js.map