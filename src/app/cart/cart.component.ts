import { Component, OnInit } from '@angular/core';
import { ProductAuthService } from '../Services/products/Auth/product-auth.service';
import { NgFor } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { IProductsModel } from '../Shared/Model/Products/ProductsModel';

@Component({
  selector: 'app-cart',
  imports: [NgFor, HeaderComponent, FooterComponent,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  constructor(private AuthProduct:ProductAuthService){}
  Product!:IProductsModel[]
  Products_price:number = 0
  totalItems:number = 0
  Laptop_quntity:number=0
  Phone_quntity:number=0
  ngOnInit(): void {
   const cards =this.AuthProduct.getCartProducts()
   this.Product = cards.Product
   this.AuthProduct.getTotalProductsPrice().subscribe((data)=>{
    this.Products_price= data
   })
   this.totalItems = this.Product.length
  }
  Del_Product_but(Product:IProductsModel){
  const products = JSON.parse(localStorage.getItem('buy-products') || '[]');
  const productIndex = products.findIndex((p: IProductsModel) => p.id === Product.id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    localStorage.setItem('buy-products', JSON.stringify(products));
    this.Product = products;
    this.Products_price = products.reduce((total: number, p: IProductsModel) => total + (p.price * (p.quantity || 1)), 0);
    this.totalItems = this.Product.length;
  }

  }
  Decareas_Product_quantity(){
    const Product = JSON.parse(localStorage.getItem('buy-products') || '[]');
    const productIndex = Product.findIndex((P: IProductsModel) => P.id === Product.id);
    if (productIndex !== -1) {
      Product[productIndex].quantity = (Product[productIndex].quantity || 1) - 1;
  
      if (Product[productIndex].quantity <= 0) {
        Product.splice(productIndex, 1);
      }
      localStorage.setItem('buy-product', JSON.stringify(Product));
      this.Product = Product;
      this.Products_price = Product.reduce((total: number, p: IProductsModel) => total + (p.price * (p.quantity || 1)), 0);
      this.totalItems = this.Product.length
  }
}
Incareas_Product_quantity(){
  const product = JSON.parse(localStorage.getItem('buy-productds') || '[]');
  const productIndex = product.findIndex((P: IProductsModel) => P.id === product.id);
  if (productIndex !== -1) {
    product[productIndex].quantity = (product[productIndex].quantity || 0) + 1;

    if (product[productIndex].quantity <= 0) {
      product.splice(productIndex, 1);
    }
    localStorage.setItem('buy-products', JSON.stringify(product));
    this.Product = product;
    this.Products_price = product.reduce((total: number, p: IProductsModel) => total + (p.price * (p.quantity || 1)), 0);
    this.totalItems = this.Product.length
}
}
}
