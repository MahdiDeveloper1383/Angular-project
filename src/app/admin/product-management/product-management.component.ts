import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products/products-services/products.service';
import { IProductsModel } from '../../Shared/Model/Products/ProductsModel';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-management',
  imports: [RouterModule,NgIf,NgFor],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent {
  allProducts: IProductsModel[] = [];
  displayedProducts: IProductsModel[] = [];

  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.products$.subscribe(products => {
      this.allProducts = products;
      this.totalPages = Math.ceil(this.allProducts.length / this.itemsPerPage);
      this.updateDisplayedProducts();
    });
  }

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedProducts = this.allProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedProducts();
    }
  }
  Del_Product(Product:IProductsModel){
    this.productService.deleteProduct(Product.id)
  }
}
