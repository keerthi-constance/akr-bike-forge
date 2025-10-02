# AKR Bike Management System

A comprehensive bike store management system built with Angular frontend and Django backend, featuring complete inventory management, customer tracking, sales processing, and service management.

## 🚀 Features

### 🔐 Authentication System
- Secure login with demo credentials
- Route protection with authentication guards
- User session management
- Beautiful login interface

### 📊 Dashboard Analytics
- Real-time business statistics
- Sales revenue tracking
- Low stock alerts
- Service request monitoring
- Quick action buttons

### 🚲 Bike Inventory Management
- Complete CRUD operations for bikes
- Model, brand, type, and pricing management
- Stock quantity tracking
- Search and filter capabilities

### 👥 Customer Management
- Customer registration and profiles
- Contact information management
- Purchase history tracking
- Service request history

### 💰 Sales Management
- Sales transaction processing
- Automatic stock updates
- Customer and bike linking
- Revenue tracking and reporting

### 🔧 Service Management
- Service request creation and tracking
- Status management (pending, in-progress, completed)
- Cost estimation and billing
- Customer and bike association

### 📦 Additional Features
- Supplier management
- Purchase order processing
- Employee management
- Comprehensive reporting

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Angular       │    │   Django        │    │   SQLite        │
│   Frontend      │◄──►│   REST API      │◄──►│   Database      │
│   (Port 4200)   │    │   (Port 8000)   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Technology Stack

### Frontend (Angular)
- **Angular 18** - Modern web framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Standalone Components** - Modern Angular architecture
- **RxJS** - Reactive programming
- **Angular Router** - Client-side routing

### Backend (Django)
- **Django 5.2.7** - Python web framework
- **Django REST Framework** - API development
- **SQLite** - Database (easily switchable to MongoDB)
- **CORS Headers** - Cross-origin support
- **Python Decouple** - Environment management

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/keerthi-constance/akr-bike-forge.git
cd akr-bike-forge
```

### 2. Start Django Backend
```bash
cd django-bike-backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Start Angular Frontend
```bash
cd angular-bike-forge
npm install
npm start
```

### 4. Access Application
- **Frontend**: http://localhost:4200
- **API**: http://localhost:8000/api/

## 🔑 Demo Credentials

### Login Credentials
- **Admin User**: username: `admin`, password: `admin123`
- **Demo User**: username: `demo`, password: `demo123`

## 📁 Project Structure

```
akr-bike-forge/
├── angular-bike-forge/          # Angular frontend application
│   ├── src/app/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # Angular services
│   │   └── guards/             # Route guards
│   └── ...
├── django-bike-backend/         # Django REST API backend
│   ├── bike_management/        # Django project settings
│   ├── bikes/                  # Main Django app
│   │   ├── models.py          # Database models
│   │   ├── views.py           # API views
│   │   ├── serializers.py     # Data serializers
│   │   └── urls.py            # URL routing
│   └── ...
├── SETUP_GUIDE.md              # Detailed setup instructions
└── README.md                   # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login/` - User login (future implementation)

### Core Resources
- `GET/POST /api/bikes/` - Bike management
- `GET/POST /api/customers/` - Customer management
- `GET/POST /api/sales/` - Sales transactions
- `GET/POST /api/services/` - Service requests
- `GET/POST /api/suppliers/` - Supplier management
- `GET/POST /api/employees/` - Employee management
- `GET/POST /api/purchases/` - Purchase orders

### Dashboard
- `GET /api/dashboard/stats/` - Business statistics
- `GET /api/dashboard/low-stock/` - Low stock items
- `GET /api/dashboard/recent-sales/` - Recent sales
- `GET /api/dashboard/pending-services/` - Pending services

## 🎨 Screenshots

### Login Page
Beautiful, responsive login interface with demo credentials display.

### Dashboard
Comprehensive business overview with statistics, charts, and quick actions.

### Bike Management
Complete inventory management with CRUD operations and search functionality.

## 🔄 Development Workflow

### Frontend Development
```bash
cd angular-bike-forge
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run tests
```

### Backend Development
```bash
cd django-bike-backend
python manage.py runserver     # Start development server
python manage.py makemigrations # Create migrations
python manage.py migrate       # Apply migrations
python manage.py test          # Run tests
```

## 🚀 Deployment

### Frontend Deployment
- **Netlify**: Connect GitHub repository
- **Vercel**: Deploy with zero configuration
- **AWS S3 + CloudFront**: Static hosting

### Backend Deployment
- **Heroku**: Python app deployment
- **DigitalOcean**: VPS deployment
- **AWS EC2**: Scalable cloud deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check `SETUP_GUIDE.md` for detailed setup instructions
- **Issues**: Create an issue on GitHub for bug reports or feature requests
- **Discussions**: Use GitHub Discussions for questions and community support

## 🎯 Roadmap

### Upcoming Features
- [ ] Real Django authentication integration
- [ ] MongoDB integration (currently using SQLite)
- [ ] Advanced reporting and analytics
- [ ] Email notifications
- [ ] Inventory alerts
- [ ] Multi-location support
- [ ] Mobile app development

### Recent Updates
- ✅ Complete Angular frontend with authentication
- ✅ Django REST API backend
- ✅ CRUD operations for all entities
- ✅ Dashboard with real-time statistics
- ✅ Responsive design with Tailwind CSS
- ✅ Route protection and user management

## 🏆 Acknowledgments

- Angular team for the amazing framework
- Django team for the robust backend framework
- Tailwind CSS for the utility-first styling approach
- All contributors and supporters of this project

---

**Built with ❤️ by [Keerthi Constance](https://github.com/keerthi-constance)**

For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)