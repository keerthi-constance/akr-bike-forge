import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, CommonModule],
  template: `
    <div *ngIf="showLayout; else noLayout">
      <app-layout>
        <router-outlet></router-outlet>
      </app-layout>
    </div>
    
    <ng-template #noLayout>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AKR Bike Management System';
  showLayout = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Listen to route changes to determine if layout should be shown
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('Route changed to:', event.url);
      // Hide layout for login page
      this.showLayout = !event.url.includes('/login');
    });

    // Check initial route
    console.log('Initial URL:', this.router.url);
    this.showLayout = !this.router.url.includes('/login');
  }
}
