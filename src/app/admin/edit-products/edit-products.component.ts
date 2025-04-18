import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ProductAuthService } from '../../Services/products/Auth/product-auth.service';
import { NgFor, NgIf } from '@angular/common';
import { IProductsModel } from '../../Shared/Model/Products/ProductsModel';
import { ProductsService } from '../../Services/products/products-services/products.service';

@Component({
  selector: 'app-edit-products',
  imports: [FormsModule,RouterLink],
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.scss'
})
export class EditProductsComponent implements OnInit{
  product!:IProductsModel
 EditProduct!:IProductsModel
  constructor(private router:ActivatedRoute,
    private Products_serv:ProductsService,
    private route:Router
  ){}
 ngOnInit(): void {
   const productId = +this.router.snapshot.paramMap.get('id')!
   this.Products_serv.products$.subscribe((data)=>{
    this.product = data.find((p)=>p.id === productId) || this.product
   })
 }
 Save_but(){
  this.EditProduct={
  id:this.product.id,
  name :this.product.name,
  brand:this.product.brand,
  price:this.product.price,
  count:this.product.count,
  imgSrc: this.product.imgSrc,
  color:this.product.color,
  type:this.product.type,
  stars:this.product.stars,
  processor:this.product.processor,
  Os:this.product.Os,
  hard_disk_size:this.product.hard_disk_size,
  Memory_Storage:this.product.Memory_Storage,
  Model:this.product.Model,
  graphics:this.product.graphics,
  quantity:this.product.quantity,
  RefreshRate:this.product.RefreshRate,
  ram:this.product.ram,
  isFavorite:this.product.isFavorite,
  display:this.product.display
  }
  this.Products_serv.updateProduct(this.EditProduct)
  this.route.navigate(['/admin/Products'])
 }

}
