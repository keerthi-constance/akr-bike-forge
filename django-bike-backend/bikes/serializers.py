from rest_framework import serializers
from .models import Bike, Customer, Supplier, Employee, Sale, Purchase, Service

class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = ['id', 'model_name', 'brand', 'type', 'price', 'stock_quantity', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'phone', 'address', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'name', 'email', 'phone', 'address', 'contact_person', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name', 'email', 'phone', 'position', 'salary', 'hire_date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class SaleSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()
    bike_name = serializers.SerializerMethodField()

    class Meta:
        model = Sale
        fields = ['id', 'customer_id', 'bike_id', 'quantity', 'total_amount', 'sale_date', 
                 'customer_name', 'bike_name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'customer_name', 'bike_name', 'created_at', 'updated_at']

    def get_customer_name(self, obj):
        customer = obj.get_customer()
        return customer.name if customer else None

    def get_bike_name(self, obj):
        bike = obj.get_bike()
        return f"{bike.brand} {bike.model_name}" if bike else None

class PurchaseSerializer(serializers.ModelSerializer):
    supplier_name = serializers.SerializerMethodField()
    bike_name = serializers.SerializerMethodField()

    class Meta:
        model = Purchase
        fields = ['id', 'supplier_id', 'bike_id', 'quantity', 'unit_cost', 'total_cost', 
                 'purchase_date', 'supplier_name', 'bike_name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'supplier_name', 'bike_name', 'created_at', 'updated_at']

    def get_supplier_name(self, obj):
        supplier = obj.get_supplier()
        return supplier.name if supplier else None

    def get_bike_name(self, obj):
        bike = obj.get_bike()
        return f"{bike.brand} {bike.model_name}" if bike else None

class ServiceSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()
    bike_name = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ['id', 'customer_id', 'bike_id', 'service_type', 'description', 'cost', 
                 'service_date', 'status', 'customer_name', 'bike_name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'customer_name', 'bike_name', 'created_at', 'updated_at']

    def get_customer_name(self, obj):
        customer = obj.get_customer()
        return customer.name if customer else None

    def get_bike_name(self, obj):
        bike = obj.get_bike()
        return f"{bike.brand} {bike.model_name}" if bike else None

# Dashboard Statistics Serializer
class DashboardStatsSerializer(serializers.Serializer):
    total_bikes = serializers.IntegerField()
    total_customers = serializers.IntegerField()
    total_sales = serializers.IntegerField()
    total_services = serializers.IntegerField()
    low_stock = serializers.IntegerField()
    recent_sales_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
