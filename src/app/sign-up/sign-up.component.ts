import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Users } from '../Shared/Model/Users/Usersmodel';
import { AuthUsersService } from '../Services/Users/auth-users.service';
import { log } from 'node:console';

@Component({
  selector: 'app-sign-up',
  imports: [RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit{
  
  constructor(private Userserv:AuthUsersService){}
  Users!:Users[]
  New_User!:Users
  ngOnInit(): void {
    this.Userserv.GetUSers().subscribe((data)=>{
      this.Users = data
    })
  }
  SignUpbut(
    First_Name:HTMLInputElement,
    Last_Name:HTMLInputElement,
    Username:HTMLInputElement,
    Gmail:HTMLInputElement,
    City:HTMLInputElement,
    Password:HTMLInputElement,
    Re_Password:HTMLInputElement,
    event:Event){
      event.preventDefault()
      this.New_User = {Id:this.Users.length+1,Username:Username.value,First_Name:First_Name.value,Last_Name:Last_Name.value,Gmail:Gmail.value,City:City.value,Password:Password.value,IsAdmin:false}
      this.Userserv.AddnewUser(this.New_User);
      
  }
}
