import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../Services/products/products-services/products.service';
import { IProductsModel } from '../Shared/Model/Products/ProductsModel';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Services/Users/auth.service';
import { ProductAuthService } from '../Services/products/Auth/product-auth.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-product-details',
  imports: [NgIf, NgFor, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  Product:IProductsModel | undefined
  quantity:number = 1
  islog!:boolean
  constructor(private route:ActivatedRoute,
    private productService:ProductsService,
    private AuthProduct:ProductAuthService,
    private UserAuth:AuthService,
    private router:Router
  ){}
ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.productService.products$.subscribe((data)=>{
    this.Product = data.find((product) => product.id === id)
  })
  this.islog = this.UserAuth.Islog
}
getStars(stars: number): { full: number; half: number; empty: number } {
  const full = Math.floor(stars); // Number of full stars
  const half = stars % 1 !== 0 ? 1 : 0; // 1 if there's a half star, otherwise 0
  const empty = 5 - full - half; // Remaining stars are empty
  return { full, half, empty };
}

  Hardisk(): string | undefined {
    const hardDiskSize = this.Product?.hard_disk_size;
    if (hardDiskSize !== undefined) {
      return hardDiskSize > 1000
        ? `${(hardDiskSize / 1000).toFixed(1)}T` // Convert to terabytes and format to 1 decimal place
        : `${hardDiskSize}GB`; // Keep as gigabytes
    }
    return undefined; // Return undefined if hard_disk_size is not available
  }
  Buy_Product(Product:IProductsModel,quantity:number){
    if (this.islog) {
      this.AuthProduct.Buyproduct(Product,quantity)
    }else{
      this.router.navigate(['/login'])
    }
  }
  Add_fav_Product(product:IProductsModel){
    this.AuthProduct.Add_Fav_Products(product)
  }
}

