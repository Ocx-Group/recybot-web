import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

import { Response } from '@app/core/models/response-model/response.model';
import { Product } from '@app/core/models/product-model/product.model';
const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.inventoryService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly urlApi: string;

  constructor(private readonly router: Router, private readonly http: HttpClient) {
    this.urlApi = environment.apis.inventoryService;
  }

  getProductsByBrand(filters: {
    productIds?: number[];
    productType?: boolean;
    state?: boolean;
    visible?: boolean;
    visiblePublic?: boolean;
    includeDeleted?: boolean;
  } = {}) {
    let params = new HttpParams();

    filters.productIds?.forEach(id => {
      params = params.append('productIds', id.toString());
    });

    if (filters.productType !== undefined) params = params.set('productType', String(filters.productType));
    if (filters.state !== undefined) params = params.set('state', String(filters.state));
    if (filters.visible !== undefined) params = params.set('visible', String(filters.visible));
    if (filters.visiblePublic !== undefined) params = params.set('visiblePublic', String(filters.visiblePublic));
    if (filters.includeDeleted !== undefined) params = params.set('includeDeleted', String(filters.includeDeleted));

    return this.http.get<Response>(this.urlApi.concat('/product/by-brand'), { ...httpOptions, params }).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ', response);
          return null;
        }
      })
    );
  }

  getAllEcoPooles() {
    return this.getProductsByBrand();
  }

  getAllServices() {
    return this.getProductsByBrand();
  }

  getAllProductsAdmin() {
    return this.getProductsByBrand({ productType: false });
  }

  getAllMembership() {
    return this.getProductsByBrand({ productType: true });
  }

  createProduct(product: Product) {
    return this.http
      .post<Response>(this.urlApi.concat('/product'), product, httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateProduct(product: Product) {
    return this.http
      .put<Response>(
        this.urlApi.concat('/product/', product.id.toString()),
        product,
        httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  delete(id: number) {
    return this.http
      .delete<Response>(this.urlApi.concat('/product/', id.toString()), httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getAllFundingAccounts() {
    return this.getProductsByBrand();
  }

  getAllTradingAcademy() {
    return this.getProductsByBrand();
  }

  getAllSavingsPlans() {
    return this.getProductsByBrand();
  }

  getAllSavingsPlansOneB() {
    return this.getProductsByBrand();
  }

  getAllAlternativeHealth() {
    return this.getProductsByBrand();
  }

  getAllAlternativeHealthForEurope() {
    return this.getProductsByBrand();
  }

  getAllRecyCoin() {
    return this.getProductsByBrand();
  }
}
