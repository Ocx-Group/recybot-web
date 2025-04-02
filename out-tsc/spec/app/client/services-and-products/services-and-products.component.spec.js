import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { ServicesAndProductsComponent } from './services-and-products.component';
describe('ServicesAndProductsComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [ServicesAndProductsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ServicesAndProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=services-and-products.component.spec.js.map