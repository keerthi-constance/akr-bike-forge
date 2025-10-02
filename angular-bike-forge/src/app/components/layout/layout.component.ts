import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  template: `
    <div class="min-h-screen flex w-full">
      <app-sidebar></app-sidebar>
      <main class="flex-1 flex flex-col">
        <header class="h-16 border-b bg-card flex items-center justify-between px-6">
          <button 
            (click)="toggleSidebar()"
            class="p-2 hover:bg-accent rounded-md"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          
          <div class="flex items-center gap-4">
            <span class="text-sm text-muted-foreground">
              AKR BIKE Management System
            </span>
            
            <!-- User Info and Logout -->
            <div class="flex items-center gap-3 ml-4 pl-4 border-l">
              <div class="text-right">
                <p class="text-sm font-medium text-foreground">{{ getUserDisplayName() }}</p>
                <p class="text-xs text-muted-foreground">{{ currentUser?.username }}</p>
              </div>
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span class="text-xs font-medium text-primary-foreground">
                  {{ getUserInitials() }}
                </span>
              </div>
              <button 
                (click)="logout()"
                class="p-2 hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors"
                title="Logout"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
              </button>
            </div>
          </div>
        </header>
        <div class="flex-1 p-6">
          <ng-content></ng-content>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  sidebarCollapsed = false;
  currentUser: User | null = null;
  private userSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  getUserDisplayName(): string {
    return this.authService.getUserDisplayName();
  }

  getUserInitials(): string {
    const user = this.currentUser;
    if (user) {
      if (user.first_name && user.last_name) {
        return (user.first_name.charAt(0) + user.last_name.charAt(0)).toUpperCase();
      }
      return user.username.charAt(0).toUpperCase();
    }
    return 'U';
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
