/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { SavingsPlansComponent } from './savings-plans.component';
describe('SavingsPlansComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SavingsPlansComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SavingsPlansComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=savings-plans.component.spec.js.map