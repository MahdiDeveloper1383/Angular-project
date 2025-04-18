import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { AuthUsersService } from '../Services/Users/auth-users.service';
import { Users } from '../Shared/Model/Users/Usersmodel';
import { AuthService } from '../Services/Users/auth.service';
@Component({
  selector: 'app-log-in',
  imports: [RouterModule,FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit{
  constructor(private USerserv:AuthUsersService,
    private route:Router,
    private AuthServ:AuthService,
    private render:Renderer2
  ){}
  Users!:Users[]
  Islogged!:boolean
  @ViewChild('Wrraning',{static:true}) Wrraning!:ElementRef
  ngOnInit(): void {
    this.USerserv.users$.subscribe((users)=>{
      this.Users = users
    })
  }
  Loginbut(Username:HTMLInputElement,Password:HTMLInputElement){
    const user = this.Users.find(u=>u.Username === Username.value && u.Password === Password.value)
    if (user) {
      this.AuthServ.setUser(user) // Set the logged-in user in the AuthService
      setTimeout(() => {
        if (user.IsAdmin) {
          this.route.navigate(['/admin']); // Navigate to admin page if the user is an admin
        } else {
          this.route.navigate(['/']);
        }
      }, 500);
    } else {
      this.render.setAttribute(this.Wrraning.nativeElement,'class','Invalid-data')// Handle invalid login
      setTimeout(() => {
      this.render.setAttribute(this.Wrraning.nativeElement,'class','Invalid-data-hide')// Handle invalid login
      }, 5000);
    
    }
  }
}

