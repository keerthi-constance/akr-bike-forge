# AKR Bike Management System - Django Backend

This is a Django REST API backend for the AKR Bike Management System, integrated with MongoDB for data storage and designed to work with the Angular frontend.

## Features

- **RESTful API**: Complete CRUD operations for all entities
- **MongoDB Integration**: Using Djongo for MongoDB connectivity
- **CORS Support**: Configured for Angular frontend integration
- **Admin Interface**: Django admin for easy data management
- **Comprehensive Models**: Bikes, Customers, Sales, Services, Suppliers, Employees, Purchases
- **Dashboard API**: Statistics and analytics endpoints

## Technology Stack

- **Django 5.2.7**: Web framework
- **Django REST Framework**: API development
- **Djongo**: MongoDB integration for Django
- **PyMongo**: MongoDB driver
- **Django CORS Headers**: Cross-origin resource sharing
- **Python Decouple**: Environment configuration

## Prerequisites

- Python 3.8 or higher
- MongoDB running on `mongodb://localhost:27017`
- pip (Python package manager)

## Installation & Setup

### 1. Clone and Setup Environment

```bash
cd django-bike-backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Create a `.env` file in the project root:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here-change-in-production
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=bike_management
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
```

### 4. Database Setup

Make sure MongoDB is running on your system, then:

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser (optional, for admin access)
python manage.py createsuperuser
```

### 5. Run the Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- Admin: `http://localhost:8000/admin/`

### Core Entities
- **Bikes**: `/api/bikes/`
- **Customers**: `/api/customers/`
- **Suppliers**: `/api/suppliers/`
- **Employees**: `/api/employees/`
- **Sales**: `/api/sales/`
- **Purchases**: `/api/purchases/`
- **Services**: `/api/services/`

### Dashboard Endpoints
- **Statistics**: `/api/dashboard/stats/`
- **Low Stock**: `/api/dashboard/low-stock/`
- **Recent Sales**: `/api/dashboard/recent-sales/`
- **Pending Services**: `/api/dashboard/pending-services/`

### HTTP Methods Supported
- `GET`: List all items or retrieve specific item
- `POST`: Create new item
- `PUT`: Update existing item
- `DELETE`: Delete item

### Example API Calls

#### Get All Bikes
```bash
curl -X GET http://localhost:8000/api/bikes/
```

#### Create New Bike
```bash
curl -X POST http://localhost:8000/api/bikes/ \
  -H "Content-Type: application/json" \
  -d '{
    "model_name": "Mountain Explorer",
    "brand": "Trek",
    "type": "Mountain",
    "price": 599.99,
    "stock_quantity": 10
  }'
```

#### Get Dashboard Statistics
```bash
curl -X GET http://localhost:8000/api/dashboard/stats/
```

## Database Schema

### Models Overview

1. **Bike**
   - `id`, `model_name`, `brand`, `type`, `price`, `stock_quantity`
   - Timestamps: `created_at`, `updated_at`

2. **Customer**
   - `id`, `name`, `email`, `phone`, `address`
   - Timestamps: `created_at`, `updated_at`

3. **Supplier**
   - `id`, `name`, `email`, `phone`, `address`, `contact_person`
   - Timestamps: `created_at`, `updated_at`

4. **Employee**
   - `id`, `name`, `email`, `phone`, `position`, `salary`, `hire_date`
   - Timestamps: `created_at`, `updated_at`

5. **Sale**
   - `id`, `customer_id`, `bike_id`, `quantity`, `total_amount`, `sale_date`
   - Timestamps: `created_at`, `updated_at`

6. **Purchase**
   - `id`, `supplier_id`, `bike_id`, `quantity`, `unit_cost`, `total_cost`, `purchase_date`
   - Timestamps: `created_at`, `updated_at`

7. **Service**
   - `id`, `customer_id`, `bike_id`, `service_type`, `description`, `cost`, `service_date`, `status`
   - Timestamps: `created_at`, `updated_at`

## MongoDB Collections

The following collections will be created in MongoDB:
- `bikes`
- `customers`
- `suppliers`
- `employees`
- `sales`
- `purchases`
- `services`

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:4200` (Angular development server)
- `http://127.0.0.1:4200`

## Development

### Adding New Endpoints

1. Add new views in `bikes/views.py`
2. Add URL patterns in `bikes/urls.py`
3. Create/update serializers in `bikes/serializers.py`
4. Update models if needed in `bikes/models.py`

### Running Tests

```bash
python manage.py test
```

### Admin Interface

Access the Django admin at `http://localhost:8000/admin/` to:
- View and manage all data
- Add test data
- Monitor database contents

## Production Deployment

### Environment Variables

Update your production `.env` file:

```env
DEBUG=False
SECRET_KEY=your-production-secret-key
MONGODB_URI=mongodb://your-production-mongodb-uri
DATABASE_NAME=bike_management_prod
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

### Security Considerations

1. Change `SECRET_KEY` to a secure random string
2. Set `DEBUG=False` in production
3. Configure proper `ALLOWED_HOSTS`
4. Use HTTPS in production
5. Secure your MongoDB instance
6. Use environment variables for sensitive data

### Deployment Options

- **Heroku**: Use `gunicorn` and MongoDB Atlas
- **DigitalOcean**: Use Docker with MongoDB
- **AWS**: Use EC2 with DocumentDB or MongoDB Atlas
- **Docker**: Containerize the application

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify database permissions

2. **CORS Errors**
   - Check `CORS_ALLOWED_ORIGINS` in settings
   - Ensure Angular app URL is included

3. **Migration Issues**
   - Delete migration files and recreate
   - Check MongoDB connection
   - Verify model definitions

### Logs

Check Django logs for detailed error information:
```bash
python manage.py runserver --verbosity=2
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the troubleshooting section
- Review Django and MongoDB documentation
- Open an issue in the repository
