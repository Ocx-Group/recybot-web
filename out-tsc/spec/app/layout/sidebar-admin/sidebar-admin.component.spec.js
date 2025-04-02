import { TestBed, waitForAsync } from '@angular/core/testing';
import { SidebarAdminComponent } from './sidebar-admin.component';
describe('SidebarComponent', () => {
    let component;
    let fixture;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SidebarAdminComponent]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=sidebar-admin.component.spec.js.map