import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthUsersService } from '../../Services/Users/auth-users.service';
import { Users } from '../../Shared/Model/Users/Usersmodel';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  imports: [FormsModule,RouterModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit{
  user!: Users
  EditedUser!:Users
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: AuthUsersService
  ) {}

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.GetUSers().subscribe((users) => {
    this.user=users.find((u) => u.Id === userId) || this.user;
    });
  }

  onSubmit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.EditedUser={
    Id:userId,
    Username : this.user.Username,
    Gmail :this.user.Gmail,
    IsAdmin :this.user.IsAdmin,
    Password:this.user.Password,
    City:this.user.City,
    First_Name:this.user.First_Name,
    Last_Name:this.user.Last_Name
    }
    this.router.navigate(['/admin/Users'])
    this.userService.updateUser(this.EditedUser)
  }
}
