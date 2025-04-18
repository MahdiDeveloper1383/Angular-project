import { Component, Input, OnInit, Output } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NgFor } from '@angular/common';
import { ProductCartComponent } from "../product-cart/product-cart.component";
import { FooterComponent } from "../footer/footer.component";
import { CarsoulDirective } from '../Directives/Carsoul/carsoul.directive';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ProductCartComponent, FooterComponent,CarsoulDirective],
  standalone:true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  Products!:any
  headerfilter:string =''
  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.headerfilter = params['filter']
    })
  }
}