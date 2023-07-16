import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/auth.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;


  constructor(private http: HttpClient) { }
  
  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }
  
  login(email: string, password: string): Observable<User> { 
 
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => { this.user = user; }),
        tap(user => localStorage.setItem(('token'),'aasdf3245y2b456.af4ef.a34raf') )
      
      )

  }

  checkAutenticacion():Observable<boolean>|boolean { 
    if (localStorage.getItem('token')) return false;
    const toke = localStorage.getItem('token');
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user=>this.user=user),
        map(user => !!user),
        catchError(err=>of(false))
      );

    


  }

  logout() { 

    this.user = undefined;
    localStorage.clear();
  }

}