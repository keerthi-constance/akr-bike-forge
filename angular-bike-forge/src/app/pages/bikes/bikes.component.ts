import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Bike } from '../../services/supabase.service';


@Component({
  selector: 'app-bikes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold">Bikes Inventory</h1>
          <p class="text-muted-foreground">Manage your bike inventory</p>
        </div>
        <button 
          (click)="openDialog()"
          class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Bike
        </button>
      </div>

      <!-- Bikes Table -->
      <div class="bg-card rounded-lg border overflow-hidden">
        <table class="w-full">
          <thead class="bg-muted/50">
            <tr>
              <th class="text-left p-4 font-medium">Model Name</th>
              <th class="text-left p-4 font-medium">Brand</th>
              <th class="text-left p-4 font-medium">Type</th>
              <th class="text-left p-4 font-medium">Price</th>
              <th class="text-left p-4 font-medium">Stock</th>
              <th class="text-left p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let bike of bikes" class="border-t hover:bg-muted/25">
              <td class="p-4 font-medium">{{ bike.model_name }}</td>
              <td class="p-4">{{ bike.brand }}</td>
              <td class="p-4">{{ bike.type }}</td>
              <td class="p-4">\${{ bike.price }}</td>
              <td class="p-4">{{ bike.stock_quantity }}</td>
              <td class="p-4">
                <div class="flex gap-2">
                  <button 
                    (click)="editBike(bike)"
                    class="p-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button 
                    (click)="deleteBike(bike.id)"
                    class="p-2 hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal Dialog -->
      <div *ngIf="isDialogOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-card rounded-lg p-6 w-full max-w-md mx-4">
          <h2 class="text-xl font-semibold mb-4">{{ editingBike ? 'Edit' : 'Add' }} Bike</h2>
          
          <form (ngSubmit)="handleSubmit()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Model Name</label>
              <input 
                [(ngModel)]="formData.model_name"
                name="model_name"
                type="text" 
                required
                class="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Brand</label>
              <input 
                [(ngModel)]="formData.brand"
                name="brand"
                type="text" 
                required
                class="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Type</label>
              <input 
                [(ngModel)]="formData.type"
                name="type"
                type="text" 
                required
                class="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Price</label>
              <input 
                [(ngModel)]="formData.price"
                name="price"
                type="number" 
                step="0.01"
                required
                class="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Stock Quantity</label>
              <input 
                [(ngModel)]="formData.stock_quantity"
                name="stock_quantity"
                type="number" 
                required
                class="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
            </div>
            
            <div class="flex gap-3 pt-4">
              <button 
                type="submit"
                class="flex-1 bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                {{ editingBike ? 'Update' : 'Create' }}
              </button>
              <button 
                type="button"
                (click)="closeDialog()"
                class="flex-1 bg-secondary text-secondary-foreground py-2 rounded-md hover:bg-secondary/90 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./bikes.component.scss']
})
export class BikesComponent implements OnInit {
  bikes: Bike[] = [];
  isDialogOpen = false;
  editingBike: Bike | null = null;
  
  formData = {
    model_name: '',
    brand: '',
    type: '',
    price: 0,
    stock_quantity: 0
  };

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    await this.fetchBikes();
  }

  async fetchBikes() {
    try {
      this.apiService.getBikes().subscribe({
        next: (bikes) => {
          this.bikes = bikes;
        },
        error: (error) => {
          console.error('Error fetching bikes:', error);
        }
      });
    } catch (error) {
      console.error('Error fetching bikes:', error);
    }
  }

  openDialog() {
    this.editingBike = null;
    this.resetForm();
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.editingBike = null;
    this.resetForm();
  }

  editBike(bike: Bike) {
    this.editingBike = bike;
    this.formData = {
      model_name: bike.model_name,
      brand: bike.brand,
      type: bike.type,
      price: bike.price,
      stock_quantity: bike.stock_quantity
    };
    this.isDialogOpen = true;
  }

  async handleSubmit() {
    try {
      if (this.editingBike) {
        this.apiService.updateBike(this.editingBike.id!, this.formData).subscribe({
          next: () => {
            console.log('Bike updated successfully');
            this.closeDialog();
            this.fetchBikes();
          },
          error: (error) => {
            console.error('Error updating bike:', error);
          }
        });
      } else {
        this.apiService.createBike(this.formData).subscribe({
          next: () => {
            console.log('Bike created successfully');
            this.closeDialog();
            this.fetchBikes();
          },
          error: (error) => {
            console.error('Error creating bike:', error);
          }
        });
      }
    } catch (error) {
      console.error('Error saving bike:', error);
    }
  }

  async deleteBike(id: string) {
    if (confirm('Are you sure you want to delete this bike?')) {
      try {
        this.apiService.deleteBike(id).subscribe({
          next: () => {
            console.log('Bike deleted successfully');
            this.fetchBikes();
          },
          error: (error) => {
            console.error('Error deleting bike:', error);
          }
        });
      } catch (error) {
        console.error('Error deleting bike:', error);
      }
    }
  }

  resetForm() {
    this.formData = {
      model_name: '',
      brand: '',
      type: '',
      price: 0,
      stock_quantity: 0
    };
  }
}
