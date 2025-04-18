import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../Services/Users/auth.service';
import { NgIf } from '@angular/common';
import { ProductAuthService } from '../Services/products/Auth/product-auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  Phone_fav_num!:number
  Laptop_fav_num!:number
  User_Name!:string
  islog!:boolean
  logOut!:boolean
  constructor(private Auth:AuthService,private route:Router,private AuthProduct:ProductAuthService){}
  ngOnInit(): void {
    this.Auth.isLoggedIn$.subscribe((data)=>{
      this.islog = data
      this.User_Name = this.Auth.getUsername() || 'Guest'
    })
    this.AuthProduct.get_Phone_FaveNum().subscribe((data)=>{
      this.Phone_fav_num = data
    })
    this.AuthProduct.get_Laptop_FaveNum().subscribe((data)=>{
      this.Laptop_fav_num = data
    })
  }
  LogoutBut(){
    this.Auth.logout()
    this.route.navigate(['/'])
  }
}
