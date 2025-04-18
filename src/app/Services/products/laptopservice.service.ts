import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Laptop } from '../../Shared/Model/Products/LaptopModel';

@Injectable({
  providedIn: 'root'
})
export class LaptopserviceService {

  constructor(private http:HttpClient) { }
  getlaptop():Observable<Laptop[]>{
    return this.http.get<Laptop[]>("../assets/Jsons/Products/Laptops.json")
  }
}
