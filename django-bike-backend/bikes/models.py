from django.db import models
from django.utils import timezone
import uuid

class Bike(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4, editable=False)
    model_name = models.CharField(max_length=100)
    brand = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'bikes'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.brand} {self.model_name}"

class Customer(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'customers'
        ordering = ['-created_at']

    def __str__(self):
        return self.name

class Supplier(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    contact_person = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'suppliers'
        ordering = ['-created_at']

    def __str__(self):
        return self.name

class Employee(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    position = models.CharField(max_length=50)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    hire_date = models.DateField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'employees'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.position}"

class Sale(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4, editable=False)
    customer_id = models.CharField(max_length=36)
    bike_id = models.CharField(max_length=36)
    quantity = models.IntegerField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    sale_date = models.DateTimeField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'sales'
        ordering = ['-created_at']

    def __str__(self):
        return f"Sale {self.id} - ${self.total_amount}"

    def get_customer(self):
        try:
            return Customer.objects.get(id=self.customer_id)
        except Customer.DoesNotExist:
            return None

    def get_bike(self):
        try:
            return Bike.objects.get(id=self.bike_id)
        except Bike.DoesNotExist:
            return None

class Purchase(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4, editable=False)
    supplier_id = models.CharField(max_length=36)
    bike_id = models.CharField(max_length=36)
    quantity = models.IntegerField()
    unit_cost = models.DecimalField(max_digits=10, decimal_places=2)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_date = models.DateTimeField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'purchases'
        ordering = ['-created_at']

    def __str__(self):
        return f"Purchase {self.id} - ${self.total_cost}"

    def get_supplier(self):
        try:
            return Supplier.objects.get(id=self.supplier_id)
        except Supplier.DoesNotExist:
            return None

    def get_bike(self):
        try:
            return Bike.objects.get(id=self.bike_id)
        except Bike.DoesNotExist:
            return None

class Service(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4, editable=False)
    customer_id = models.CharField(max_length=36)
    bike_id = models.CharField(max_length=36, null=True, blank=True)
    service_type = models.CharField(max_length=100)
    description = models.TextField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    service_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'services'
        ordering = ['-created_at']

    def __str__(self):
        return f"Service {self.id} - {self.service_type}"

    def get_customer(self):
        try:
            return Customer.objects.get(id=self.customer_id)
        except Customer.DoesNotExist:
            return None

    def get_bike(self):
        if self.bike_id:
            try:
                return Bike.objects.get(id=self.bike_id)
            except Bike.DoesNotExist:
                return None
        return None