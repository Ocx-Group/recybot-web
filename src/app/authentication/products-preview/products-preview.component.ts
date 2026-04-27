import { Component, OnInit } from '@angular/core';
import { Product } from '@app/core/models/product-model/product.model';
import { ProductService } from '@app/core/service/product-service/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products-preview',
  templateUrl: './products-preview.component.html',
  styleUrls: ['./products-preview.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
})
export class ProductsPreviewComponent implements OnInit {
  public productList: any;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.loadAllRecyCoin();
  }

  loadAllRecyCoin() {
    this.productService.getAllRecyCoin().subscribe((coin: Product) => {
      this.productList = coin;
      this.productList.forEach((item: any) => {
        Object.assign(item, { quantity: 1, total: item.salePrice });
      });
    });
  }
}
