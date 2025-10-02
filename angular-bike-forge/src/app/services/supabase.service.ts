import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Bike {
  id?: string;
  model_name: string;
  brand: string;
  type: string;
  price: number;
  stock_quantity: number;
  created_at?: string;
  updated_at?: string;
}

export interface Customer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at?: string;
  updated_at?: string;
}

export interface Supplier {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  contact_person: string;
  created_at?: string;
  updated_at?: string;
}

export interface Employee {
  id?: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  salary: number;
  hire_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface Sale {
  id?: string;
  customer_id: string;
  bike_id: string;
  quantity: number;
  total_amount: number;
  sale_date: string;
  customer_name?: string;
  bike_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Purchase {
  id?: string;
  supplier_id: string;
  bike_id: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  purchase_date: string;
  supplier_name?: string;
  bike_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id?: string;
  customer_id: string;
  bike_id?: string;
  service_type: string;
  description: string;
  cost: number;
  service_date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  customer_name?: string;
  bike_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardStats {
  total_bikes: number;
  total_customers: number;
  total_sales: number;
  total_services: number;
  low_stock: number;
  recent_sales_amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Dashboard
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/api/dashboard/stats/`);
  }

  getLowStockBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(`${this.apiUrl}/api/dashboard/low-stock/`);
  }

  getRecentSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/api/dashboard/recent-sales/`);
  }

  getPendingServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/api/dashboard/pending-services/`);
  }

  // Bikes
  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(`${this.apiUrl}/api/bikes/`);
  }

  getBike(id: string): Observable<Bike> {
    return this.http.get<Bike>(`${this.apiUrl}/api/bikes/${id}/`);
  }

  createBike(bike: Bike): Observable<Bike> {
    return this.http.post<Bike>(`${this.apiUrl}/api/bikes/`, bike, this.httpOptions);
  }

  updateBike(id: string, bike: Partial<Bike>): Observable<Bike> {
    return this.http.put<Bike>(`${this.apiUrl}/api/bikes/${id}/`, bike, this.httpOptions);
  }

  deleteBike(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/bikes/${id}/`);
  }

  // Customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/api/customers/`);
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/api/customers/${id}/`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/api/customers/`, customer, this.httpOptions);
  }

  updateCustomer(id: string, customer: Partial<Customer>): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/api/customers/${id}/`, customer, this.httpOptions);
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/customers/${id}/`);
  }

  // Suppliers
  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}/api/suppliers/`);
  }

  getSupplier(id: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/api/suppliers/${id}/`);
  }

  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.apiUrl}/api/suppliers/`, supplier, this.httpOptions);
  }

  updateSupplier(id: string, supplier: Partial<Supplier>): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.apiUrl}/api/suppliers/${id}/`, supplier, this.httpOptions);
  }

  deleteSupplier(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/suppliers/${id}/`);
  }

  // Employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/api/employees/`);
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/api/employees/${id}/`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/api/employees/`, employee, this.httpOptions);
  }

  updateEmployee(id: string, employee: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/api/employees/${id}/`, employee, this.httpOptions);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/employees/${id}/`);
  }

  // Sales
  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/api/sales/`);
  }

  getSale(id: string): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}/api/sales/${id}/`);
  }

  createSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(`${this.apiUrl}/api/sales/`, sale, this.httpOptions);
  }

  updateSale(id: string, sale: Partial<Sale>): Observable<Sale> {
    return this.http.put<Sale>(`${this.apiUrl}/api/sales/${id}/`, sale, this.httpOptions);
  }

  deleteSale(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/sales/${id}/`);
  }

  // Purchases
  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.apiUrl}/api/purchases/`);
  }

  getPurchase(id: string): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.apiUrl}/api/purchases/${id}/`);
  }

  createPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.apiUrl}/api/purchases/`, purchase, this.httpOptions);
  }

  updatePurchase(id: string, purchase: Partial<Purchase>): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.apiUrl}/api/purchases/${id}/`, purchase, this.httpOptions);
  }

  deletePurchase(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/purchases/${id}/`);
  }

  // Services
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/api/services/`);
  }

  getService(id: string): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/api/services/${id}/`);
  }

  createService(service: Service): Observable<Service> {
    return this.http.post<Service>(`${this.apiUrl}/api/services/`, service, this.httpOptions);
  }

  updateService(id: string, service: Partial<Service>): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrl}/api/services/${id}/`, service, this.httpOptions);
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/services/${id}/`);
  }
}
