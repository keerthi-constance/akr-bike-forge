import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Purchases</h1>
        <p class="text-muted-foreground">Manage purchase orders</p>
      </div>
      
      <div class="bg-card rounded-lg border p-6">
        <p class="text-muted-foreground">Purchase management functionality will be implemented here.</p>
      </div>
    </div>
  `,
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent {}
