# AKR Bike Management System - Angular Version

This is an Angular conversion of the React-based AKR Bike Management System. It provides a comprehensive solution for managing bike inventory, customers, sales, services, and employees.

## Features

- **Dashboard**: Overview of key metrics and quick actions
- **Bike Inventory**: Manage bike models, brands, types, pricing, and stock
- **Customer Management**: Handle customer information and relationships
- **Sales Tracking**: Record and monitor sales transactions
- **Service Management**: Track bike services and maintenance
- **Employee Management**: Manage staff information
- **Supplier Management**: Handle supplier relationships
- **Purchase Orders**: Manage inventory purchases

## Technology Stack

- **Angular 18**: Modern Angular framework with standalone components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Supabase**: Backend-as-a-Service for database and authentication
- **Lucide Angular**: Beautiful icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd angular-bike-forge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy your Supabase URL and anon key
   - Update `src/environments/environment.ts` and `src/environments/environment.prod.ts`

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── layout/         # Layout wrapper component
│   │   └── sidebar/        # Navigation sidebar
│   ├── pages/              # Page components
│   │   ├── dashboard/      # Dashboard overview
│   │   ├── bikes/          # Bike inventory management
│   │   ├── customers/      # Customer management
│   │   ├── sales/          # Sales tracking
│   │   ├── services/       # Service management
│   │   ├── suppliers/      # Supplier management
│   │   ├── purchases/      # Purchase orders
│   │   ├── employees/      # Employee management
│   │   └── not-found/      # 404 error page
│   ├── services/           # Angular services
│   │   └── supabase.service.ts  # Supabase integration
│   ├── app.component.ts    # Root component
│   ├── app.config.ts       # App configuration
│   └── app.routes.ts       # Routing configuration
├── environments/           # Environment configurations
├── styles.scss            # Global styles
└── main.ts               # Application bootstrap
```

## Key Differences from React Version

### Architecture
- **Standalone Components**: Uses Angular's modern standalone component architecture
- **Dependency Injection**: Leverages Angular's DI system for services
- **RxJS**: Reactive programming with observables (can be added for advanced features)
- **TypeScript First**: Built with TypeScript from the ground up

### Routing
- **Angular Router**: Uses Angular's powerful routing system with lazy loading
- **Route Guards**: Can easily add authentication and authorization guards
- **Nested Routes**: Support for complex routing scenarios

### State Management
- **Services**: Uses Angular services for state management
- **Reactive Forms**: Can be enhanced with Angular's reactive forms
- **HTTP Client**: Built-in HTTP client for API calls

### Styling
- **Tailwind CSS**: Same utility-first approach as React version
- **Component Styles**: Scoped SCSS files for each component
- **Design System**: Maintains the same design tokens and color scheme

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Supabase Integration

The application integrates with Supabase for:
- **Database**: PostgreSQL database for storing all application data
- **Authentication**: User authentication and authorization (can be added)
- **Real-time**: Real-time updates for collaborative features (can be added)

### Database Schema

The application expects the following tables in your Supabase database:
- `bikes`: Bike inventory information
- `customers`: Customer details
- `sales`: Sales transactions
- `services`: Service records
- `suppliers`: Supplier information
- `purchases`: Purchase orders
- `employees`: Employee information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository or contact the development team.
