import { Injectable, computed, signal } from '@angular/core';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // -------------------------------------------------------------------------
  // Signals (modern API — single source of truth for the cart contents).
  // -------------------------------------------------------------------------
  private readonly _cartItems = signal<any[]>([]);

  readonly cartItems = this._cartItems.asReadonly();

  readonly consolidatedProducts = computed(() => {
    const products = this._cartItems();
    const productMap: Record<string | number, any> = {};
    const result: any[] = [];

    for (const product of products) {
      const key = product?.id;
      if (key === undefined || key === null) {
        result.push({ ...product });
        continue;
      }
      if (productMap[key]) {
        productMap[key].quantity += product.quantity ?? 1;
        productMap[key].total =
          productMap[key].salePrice * productMap[key].quantity;
      } else {
        productMap[key] = { ...product };
        result.push(productMap[key]);
      }
    }
    return result;
  });

  readonly totalPriceSignal = computed(() =>
    this._cartItems().reduce(
      (acc, item) => acc + (item.quantity ?? 1) * (item.salePrice ?? 0),
      0,
    ),
  );

  // -------------------------------------------------------------------------
  // Backward-compatible BehaviorSubjects (existing subscribers keep working).
  // -------------------------------------------------------------------------
  public productList = new BehaviorSubject<any[]>([]);
  public search = new BehaviorSubject<string>('');
  public totalPrice = new BehaviorSubject<number>(0);
  public userReceivesPurchase = new BehaviorSubject<UserAffiliate>(
    new UserAffiliate(),
  );
  public normalUser = new BehaviorSubject<UserAffiliate>(new UserAffiliate());

  /** @deprecated Use the `cartItems` signal. Do NOT mutate this array. */
  public get cartItemList(): any[] {
    return this._cartItems();
  }

  constructor(private readonly toast: ToastrService) {}

  showError(message: string) {
    this.toast.error(message);
  }

  /** Backward compatible: emits the consolidated product list. */
  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    const incoming = Array.isArray(product) ? product : [product];
    this._cartItems.update(items => [...items, ...incoming]);
    this.syncSubjects();
  }

  private getPaymentGroup(product: any): number {
    return product?.paymentGroup ?? product?.paymentGroupId ?? 0;
  }

  addtoCart(product: any): boolean {
    const paymentGroup = this.getPaymentGroup(product);
    const modelTwo = paymentGroup === 2;
    const modelOneA = paymentGroup === 7;
    const modelOneB = paymentGroup === 8;
    const otherModels = !(modelTwo || modelOneA || modelOneB);

    const currentItems = this._cartItems();

    if (currentItems.length > 0) {
      const cartContainsModelTwo = currentItems.some(
        item => this.getPaymentGroup(item) === 2,
      );
      const cartContainsModelOneA = currentItems.some(
        item => this.getPaymentGroup(item) === 7,
      );
      const cartContainsModelOneB = currentItems.some(
        item => this.getPaymentGroup(item) === 8,
      );
      const cartContainsOtherModels = currentItems.some(item => {
        const itemPaymentGroup = this.getPaymentGroup(item);
        return !(
          itemPaymentGroup === 2 ||
          itemPaymentGroup === 7 ||
          itemPaymentGroup === 8
        );
      });

      if (
        (modelTwo &&
          (cartContainsModelOneA ||
            cartContainsModelOneB ||
            cartContainsOtherModels)) ||
        (modelOneA &&
          (cartContainsModelTwo ||
            cartContainsModelOneB ||
            cartContainsOtherModels)) ||
        (modelOneB &&
          (cartContainsModelOneA ||
            cartContainsModelTwo ||
            cartContainsOtherModels)) ||
        (otherModels &&
          (cartContainsModelOneA ||
            cartContainsModelTwo ||
            cartContainsModelOneB))
      ) {
        this.showError(
          'No puedes mezclar servicios de diferentes modelos en el carrito.',
        );
        return false;
      }
    }

    const newItem = { ...product, paymentGroup, quantity: 1 };
    this._cartItems.update(items => [...items, newItem]);
    this.syncSubjects();
    return true;
  }

  getTotalPrice(): number {
    return this.totalPriceSignal();
  }

  removeCartItem(product: any) {
    const items = this._cartItems();
    const index = items.findIndex((item: any) => item.id === product.id);
    if (index !== -1) {
      const next = [...items];
      next.splice(index, 1);
      this._cartItems.set(next);
      this.syncSubjects();
    }
  }

  removeAllCart() {
    this._cartItems.set([]);
    this.syncSubjects();
  }

  setPurchaseFromThirdParty(user: UserAffiliate) {
    this.userReceivesPurchase.next(user);
  }

  getPurchaseFromThirdParty() {
    return this.userReceivesPurchase.asObservable();
  }

  clearPurchaseFromThirdParty() {
    this.userReceivesPurchase.next(new UserAffiliate());
  }

  // -------------------------------------------------------------------------
  private syncSubjects() {
    // Emit the consolidated/aggregated view so existing subscribers
    // (header counter, cart page) keep working.
    const consolidated = this.consolidatedProducts();
    this.productList.next(consolidated);
    this.totalPrice.next(this.totalPriceSignal());
  }
}
