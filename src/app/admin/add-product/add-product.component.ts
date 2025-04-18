import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IProductsModel } from '../../Shared/Model/Products/ProductsModel';
import { ProductsService } from '../../Services/products/products-services/products.service';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule,RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  constructor(private Product_serv:ProductsService,private route:Router){}
  product: IProductsModel = {
    id: Date.now(), 
    name: '',
    brand: '',
    type:'',
    color:'',
    price: 0,
    imgSrc: '',
    count: 0,
    RefreshRate:0,
    stars:0,
    graphics:'',
    ram:0,
    Os:'',
    Memory_Storage:0,
    hard_disk_size:0,
    processor:'',
    display:'',
    quantity:0,
    isFavorite:false,
    Model:''
  };
  onSubmit(){
    this.Product_serv.addProduct(this.product)
    this.route.navigate(['/admin/Products'])
  }
}
