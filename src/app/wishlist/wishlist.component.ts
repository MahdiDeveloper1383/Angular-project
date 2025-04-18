import { Component, OnInit } from '@angular/core';
import { ProductAuthService } from '../Services/products/Auth/product-auth.service';
import { NgFor, NgIf } from '@angular/common';
import { AuthUsersService } from '../Services/Users/auth-users.service';
import { AuthService } from '../Services/Users/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { IProductsModel } from '../Shared/Model/Products/ProductsModel';

@Component({
  selector: 'app-wishlist',
  imports: [NgFor, HeaderComponent, FooterComponent,NgIf],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  constructor(private AuthProduct:ProductAuthService,
    private User_serv:AuthService,
    private route:Router
  ){}
  Favs_Products!:IProductsModel[]
  isLog!:boolean
  isAddproduct:boolean = false
  ngOnInit(): void {
    const Favs = this.AuthProduct.getFavProducts()
    this.Favs_Products = Favs.Product
    this.isLog=this.User_serv.Islog
     this.AuthProduct.getIsAddproduct().subscribe((data)=>{
      this.isAddproduct = data
     })
  }
  Buy_Product(Product:IProductsModel){
    if (this.isLog) {
      this.AuthProduct.Buyproduct(Product,1)
    }else{
      this.route.navigate(['/login'])
    }
  }
  Del_Product(Product_tr:HTMLElement,product:IProductsModel){
    const Product = JSON.parse(localStorage.getItem('fav-products') || '[]')
    const updatedProducts = Product.filter((l: IProductsModel) => l.id !== product.id);
    localStorage.setItem('fav-products', JSON.stringify(updatedProducts));
    Product_tr.remove()
  }
}
