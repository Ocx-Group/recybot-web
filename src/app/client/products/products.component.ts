import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { Product } from '@app/core/models/product-model/product.model';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '@app/core/service/cart.service/cart.service';
import { ProductService } from 'src/app/core/service/product-service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslateModule],
})
export class ProductsComponent implements OnInit, OnChanges {
  public productList: any;
  public filterCategory: any;
  public showPageShell = false;
  @Input() tabActive = 9;
  searchKey: string = '';
  @Input() addPurchase = true;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private toatr: ToastrService,
    private route: ActivatedRoute,
  ) {
    this.showPageShell = this.route.snapshot.routeConfig?.path === 'products';
  }

  ngOnInit(): void {
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    this.handleProductLoading(this.tabActive);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabActive'] && !changes['tabActive'].firstChange) {
      this.handleProductLoading(this.tabActive);
    }
  }

  addtocart(item: any) {
    // Only block when explicitly disabled by the parent.
    if (this.addPurchase === false) return;
    const added = this.cartService.addtoCart(item);
    if (added) {
      this.toatr.success('Producto agregado al carrito');
    }
  }

  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }

  showError(error: string) {
    this.toatr.error(error);
  }

  loadAllEcoPooles() {
    this.productService.getAllEcoPooles().subscribe((ecopools: Product) => {
      this.productList = ecopools;
      this.filterCategory = ecopools;
      this.productList.forEach((item: any) => {
        Object.assign(item, { quantity: 1, total: item.salePrice });
      });
    });
  }

  loadAllServices() {
    this.productService.getAllServices().subscribe((services: Product) => {
      this.productList = services;
      this.filterCategory = services;
      this.productList.forEach((item: any) => {
        Object.assign(item, { quantity: 1, total: item.salePrice });
      });
    });
  }

  loadAllTradingAcademy() {
    this.productService
      .getAllTradingAcademy()
      .subscribe((suscriptions: Product) => {
        this.productList = suscriptions;
        this.filterCategory = suscriptions;
        this.productList.forEach((item: any) => {
          Object.assign(item, { quantity: 1, total: item.salePrice });
        });
      });
  }

  getAllFundingAccounts() {
    this.productService
      .getAllFundingAccounts()
      .subscribe((fundingAccounts: Product) => {
        this.productList = fundingAccounts;
        this.filterCategory = fundingAccounts;
        this.productList.forEach((item: any) => {
          Object.assign(item, { quantity: 1, total: item.salePrice });
        });
      });
  }

  loadSavingsPlans() {
    this.productService
      .getAllSavingsPlans()
      .subscribe((savingsPlans: Product) => {
        this.productList = savingsPlans;
        this.filterCategory = savingsPlans;
        this.productList.forEach((item: any) => {
          Object.assign(item, { quantity: 1, total: item.salePrice });
        });
      });
  }

  loadSavingsPlansOneB() {
    this.productService
      .getAllSavingsPlansOneB()
      .subscribe((savingsPlans: Product) => {
        this.productList = savingsPlans;
        this.filterCategory = savingsPlans;
        this.productList.forEach((item: any) => {
          Object.assign(item, { quantity: 1, total: item.salePrice });
        });
      });
  }

  loadAllAlternativeHealth() {
    this.productService
      .getAllAlternativeHealth()
      .subscribe((alternativeHealth: Product) => {
        this.productList = alternativeHealth;
        this.filterCategory = alternativeHealth;
        this.productList.forEach((item: any) => {
          Object.assign(item, { quantity: 1, total: item.salePrice });
        });
      });
  }

  loadAllAlternativeHealthForEurope() {
    this.productService
      .getAllAlternativeHealthForEurope()
      .subscribe((alternativeHealth: Product) => {
        this.productList = alternativeHealth;
        this.filterCategory = alternativeHealth;
        this.productList.forEach((item: any) => {
          Object.assign(item, { quantity: 1, total: item.salePrice });
        });
      });
  }

  loadAllRecyCoin() {
    this.productService.getAllRecyCoin().subscribe((coin: Product) => {
      this.productList = coin;
      this.filterCategory = coin;
      this.productList.forEach((item: any) => {
        Object.assign(item, { quantity: 1, total: item.salePrice });
      });
    });
  }

  handleProductLoading(tabActive: number) {
    switch (tabActive) {
      case 1:
        this.loadAllEcoPooles();
        break;
      case 2:
        this.loadAllServices();
        break;
      case 3:
        this.loadAllTradingAcademy();
        break;
      case 4:
        this.getAllFundingAccounts();
        break;
      case 5:
        this.loadSavingsPlans();
        break;
      case 6:
        this.loadSavingsPlansOneB();
        break;
      case 7:
        this.loadAllAlternativeHealth();
        break;
      case 8:
        this.loadAllAlternativeHealthForEurope();
        break;
      case 9:
        this.loadAllRecyCoin();
        break;
      default:
        this.loadAllRecyCoin();
        break;
    }
  }
}
