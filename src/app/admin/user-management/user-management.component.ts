import { Component, OnInit } from '@angular/core';
import { Users } from '../../Shared/Model/Users/Usersmodel';
import { AuthUsersService } from '../../Services/Users/auth-users.service';
import { NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/Users/auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-management',
  imports: [SlicePipe,NgFor,FormsModule,NgClass,RouterModule,RouterOutlet],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit{
  Users!:Users[]
  User!:Users
  constructor(private User_serv:AuthUsersService,
    private Auth_user:AuthService
  ){}
  ngOnInit(): void {
    this.User_serv.users$.subscribe((data)=>{
      this.Users = data
    })
  }
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  get filteredUsers() {
    return this.Users.filter((user) =>
      user.Username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  Del_User_but(Id:number): void {
    this.User_serv.deleteUser(Id)
  }
}
