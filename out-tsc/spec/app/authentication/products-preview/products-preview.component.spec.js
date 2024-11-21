import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { ProductsPreviewComponent } from './products-preview.component';
describe('ProductsPreviewComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [ProductsPreviewComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ProductsPreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=products-preview.component.spec.js.map