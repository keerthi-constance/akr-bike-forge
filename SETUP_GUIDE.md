# Complete Setup Guide: Angular + Django + MongoDB

This guide will help you set up the complete AKR Bike Management System with Angular frontend, Django backend, and MongoDB database.

## System Architecture

```
Angular Frontend (Port 4200) ←→ Django API (Port 8000) ←→ MongoDB (Port 27017)
```

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - for Angular
- **Python** (v3.8 or higher) - for Django
- **MongoDB** (v4.4 or higher) - for database
- **Git** - for version control

### Installation Links

- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/downloads/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

## Step 1: MongoDB Setup

### Install and Start MongoDB

#### Windows
1. Download MongoDB Community Server
2. Install with default settings
3. MongoDB should start automatically as a service

#### macOS (using Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### Verify MongoDB Installation
```bash
# Check if MongoDB is running
mongo --eval "db.adminCommand('ismaster')"

# Or using mongosh (newer versions)
mongosh --eval "db.adminCommand('ismaster')"
```

## Step 2: Django Backend Setup

### Navigate to Backend Directory
```bash
cd django-bike-backend
```

### Create Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Environment Configuration
Create a `.env` file in `django-bike-backend/`:
```env
DEBUG=True
SECRET_KEY=django-insecure-your-secret-key-change-in-production
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=bike_management
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
```

### Database Migration
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser
```

### Start Django Server
```bash
python manage.py runserver
```

The Django API will be available at: `http://localhost:8000`

### Test API Endpoints
```bash
# Test bikes endpoint
curl http://localhost:8000/api/bikes/

# Test dashboard stats
curl http://localhost:8000/api/dashboard/stats/
```

## Step 3: Angular Frontend Setup

### Navigate to Frontend Directory
```bash
cd angular-bike-forge
```

### Install Dependencies
```bash
npm install
```

### Start Angular Development Server
```bash
npm start
# or
ng serve
```

The Angular application will be available at: `http://localhost:4200`

## Step 4: Verification and Testing

### 1. Check All Services
- **MongoDB**: `http://localhost:27017` (should show "It looks like you are trying to access MongoDB over HTTP...")
- **Django API**: `http://localhost:8000/api/bikes/` (should return JSON array)
- **Angular App**: `http://localhost:4200` (should show the bike management dashboard)

### 2. Test Full Integration

1. **Open Angular App**: Navigate to `http://localhost:4200`
2. **Check Dashboard**: Should display statistics (may be 0 initially)
3. **Add a Bike**: 
   - Go to Bikes section
   - Click "Add Bike"
   - Fill in details and save
4. **Verify in Database**: Check if data appears in MongoDB
5. **Check API**: Visit `http://localhost:8000/api/bikes/` to see the created bike

### 3. MongoDB Data Verification

Using MongoDB Compass (GUI) or command line:
```bash
# Connect to MongoDB
mongosh

# Switch to database
use bike_management

# Check collections
show collections

# View bikes data
db.bikes.find()
```

## Step 5: Adding Sample Data (Optional)

### Using Django Admin
1. Go to `http://localhost:8000/admin/`
2. Login with superuser credentials
3. Add sample data for bikes, customers, etc.

### Using API Endpoints
```bash
# Add a sample bike
curl -X POST http://localhost:8000/api/bikes/ \
  -H "Content-Type: application/json" \
  -d '{
    "model_name": "Mountain Explorer",
    "brand": "Trek",
    "type": "Mountain",
    "price": 599.99,
    "stock_quantity": 15
  }'

# Add a sample customer
curl -X POST http://localhost:8000/api/customers/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, State"
  }'
```

## Development Workflow

### Starting the System
1. **Start MongoDB** (if not running as service)
2. **Start Django Backend**:
   ```bash
   cd django-bike-backend
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # macOS/Linux
   python manage.py runserver
   ```
3. **Start Angular Frontend**:
   ```bash
   cd angular-bike-forge
   npm start
   ```

### Making Changes

#### Backend Changes
1. Modify models in `bikes/models.py`
2. Create migrations: `python manage.py makemigrations`
3. Apply migrations: `python manage.py migrate`
4. Update serializers and views as needed

#### Frontend Changes
1. Modify components in `src/app/pages/`
2. Update services in `src/app/services/`
3. Changes are automatically reloaded

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
Error: MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running
```bash
# Windows (as service)
net start MongoDB

# macOS
brew services start mongodb/brew/mongodb-community

# Linux
sudo systemctl start mongodb
```

#### 2. Django CORS Error
```
Access to XMLHttpRequest at 'http://localhost:8000/api/bikes/' from origin 'http://localhost:4200' has been blocked by CORS policy
```
**Solution**: Check CORS settings in Django `settings.py`

#### 3. Angular Build Errors
```
Error: Cannot find module '@angular/core'
```
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 4. Python Virtual Environment Issues
**Solution**: Recreate virtual environment
```bash
rm -rf venv
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### Port Conflicts

If default ports are occupied:

#### Change Django Port
```bash
python manage.py runserver 8001
```
Update Angular environment: `apiUrl: 'http://localhost:8001'`

#### Change Angular Port
```bash
ng serve --port 4201
```
Update Django CORS settings to include new port.

## Production Deployment

### Environment Setup
1. **Set Production Environment Variables**
2. **Use Production Database** (MongoDB Atlas recommended)
3. **Configure HTTPS**
4. **Set up Reverse Proxy** (Nginx recommended)

### Deployment Options
- **Frontend**: Netlify, Vercel, AWS S3 + CloudFront
- **Backend**: Heroku, DigitalOcean, AWS EC2
- **Database**: MongoDB Atlas, AWS DocumentDB

## Security Considerations

1. **Change Default Secrets**: Update Django SECRET_KEY
2. **Environment Variables**: Never commit sensitive data
3. **HTTPS**: Use SSL certificates in production
4. **Database Security**: Configure MongoDB authentication
5. **CORS**: Restrict to specific domains in production

## Next Steps

1. **Add Authentication**: Implement user login/logout
2. **Add Validation**: Client and server-side validation
3. **Add Testing**: Unit and integration tests
4. **Add Monitoring**: Error tracking and analytics
5. **Add Backup**: Database backup strategy

## Support

- **Django Documentation**: https://docs.djangoproject.com/
- **Angular Documentation**: https://angular.io/docs
- **MongoDB Documentation**: https://docs.mongodb.com/
- **Project Issues**: Create issues in the repository

## License

This project is licensed under the MIT License.
