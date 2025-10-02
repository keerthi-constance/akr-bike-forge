import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
  id?: string;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    // For demo purposes, start with no user logged in
    // Remove any existing user data to force login
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    // For debugging - always return false to force login
    return false;
    // return this.currentUserSubject.value !== null;
  }

  login(credentials: LoginCredentials): Observable<boolean> {
    // For demo purposes, we'll simulate authentication
    // In a real app, you'd make an API call to your Django backend
    return this.simulateLogin(credentials).pipe(
      map(response => {
        if (response.user) {
          // Store user details in local storage
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    // Remove user from local storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Simulate login for demo purposes
  private simulateLogin(credentials: LoginCredentials): Observable<LoginResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        // Demo credentials
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          const user: User = {
            id: '1',
            username: 'admin',
            email: 'admin@akrbike.com',
            first_name: 'Admin',
            last_name: 'User'
          };
          observer.next({ user, message: 'Login successful' });
        } else if (credentials.username === 'demo' && credentials.password === 'demo123') {
          const user: User = {
            id: '2',
            username: 'demo',
            email: 'demo@akrbike.com',
            first_name: 'Demo',
            last_name: 'User'
          };
          observer.next({ user, message: 'Login successful' });
        } else {
          observer.error({ message: 'Invalid username or password' });
        }
        observer.complete();
      }, 1000); // Simulate network delay
    });
  }

  // For future Django integration
  loginWithDjango(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/auth/login/`, credentials, this.httpOptions);
  }

  // Check if user has specific role (for future use)
  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user ? user.username === 'admin' : false;
  }

  // Get user display name
  getUserDisplayName(): string {
    const user = this.currentUserValue;
    if (user) {
      if (user.first_name && user.last_name) {
        return `${user.first_name} ${user.last_name}`;
      }
      return user.username;
    }
    return '';
  }
}
