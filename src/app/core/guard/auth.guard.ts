import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}


  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(res => {
        this.authService.checkUserLoggedIn().subscribe(
            (active ) => {
              console.log("active============",active)
                if (active['status'] == 'Success') {
                    res(true);
                } else {
                    this.router.navigate(['/authentication/signin']);
                    res(false);
                }
            },
            (error) => {
                this.router.navigate(['/authentication/signin']);
                res(false);
            }
        );
    });
}
}
