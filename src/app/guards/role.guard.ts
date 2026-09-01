import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    
    if (this.authService.isLoggedIn() && this.authService.hasRole(expectedRole)) {
      return true;
    }
    
    // Redirect logic if unauthorized
    const user = this.authService.currentUserValue;
    if (user?.rol === 'admin') {
      this.router.navigate(['/admin']);
    } else if (user?.rol === 'cliente') {
      this.router.navigate(['/shop']);
    } else {
      this.router.navigate(['/login']);
    }
    
    return false;
  }
}
