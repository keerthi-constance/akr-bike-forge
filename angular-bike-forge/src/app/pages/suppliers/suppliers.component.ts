import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Suppliers</h1>
        <p class="text-muted-foreground">Manage supplier information</p>
      </div>
      
      <div class="bg-card rounded-lg border p-6">
        <p class="text-muted-foreground">Supplier management functionality will be implemented here.</p>
      </div>
    </div>
  `,
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent {}
