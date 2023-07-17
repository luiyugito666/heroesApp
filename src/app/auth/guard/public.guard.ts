import { inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
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
      if (isAuthenticated) {
        router.navigate(['./']);
      }
      }),
    map(isAuthenticated=>!isAuthenticated),
  );
};
  //Hay que tener en cuenta el tipado CanActiveFn
export const canPublicActivateGuard: CanActivateFn = (

  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):Observable<boolean> => {
  
 
  return checkAuthStatus();
};
   //Tipado CanMatchFN
export const canPublicMatchGuard: CanMatchFn = (

  route: Route,
  segments: UrlSegment[]
):Observable<boolean>=> {
  
 
  return checkAuthStatus();
};