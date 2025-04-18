import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Phones } from '../../Shared/Model/Products/PhonesModel';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private http:HttpClient) { }
  getPhone():Observable<Phones[]>{
    return this.http.get<Phones[]>("../assets/Jsons/Products/Phones.json")
  }
}
