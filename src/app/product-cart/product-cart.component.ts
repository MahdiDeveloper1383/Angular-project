import { Component, Input, OnInit, Output,EventEmitter, ViewChild, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { AuthService } from '../Services/Users/auth.service';
import { ProductAuthService } from '../Services/products/Auth/product-auth.service';
import { ActivatedRoute, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { ProductsService } from '../Services/products/products-services/products.service';
import { BehaviorSubject, debounceTime, Subject } from 'rxjs';
import { IProductsModel } from '../Shared/Model/Products/ProductsModel';

@Component({
  selector: 'app-product-cart',
  imports: [NgFor,FormsModule,NgIf,RouterModule],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss'
})
export class ProductCartComponent implements OnInit{
  @ViewChild('heart',{static:true}) heart!:ElementRef
  selectedBrand: string =''
  selcted:string =''
  IsClickedonBrands:boolean = false
  isLog!:boolean
  searchKeyword: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6; 
  filteredProducts: IProductsModel[] = [];
  Products!:IProductsModel[]
   brandsubject = new BehaviorSubject<string>(this.selectedBrand)
  private searchSubject = new Subject<string>();
  constructor(private Product_serv:ProductsService,
    private AuthProduct:ProductAuthService,
    private AuthUser:AuthService,
    private route:Router,
    private route_active:ActivatedRoute,
  ){}
  User!:string
  ngOnInit(): void {
  this.Product_serv.products$.subscribe((data)=>{
     this.Products = data
    this.filteredProducts = [...data]
    this.AuthProduct.filterCriteria$.subscribe((serach)=>{
      if (!serach) {
        this.filteredProducts = [...data]
      }else{
        this.filteredProducts = this.Products.filter((P)=>P.name.toLowerCase().includes((serach.toLowerCase())) || P.type.toLowerCase().includes(serach.toLowerCase()))
      }
    })
    this.AuthProduct.HeaderfilterlaptopbybrandCriteria$.subscribe((brand)=>{
      if (!brand) {
        this.filteredProducts = [...data]
      }
      else{
        this.filteredProducts = this.Products.filter((Prouduct)=>Prouduct.brand === brand && Prouduct.type === 'laptop')
      }
    })
    this.AuthProduct.HeaderfilterbybrandCriteria$.subscribe((brand)=>{
      if (!brand) {
        this.filteredProducts = [...data]
      }else{
        this.filteredProducts = this.Products.filter((Product)=>Product.brand === brand)
      }
    })
    this.AuthProduct.HeaderfilterbyApplebytypeCriteria$.subscribe((type)=>{
      if (!type) {
        this.filteredProducts = [...data]
      }else{
        this.filteredProducts = this.Products.filter((Product)=>Product.brand === 'Apple' && Product.type === type)
      }
    })
  })
  this.isLog=this.AuthUser.Islog
}
  Add_fav_Product_but(product:IProductsModel){
    if (!product.isFavorite) {
        this.AuthProduct.Add_Fav_Products(product)
        product.isFavorite = true
      }
      else{
        this.AuthProduct.remove_Fav_Product(product.id)
        product.isFavorite = false
      }
  }
  getStars(stars: number): { full: number; half: number; empty: number } {
    const full = Math.floor(stars); // Number of full stars
    const half = stars % 1 !== 0 ? 1 : 0; // 1 if there's a half star, otherwise 0
    const empty = 5 - full - half; // Remaining stars are empty
    return { full, half, empty };
  }
  Buy_Product_but(Phone:IProductsModel){
    if (this.isLog) {
      this.AuthProduct.Buyproduct(Phone,1)
    }
    else{
      setTimeout(() => {
        this.route.navigate(['/login'])
      }, 500);
    }
  }
  filterByBrand(brand:string){
    this.filteredProducts = this.Products.filter((P)=>P.brand === brand)
    
  }
  filterByType(type:string){
    this.filteredProducts = this.Products.filter((P)=>P.type === type)
  }
  getAll(){
    this.filteredProducts = this.Products
  }
  clickonBrands(){
    this.IsClickedonBrands = !this.IsClickedonBrands 
  }
  filterByCount(count:string){
    if (count === 'available') {
      this.filteredProducts=this.Products.filter((P)=>P.count > 0)
    }else if (count === 'unavailable') {
      this.filteredProducts=this.Products.filter((P)=>P.count === 0)
    }
  }
  SortProductsbyprice(order:string){
    if (order === 'Highest') {
      this.filteredProducts.sort((a,b)=>b.price - a.price)
    }else if (order === 'Lowest') {
      this.filteredProducts.sort((a,b)=>a.price - b.price)
    }
  }
  filterByKeyword(){
    const keyword = this.searchKeyword.toLowerCase();
    this.filteredProducts = this.Products.filter((product) =>
      product.name.toLowerCase().includes(keyword) ||
      product.brand.toLowerCase().includes(keyword)
    );
  }


get totalPages(): number {
  return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
}

get totalPagesArray(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

get paginatedProducts(): IProductsModel[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.filteredProducts.slice(startIndex, endIndex);
}
goToPage(page: number): void {
  setTimeout(() => {
    this.currentPage = page;
  }, 500);
}

previousPage(): void {
  setTimeout(() => {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }, 500);
}

nextPage(): void {
  setTimeout(() => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }, 500);
}
}
