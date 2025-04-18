import { Component, Input, OnInit, Output,EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { LaptopserviceService } from '../Services/products/laptopservice.service';
import { PhoneService } from '../Services/products/phone.service';
import { Phones } from '../Shared/Model/Products/PhonesModel';
import { Laptop } from '../Shared/Model/Products/LaptopModel';
import { AuthService } from '../Services/Users/auth.service';
import { Users } from '../Shared/Model/Users/Usersmodel';
import { ProductAuthService } from '../Services/products/Auth/product-auth.service';

@Component({
  selector: 'app-product-cart',
  imports: [NgFor,FormsModule,NgIf],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss'
})
export class ProductCartComponent implements OnInit{
  @ViewChild('heart',{static:true}) heart!:ElementRef
  Laptops!:Laptop[]
  Phones!:Phones[]
  constructor(private laptopServ:LaptopserviceService,
    private PhoneServ:PhoneService,
    private AuthProduct:ProductAuthService
  ){}
  User!:string
  ngOnInit(): void {
    this.laptopServ.getlaptop().subscribe((data)=>{
      this.Laptops = data
      this.PhoneServ.getPhone().subscribe((data)=>{
        this.Phones = data
      })
    })

  }
  Add_fav_Phone_but(Phone:Phones){
      if (!Phone.isFavorite) {
        this.AuthProduct.Add_Fav_Phones(Phone)
        Phone.isFavorite = true
      }
      else{
        this.AuthProduct.remove_Fav_phone(Phone.id)
        Phone.isFavorite = false
      }
  }
  Add_fav_Lpatop_but(Laptop:Laptop){
    if (!Laptop.isFavorite) {
        this.AuthProduct.Add_Fav_Laptop(Laptop)
        Laptop.isFavorite = true
      }
      else{
        this.AuthProduct.remove_Fav_Laptop(Laptop.id)
        Laptop.isFavorite = false
      }
  }
  getStars(stars: number): { full: number; half: number; empty: number } {
    const full = Math.floor(stars); // Number of full stars
    const half = stars % 1 !== 0 ? 1 : 0; // 1 if there's a half star, otherwise 0
    const empty = 5 - full - half; // Remaining stars are empty
    return { full, half, empty };
  }
}
