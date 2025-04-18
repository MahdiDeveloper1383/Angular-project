import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/Users/auth.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn:'root'
})
export class adminGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true; // Allow access if the user is an admin
    }
    this.router.navigate(['/login']); // Redirect to login if not an admin
    return false;
  }
}

