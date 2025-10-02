import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Customers</h1>
        <p class="text-muted-foreground">Manage customer information</p>
      </div>
      
      <div class="bg-card rounded-lg border p-6">
        <p class="text-muted-foreground">Customer management functionality will be implemented here.</p>
      </div>
    </div>
  `,
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    // Implementation coming soon
  }
}
