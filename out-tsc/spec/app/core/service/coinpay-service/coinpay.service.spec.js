import { TestBed } from '@angular/core/testing';
import { CoinpayService } from './coinpay.service';
describe('CoinpayService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CoinpayService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=coinpay.service.spec.js.map