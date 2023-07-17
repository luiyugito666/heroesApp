import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
 
const checkAuthStatus = (): Observable<boolean> => {
  //se inyectan el AuthService y el Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
 
  return authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated=>console.log(isAuthenticated))
      ,tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['./auth/login']);
      }
    }));
};
  //Hay que tener en cuenta el tipado CanActiveFn
export const canActivateGuard: CanActivateFn = (

  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  
 
  return checkAuthStatus();
};
   //Tipado CanMatchFN
export const canMatchGuard: CanMatchFn = (

  route: Route,
  segments: UrlSegment[]
):Observable<boolean>=> {
  
 
  return checkAuthStatus();
};