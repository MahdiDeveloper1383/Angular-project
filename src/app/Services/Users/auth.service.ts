import { Injectable } from '@angular/core';
import { Users } from '../../Shared/Model/Users/Usersmodel';
import { BehaviorSubject } from 'rxjs';

const LOCAL_STORAGE_USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: Users | null = null;
  Islog:boolean = false
  constructor() {}
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.IsLogged());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();


  setUser(user: Users): void {
    try{
    this.currentUser = user;
    this.Islog = true;
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    this.isLoggedInSubject.next(true);
    }catch(error){
      throw error
    }
  }
  IsLogged():boolean{
    this.Islog = !!localStorage.getItem(LOCAL_STORAGE_USER_KEY); 
    return this.Islog;
  }
  logout(){
    try{
    this.currentUser = null;
    this.Islog = false;
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    this.isLoggedInSubject.next(false);
    }catch(error){
      throw error
    }
  }
  getUser(): Users | null {
    try {
      if (this.currentUser) {
        return this.currentUser;
      }
      const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (user) {
        try {
          this.currentUser = JSON.parse(user);
        } catch (error) {
          throw error
          localStorage.removeItem(LOCAL_STORAGE_USER_KEY); // Clear corrupted data
          return null;
        }
      }
      return this.currentUser;
    } catch (error) {
      throw error
      return null;
    }
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.IsAdmin || false;
  }
  getUsername():string | null{
    const user = this.getUser();
    return user?.Username || null;
  }
}
