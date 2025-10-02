import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, DashboardStats } from '../../services/supabase.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <p class="text-muted-foreground">Welcome to AKR Bike Management System</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let card of statCards" 
             class="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">{{ card.title }}</p>
              <p class="text-2xl font-bold">{{ card.value }}</p>
              <p class="text-xs text-muted-foreground mt-1">{{ card.description }}</p>
            </div>
            <div [class]="'w-12 h-12 rounded-lg flex items-center justify-center ' + card.bgColor">
              <span [innerHTML]="card.icon"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-card rounded-lg border p-6">
          <h3 class="text-lg font-semibold mb-4">Recent Activity</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-sm">New bike added to inventory</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span class="text-sm">Customer service completed</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span class="text-sm">Low stock alert for Mountain Bike</span>
            </div>
          </div>
        </div>

        <div class="bg-card rounded-lg border p-6">
          <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
          <div class="grid grid-cols-2 gap-3">
            <button class="p-4 text-left bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              <div class="text-sm font-medium">Add New Bike</div>
              <div class="text-xs opacity-90">Manage inventory</div>
            </button>
            <button class="p-4 text-left bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
              <div class="text-sm font-medium">New Customer</div>
              <div class="text-xs opacity-90">Register customer</div>
            </button>
            <button class="p-4 text-left bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors">
              <div class="text-sm font-medium">Record Sale</div>
              <div class="text-xs opacity-90">Process transaction</div>
            </button>
            <button class="p-4 text-left bg-muted text-muted-foreground rounded-md hover:bg-muted/90 transition-colors">
              <div class="text-sm font-medium">Service Request</div>
              <div class="text-xs opacity-90">Schedule service</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    total_bikes: 0,
    total_customers: 0,
    total_sales: 0,
    total_services: 0,
    low_stock: 0,
    recent_sales_amount: 0,
  };

  statCards: any[] = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    await this.fetchStats();
    this.updateStatCards();
  }

  async fetchStats() {
    try {
      this.apiService.getDashboardStats().subscribe({
        next: (stats) => {
          this.stats = stats;
          this.updateStatCards();
        },
        error: (error) => {
          console.error('Error fetching stats:', error);
        }
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  updateStatCards() {
    this.statCards = [
      {
        title: 'Total Bikes',
        value: this.stats.total_bikes,
        description: 'In inventory',
        icon: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
        bgColor: 'bg-blue-500'
      },
      {
        title: 'Total Customers',
        value: this.stats.total_customers,
        description: 'Registered customers',
        icon: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg>',
        bgColor: 'bg-green-500'
      },
      {
        title: 'Total Sales',
        value: this.stats.total_sales,
        description: 'Completed transactions',
        icon: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path></svg>',
        bgColor: 'bg-purple-500'
      },
      {
        title: 'Services',
        value: this.stats.total_services,
        description: 'Service requests',
        icon: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
        bgColor: 'bg-orange-500'
      },
      {
        title: 'Low Stock Items',
        value: this.stats.low_stock,
        description: 'Need attention',
        icon: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>',
        bgColor: 'bg-red-500'
      },
      {
        title: 'Revenue',
        value: `$${Number(this.stats.recent_sales_amount).toLocaleString()}`,
        description: 'Total sales amount',
        icon: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>',
        bgColor: 'bg-emerald-500'
      }
    ];
  }
}
