from django.contrib import admin
from .models import Bike, Customer, Supplier, Employee, Sale, Purchase, Service

@admin.register(Bike)
class BikeAdmin(admin.ModelAdmin):
    list_display = ['model_name', 'brand', 'type', 'price', 'stock_quantity', 'created_at']
    list_filter = ['brand', 'type', 'created_at']
    search_fields = ['model_name', 'brand', 'type']
    ordering = ['-created_at']

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'created_at']
    search_fields = ['name', 'email', 'phone']
    ordering = ['-created_at']

@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'contact_person', 'created_at']
    search_fields = ['name', 'email', 'contact_person']
    ordering = ['-created_at']

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'position', 'salary', 'hire_date', 'created_at']
    list_filter = ['position', 'hire_date']
    search_fields = ['name', 'email', 'position']
    ordering = ['-created_at']

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer_id', 'bike_id', 'quantity', 'total_amount', 'sale_date']
    list_filter = ['sale_date', 'created_at']
    ordering = ['-created_at']

@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ['id', 'supplier_id', 'bike_id', 'quantity', 'total_cost', 'purchase_date']
    list_filter = ['purchase_date', 'created_at']
    ordering = ['-created_at']

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer_id', 'service_type', 'cost', 'status', 'service_date']
    list_filter = ['status', 'service_type', 'service_date']
    search_fields = ['service_type', 'description']
    ordering = ['-created_at']