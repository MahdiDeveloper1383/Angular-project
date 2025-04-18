import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Users } from '../../Shared/Model/Users/Usersmodel';

@Injectable({
  providedIn: 'root'
})
export class AuthUsersService {
  private usersSubject = new BehaviorSubject<Users[]>([]); // BehaviorSubject to manage the Users array
  users$ = this.usersSubject.asObservable();
  constructor(private http:HttpClient) {
    this.http.get<Users[]>("../assets/Jsons/Users/Users.json").subscribe((Users)=>{
      this.usersSubject.next(Users)
    })
   }
  
  GetUSers():Observable<Users[]>{
    return this.users$
  }
  AddnewUser(newUser:Users){
    const currentUsers = this.usersSubject.value; // Get the current Users array
    currentUsers.push(newUser); // Add the new user
    this.usersSubject.next(currentUsers);
  }
  resetPassword(email:string){
    return this.http.post('../assets/Jsons/Users/Users.json',email)
  }
}
