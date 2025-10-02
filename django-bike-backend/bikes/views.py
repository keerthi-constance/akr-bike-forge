from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, Count
from django.utils import timezone
from datetime import datetime, timedelta
from .models import Bike, Customer, Supplier, Employee, Sale, Purchase, Service
from .serializers import (
    BikeSerializer, CustomerSerializer, SupplierSerializer, 
    EmployeeSerializer, SaleSerializer, PurchaseSerializer, 
    ServiceSerializer, DashboardStatsSerializer
)

class BikeViewSet(viewsets.ModelViewSet):
    queryset = Bike.objects.all()
    serializer_class = BikeSerializer

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def perform_create(self, serializer):
        # Update bike stock when creating a sale
        sale = serializer.save()
        try:
            bike = Bike.objects.get(id=sale.bike_id)
            bike.stock_quantity -= sale.quantity
            bike.save()
        except Bike.DoesNotExist:
            pass

class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

    def perform_create(self, serializer):
        # Update bike stock when creating a purchase
        purchase = serializer.save()
        try:
            bike = Bike.objects.get(id=purchase.bike_id)
            bike.stock_quantity += purchase.quantity
            bike.save()
        except Bike.DoesNotExist:
            pass

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

@api_view(['GET'])
def dashboard_stats(request):
    """
    Get dashboard statistics
    """
    try:
        # Get counts
        total_bikes = Bike.objects.count()
        total_customers = Customer.objects.count()
        total_sales = Sale.objects.count()
        total_services = Service.objects.count()
        
        # Get low stock items (less than 5)
        low_stock = Bike.objects.filter(stock_quantity__lt=5).count()
        
        # Get recent sales amount (last 30 days)
        thirty_days_ago = timezone.now() - timedelta(days=30)
        recent_sales = Sale.objects.filter(created_at__gte=thirty_days_ago)
        recent_sales_amount = recent_sales.aggregate(
            total=Sum('total_amount')
        )['total'] or 0
        
        stats = {
            'total_bikes': total_bikes,
            'total_customers': total_customers,
            'total_sales': total_sales,
            'total_services': total_services,
            'low_stock': low_stock,
            'recent_sales_amount': recent_sales_amount,
        }
        
        serializer = DashboardStatsSerializer(stats)
        return Response(serializer.data)
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def low_stock_bikes(request):
    """
    Get bikes with low stock (less than 5)
    """
    try:
        low_stock_bikes = Bike.objects.filter(stock_quantity__lt=5)
        serializer = BikeSerializer(low_stock_bikes, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def recent_sales(request):
    """
    Get recent sales (last 10)
    """
    try:
        recent_sales = Sale.objects.all()[:10]
        serializer = SaleSerializer(recent_sales, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def pending_services(request):
    """
    Get pending services
    """
    try:
        pending_services = Service.objects.filter(status='pending')
        serializer = ServiceSerializer(pending_services, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )