import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Services</h1>
        <p class="text-muted-foreground">Manage bike services</p>
      </div>
      
      <div class="bg-card rounded-lg border p-6">
        <p class="text-muted-foreground">Service management functionality will be implemented here.</p>
      </div>
    </div>
  `,
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {}
