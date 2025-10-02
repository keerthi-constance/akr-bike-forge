from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'bikes', views.BikeViewSet)
router.register(r'customers', views.CustomerViewSet)
router.register(r'suppliers', views.SupplierViewSet)
router.register(r'employees', views.EmployeeViewSet)
router.register(r'sales', views.SaleViewSet)
router.register(r'purchases', views.PurchaseViewSet)
router.register(r'services', views.ServiceViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/dashboard/stats/', views.dashboard_stats, name='dashboard-stats'),
    path('api/dashboard/low-stock/', views.low_stock_bikes, name='low-stock-bikes'),
    path('api/dashboard/recent-sales/', views.recent_sales, name='recent-sales'),
    path('api/dashboard/pending-services/', views.pending_services, name='pending-services'),
]
