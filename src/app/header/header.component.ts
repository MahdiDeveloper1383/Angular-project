import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../Services/Users/auth.service';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ProductAuthService } from '../Services/products/Auth/product-auth.service';
import e from 'express';

@Component({
  selector: 'app-header',
  imports: [RouterModule,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  Product_fav_num:number = 0
  User_Name!:string
  islog!:boolean
  logOut!:boolean
  Buy_Product_num!:number
  Buy_Product_price:number=0
  selectedBrand: string | null = null;
  constructor(private Auth:AuthService,
    private route:Router,
    private AuthProduct:ProductAuthService){}
  ngOnInit(): void {
    this.Auth.isLoggedIn$.subscribe((data)=>{
      this.islog = data
      this.User_Name = this.Auth.getUsername() || 'Guest'
    })
    this.AuthProduct.get_Product_FaveNum().subscribe((data)=>{
      this.Product_fav_num = data
    })
    this.AuthProduct.get_Product_buyNum().subscribe((data)=>{
      this.Buy_Product_num = data
    })
    this.AuthProduct.getTotalProductsPrice().subscribe((data)=>{
      this.Buy_Product_price = data
    })
  }
  LogoutBut(){
    this.Auth.logout()
    this.route.navigate(['/'])
  }
  Serachbox(search:HTMLInputElement){
    this.AuthProduct.setFilterCriteria(search.value.trim())
    console.log(search.value);
    
  }
  setfilterlaptopbybrand(brand:string){
    this.AuthProduct.setHeaderFilterlaptopbybrandCriteria(brand)
  }
  setfilterbybrand(brand:string){
    this.AuthProduct.setHeaderFilterbybrandCriteria(brand)
  }
  setfilterbyAppletype(type:string){
    this.AuthProduct.setHeaderFilterbyAppletypeCriteria(type)
  }
}
