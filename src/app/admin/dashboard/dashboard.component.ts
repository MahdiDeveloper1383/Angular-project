import { Component, OnInit } from '@angular/core';
import { Users } from '../../Shared/Model/Users/Usersmodel';
import { AuthUsersService } from '../../Services/Users/auth-users.service';
import { IProductsModel } from '../../Shared/Model/Products/ProductsModel';
import { ProductAuthService } from '../../Services/products/Auth/product-auth.service';
import { ProductsService } from '../../Services/products/products-services/products.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  Users!:Users[]
  Products!:IProductsModel[]
  constructor(private User_serv:AuthUsersService,
    private Product_serv:ProductsService
  ){}
  ngOnInit(): void {
    this.User_serv.GetUSers().subscribe((data)=>{
      this.Users = data
    })
    this.Product_serv.products$.subscribe((data)=>{
      this.Products = data
    })
  }
}
