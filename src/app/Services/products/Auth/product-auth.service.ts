import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { IProductsModel } from '../../../Shared/Model/Products/ProductsModel';
@Injectable({
  providedIn: 'root'
})
export class ProductAuthService{
  private currentProducts: IProductsModel | null = null;
  private Products_Fav_num:number = 0
  private Products_buy_num :number = 0
  private fav_Products_NumSubject = new BehaviorSubject<number>(this.Products_Fav_num);
  private totalProductsPrice: number = 0;
  private buy_Products_NumSubject = new BehaviorSubject<number>(this.Products_buy_num);
  private totalProductsPriceSubject = new BehaviorSubject<number>(this.totalProductsPrice);
  private isAddProduct: boolean = false; 
  private isAddProductSubject = new BehaviorSubject<boolean>(this.isAddProduct);

  constructor() { 
    const Fav_Products = localStorage.getItem('fav-products')  || undefined;
    if (Fav_Products) {
      const Products_Fav_Array: IProductsModel[] = JSON.parse(Fav_Products)
      this.currentProducts = JSON.parse(Fav_Products);
      this.Products_Fav_num =Products_Fav_Array.length; // Initialize Fav_num based on stored data
      this.fav_Products_NumSubject.next(this.Products_Fav_num);
    }
    const Buy_Products = localStorage.getItem('buy-products') || undefined;
    if (Buy_Products) {
      const Product_buy_Array:IProductsModel[]=JSON.parse(Buy_Products)
      this.totalProductsPrice = Product_buy_Array.reduce((total,product)=>total+product.price,0)
      this.totalProductsPriceSubject.next(this.totalProductsPrice)
    }
  }
  Add_Fav_Products(Product:IProductsModel){
    try{
      const Fav_Products = localStorage.getItem('fav-products')  || undefined;

        const Products_fav_Array:IProductsModel[] = Fav_Products ? JSON.parse(Fav_Products):[]
        const ProductExists = Products_fav_Array.filter((p) => p.id === Product.id);
        if (!ProductExists) {
          return
        }
        Products_fav_Array.push(Product)
        localStorage.setItem('fav-products',JSON.stringify(Products_fav_Array)) 
        this.Products_Fav_num++
        this.fav_Products_NumSubject.next(this.Products_Fav_num)

    }catch(error){
     throw error
    }
  }
  Buyproduct(product:IProductsModel,quantity:number){
    try{
      const Buy_Products = localStorage.getItem('buy-products') || undefined;
      const Product_buy_Array:IProductsModel[] = Buy_Products ? JSON.parse(Buy_Products):[]
      const productExists = Product_buy_Array.some((p) => p.id === product.id);
      const productIndex = Product_buy_Array.findIndex((p)=>p.id === product.id)
      if (!productExists) {
        if (productIndex === -1) {
          product.quantity = quantity
          Product_buy_Array.push(product)
        }else{
          Product_buy_Array[productIndex].quantity = (Product_buy_Array[productIndex].quantity || 0) + quantity
        }
        localStorage.setItem('buy-products',JSON.stringify(Product_buy_Array)) 
        this.Products_buy_num = Product_buy_Array.reduce((total,product)=>total + (product.quantity || 0),0)
        this.buy_Products_NumSubject.next(this.Products_buy_num)
       this.totalProductsPrice = Product_buy_Array.reduce((total,product)=>total +(product.price*(product.quantity||1)),0)
        this.totalProductsPriceSubject.next(Math.floor(this.totalProductsPrice))
        this.isAddProduct = true
        this.isAddProductSubject.next(this.isAddProduct)
      }
    }catch(error){
     throw error
    }
  }
  getTotalProductsPrice(){
    return this.totalProductsPriceSubject.asObservable()
  }

  get_Product_FaveNum(){
    return this.fav_Products_NumSubject.asObservable()
  }
  get_Product_buyNum(){
    return this.buy_Products_NumSubject.asObservable()
  }
  remove_Fav_Product(productId:number): void {
    this.currentProducts = null;
    try {
      const Fav_Products = localStorage.getItem('fav-products') || undefined;
      if (Fav_Products) {
        let Products_fav_Array: IProductsModel[] = JSON.parse(Fav_Products) || undefined;
        Products_fav_Array = Products_fav_Array.filter((p) => p.id !== productId);
        localStorage.setItem('fav-products', JSON.stringify(productId)) 
        this.Products_Fav_num =Products_fav_Array.length;
        this.fav_Products_NumSubject.next(this.Products_Fav_num);
      }
    } catch (error) {
      console.error('Failed to remove phone from favorites:', error);
      throw error;
    }
  }


  getCartProducts(): { Product: IProductsModel[]} {
    const cartProduct = localStorage.getItem('buy-products') || undefined;
    const Product: IProductsModel[] = cartProduct ? JSON.parse(cartProduct) : [];
  
    return { Product: Product };
  }
  getFavProducts(): { Product: IProductsModel[]} {
    const cartProduct = localStorage.getItem('fav-products') || undefined;
    const product: IProductsModel[] = cartProduct ? JSON.parse(cartProduct) : [];
  
    return { Product: product }; ;
  }
  getIsAddproduct():Observable<boolean>{
    return this.isAddProductSubject.asObservable()
  }
private filterCriteriaSubject = new BehaviorSubject<string | null>(null);
filterCriteria$ = this.filterCriteriaSubject.asObservable();

setFilterCriteria(criteria: string | null): void {
  this.filterCriteriaSubject.next(criteria);
}

  private HeaderfilterlaptopbybrandCriteriaSubject = new BehaviorSubject<string | null>(null);
  HeaderfilterlaptopbybrandCriteria$ = this.HeaderfilterlaptopbybrandCriteriaSubject.asObservable();

setHeaderFilterlaptopbybrandCriteria(criteria: string | null): void {
  this.HeaderfilterlaptopbybrandCriteriaSubject.next(criteria);
}
private HeaderfilterbybrandCriteriaSubject = new BehaviorSubject<string | null>(null);
HeaderfilterbybrandCriteria$ = this.HeaderfilterbybrandCriteriaSubject.asObservable();

setHeaderFilterbybrandCriteria(criteria: string | null): void {
  this.HeaderfilterbybrandCriteriaSubject.next(criteria);
}
private HeaderfilterbyAppletyprCriteriaSubject = new BehaviorSubject<string | null>(null);
HeaderfilterbyApplebytypeCriteria$ = this.HeaderfilterbyAppletyprCriteriaSubject.asObservable();

setHeaderFilterbyAppletypeCriteria(criteria: string | null): void {
  this.HeaderfilterbyAppletyprCriteriaSubject.next(criteria);
}

}
