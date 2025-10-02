import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Sales</h1>
        <p class="text-muted-foreground">Manage sales transactions</p>
      </div>
      
      <div class="bg-card rounded-lg border p-6">
        <p class="text-muted-foreground">Sales management functionality will be implemented here.</p>
      </div>
    </div>
  `,
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {}
