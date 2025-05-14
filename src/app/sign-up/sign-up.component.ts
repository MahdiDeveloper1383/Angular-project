import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Users } from '../Shared/Model/Users/Usersmodel';
import { AuthUsersService } from '../Services/Users/auth-users.service';
import { log } from 'node:console';
import { FormsModule } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  imports: [RouterModule,FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit{
  @ViewChildren('Invalid_pssword') Invalid_pssword!:QueryList<ElementRef>;
  @ViewChild('Username') Username!:ElementRef
  constructor(private Userserv:AuthUsersService,
    private Render:Renderer2,
    private route:Router
  ){}
  Users!:Users[]
  New_User!:Users
  Match_password:string=""
  Wrong_username:string=""
  Wrong_password:string=""
  ngOnInit(): void {
    this.Userserv.users$.subscribe((data)=>{
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
      const usernameExists = this.Users.some((user)=>user.Username === Username.value)
      if (Password.value != Re_Password.value) {
        this.Match_password = 'Password is Not match'
        setTimeout(() => {
          this.Match_password = ''
        }, 3000);
      }
      else if (Username.value.length <= 3 || Username.value.length == 0) {
        this.Wrong_username = 'Username must be more than 3 Character'
        setTimeout(() => {
          this.Wrong_username=''
        }, 3000);
      }
      else if (usernameExists) {
        alert("This username has already been used")
      }
      else if (Password.value.length <= 8 || Username.value.length == 0) {
        this.Wrong_password = 'Username must be more than 3 Character'
        setTimeout(() => {
          this.Wrong_password =''
        }, 3000);
      }
      else if (!Gmail.value.includes('@gmail') && !Gmail.value.includes('@email')) {
        alert('gmail must have @email or gmail')
      }
      else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(Password.value)) {
        this.Wrong_password = 'Password must include uppercase, lowercase, number, and special character';
        setTimeout(() => {
          this.Wrong_password = '';
        }, 3000);
      }
      else if (First_Name.value==" "&&
        Last_Name.value==" "&&
        Username.value==" "&&
        Gmail.value==" "&&
        City.value==" "&&
        Password.value ==" "&&
        Re_Password.value==" "
      ) {
        alert("fill form")
      }
      else{
      this.New_User = {Id:this.Users.length+1,Username:Username.value,First_Name:First_Name.value,Last_Name:Last_Name.value,Gmail:Gmail.value,City:City.value,Password:Password.value,IsAdmin:false}
      this.Userserv.AddnewUser(this.New_User)
      this.route.navigate(['/login'])
      let users=localStorage.getItem('users')
      if (users) {
        const parsedUsers = JSON.parse(users);
        parsedUsers.push(this.New_User);
        localStorage.setItem('users', JSON.stringify(parsedUsers));
      } else {
        localStorage.setItem('users', JSON.stringify([this.New_User]));
      }
  }
}
  Username_inp(User_Name:HTMLInputElement){
    if (User_Name.value.length <=3) {
      this.Render.setStyle(User_Name, 'boxShadow', '6px 3px 1.5px red');
    }
    else if (User_Name.value.length >3) {
      this.Render.setStyle(User_Name, 'boxShadow', '6px 3px 1.5px green');
    }
    else{
      this.Render.setStyle(User_Name, 'boxShadow', '');
    }
  }
  Password_inp(User_Password:HTMLInputElement){
    if (User_Password.value.length <=8) {
      this.Render.setStyle(User_Password, 'boxShadow', '6px 3px 1.5px red');
    }
    else if (User_Password.value.length >8) {
      this.Render.setStyle(User_Password, 'boxShadow', '6px 3px 1.5px green');
    }
    else{
      this.Render.setStyle(User_Password, 'boxShadow', '');
    }
  }

}
