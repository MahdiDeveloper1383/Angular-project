import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Users } from '../../Shared/Model/Users/Usersmodel';

@Injectable({
  providedIn: 'root'
})
export class AuthUsersService {
  private usersSubject = new BehaviorSubject<Users[]>([]);
  users$ = this.usersSubject.asObservable();
  private users: Users[] = [];
  constructor(private http:HttpClient) {
    this.loadUsers()
  }
  private isLoaded = false;

private loadUsers(): void {
  if (!this.isLoaded) {
    this.GetUSers().subscribe((data) => {
      this.users = data;
      this.usersSubject.next(data);
      this.isLoaded = true;
    });
  }
}
  GetUSers():Observable<Users[]>{
    return this.http.get<Users[]>("../assets/Jsons/Users/Users.json")
  }
  AddnewUser(newUser:Users){
    const currentUsers = this.usersSubject.value; // Get the current Users array
    currentUsers.push(newUser); // Add the new user
    this.usersSubject.next(currentUsers);
  }
  resetPassword(email:string){
    return this.http.post('../assets/Jsons/Users/Users.json',email)
  }
  updateUser(updatedUser: Users) {
    const index = this.users.findIndex(u => u.Id=== updatedUser.Id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.usersSubject.next([...this.users]);
    }
  }
  
  deleteUser(id: number) {
    this.users = this.users.filter(u => u.Id !== id);
    this.usersSubject.next([...this.users]);
  }
  
  
}
