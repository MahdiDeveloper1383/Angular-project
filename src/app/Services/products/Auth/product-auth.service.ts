import { Injectable } from '@angular/core';
import { Phones } from '../../../Shared/Model/Products/PhonesModel';
import { BehaviorSubject } from 'rxjs';
import { Laptop } from '../../../Shared/Model/Products/LaptopModel';

@Injectable({
  providedIn: 'root'
})
export class ProductAuthService {
  private currentPhones: Phones | null = null;
  private currentLaptops: Laptop | null = null;
  private Phone_Fav_num:number = 0
  private Laptop_Fav_num:number = 0
  private fav_Phone_NumSubject = new BehaviorSubject<number>(this.Phone_Fav_num);
  private fav_Laptop_NumSubject = new BehaviorSubject<number>(this.Laptop_Fav_num);
  constructor() { 
    const Fav_Phones = localStorage.getItem('fav-phone');
    if (Fav_Phones) {
      const phones_Fav_Array: Phones[] = JSON.parse(Fav_Phones)
      this.currentPhones = JSON.parse(Fav_Phones);
      this.Phone_Fav_num =phones_Fav_Array.length; // Initialize Fav_num based on stored data
      this.fav_Phone_NumSubject.next(this.Phone_Fav_num);
    }
    const Fav_Laptops = localStorage.getItem('fav-Laptop');
    if (Fav_Laptops) {
      const Laptops_Fav_Array: Laptop[] = JSON.parse(Fav_Laptops)
      this.currentLaptops = JSON.parse(Fav_Laptops);
      this.Laptop_Fav_num = Laptops_Fav_Array.length; // Initialize Fav_num based on stored data
      this.fav_Laptop_NumSubject.next(this.Laptop_Fav_num);
    }
  }
  Add_Fav_Phones(Phone:Phones){
    try{
      const Fav_Phones = localStorage.getItem('fav-phone')
      const Phone_fav_Array:Phones[] = Fav_Phones ? JSON.parse(Fav_Phones):[]
      const phoneExists = Phone_fav_Array.some((p) => p.id === Phone.id);
      if (!phoneExists) {
        Phone_fav_Array.push(Phone)
        localStorage.setItem('fav-phone',JSON.stringify(Phone_fav_Array))
        this.Phone_Fav_num++
        this.fav_Phone_NumSubject.next(this.Phone_Fav_num)
      }

    }catch(error){
     throw error
    }
  }
  Buyphone(Phone:Phones){
    try{
      this.currentPhones = Phone
      localStorage.setItem('phone',JSON.stringify(Phone))
    }catch(error){
     throw error
    }
  }
  getPhones():Phones | null{
    return this.currentPhones
  }
  get_Phone_FaveNum(){
    return this.fav_Phone_NumSubject.asObservable()
  }
  remove_Fav_phone(phoneId:number): void {
    this.currentPhones = null;
    try {
      const Fav_Phones = localStorage.getItem('fav-phone');
      if (Fav_Phones) {
        let Phone_fav_Array: Phones[] = JSON.parse(Fav_Phones);
        Phone_fav_Array = Phone_fav_Array.filter((p) => p.id !== phoneId);
        localStorage.setItem('fav-phone', JSON.stringify(Phone_fav_Array));
        this.Phone_Fav_num =Phone_fav_Array.length;
        this.fav_Phone_NumSubject.next(this.Phone_Fav_num);
      }
    } catch (error) {
      console.error('Failed to remove phone from favorites:', error);
      throw error;
    }
  }
  Add_Fav_Laptop(Laptop:Laptop){
    try{
      const Fav_Laptops = localStorage.getItem('fav-Laptop')
      const Laptop_fav_Array:Laptop[] = Fav_Laptops ? JSON.parse(Fav_Laptops):[]
      const LaptopExists = Laptop_fav_Array.some((p) => p.id === Laptop.id);
      if (!LaptopExists) {
        Laptop_fav_Array.push(Laptop)
        localStorage.setItem('fav-Laptop',JSON.stringify(Laptop_fav_Array))
        this.Laptop_Fav_num++
        this.fav_Laptop_NumSubject.next(this.Laptop_Fav_num)
      }

    }catch(error){
     throw error
    }
  }
  remove_Fav_Laptop(LapId:number): void {
    this.currentLaptops = null;
    try {
      const Fav_Laptops = localStorage.getItem('fav-Laptop');
      if (Fav_Laptops) {
        let Laptop_fav_Array: Laptop[] = JSON.parse(Fav_Laptops);
       Laptop_fav_Array = Laptop_fav_Array.filter((p) => p.id !== LapId);
        localStorage.setItem('fav-Laptop', JSON.stringify(Laptop_fav_Array));
        this.Laptop_Fav_num =Laptop_fav_Array.length;
        this.fav_Laptop_NumSubject.next(this.Laptop_Fav_num);
      }
    } catch (error) {
      console.error('Failed to remove phone from favorites:', error);
      throw error;
    }
  }
  get_Laptop_FaveNum(){
    return this.fav_Laptop_NumSubject.asObservable()
  }
}
