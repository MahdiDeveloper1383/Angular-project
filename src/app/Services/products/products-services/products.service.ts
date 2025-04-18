import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProductsModel } from '../../../Shared/Model/Products/ProductsModel';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   
  private products: IProductsModel[] = [];
  private productsSubject = new BehaviorSubject<IProductsModel[]>([]);
  products$ = this.productsSubject.asObservable();
  private isLoaded = false;

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  private loadProducts(): void {
    if (!this.isLoaded) {
      this.http.get<IProductsModel[]>('../assets/Jsons/Products/Products.json')
        .subscribe(data => {
          this.products = data;
          this.productsSubject.next([...this.products]);
          this.isLoaded = true;
        });
    }
  }

  getProductById(id: number): IProductsModel | undefined {
    return this.products.find(p => p.id === id);
  }

  addProduct(product: IProductsModel): void {
    this.products.push(product);
    this.productsSubject.next([...this.products]);
  }

  updateProduct(updated: IProductsModel): void {
    const index = this.products.findIndex(p => p.id === updated.id);
    if (index !== -1) {
      this.products[index] = updated;
      this.productsSubject.next([...this.products]);
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
    this.productsSubject.next([...this.products]);
  }
}
