import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Employees</h1>
        <p class="text-muted-foreground">Manage employee information</p>
      </div>
      
      <div class="bg-card rounded-lg border p-6">
        <p class="text-muted-foreground">Employee management functionality will be implemented here.</p>
      </div>
    </div>
  `,
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {}
