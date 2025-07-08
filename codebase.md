# .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

# eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]

```

# index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

# package.json

```json
{
  "name": "medicare-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.8",
    "lucide-react": "^0.511.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react": "^4.4.1",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "postcss": "^8.5.4",
    "tailwindcss": "^3.4.17",
    "vite": "^6.3.5"
  }
}

```

# postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

# public\vite.svg

This is a file of the type: SVG Image

# README.md

```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```

# setup-instructions.txt

```txt
# Medicare App - Complete Setup Guide

## 📁 Project Structure

\`\`\`
medicare-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthPage.jsx
│   │   ├── dashboards/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminDoctorsDashboard.jsx
│   │   │   ├── PatientDashboard.jsx
│   │   │   └── DoctorDashboard.jsx
│   │   ├── layout/
│   │   │   └── Layout.jsx
│   │   └── routing/
│   │       ├── Router.jsx
│   │       └── ProtectedRoute.jsx
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── index.html
└── README.md
\`\`\`

## 🚀 Quick Start

### 1. Create New Vite Project
\`\`\`bash
npm create vite@latest medicare-app -- --template react
cd medicare-app
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

### 3. Configure Tailwind CSS

**Update `tailwind.config.js`:**
\`\`\`javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

**Update `src/index.css`:**
\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

### 4. Create File Structure

Create the following directories in `src/`:
\`\`\`bash
mkdir -p src/components/auth
mkdir -p src/components/dashboards
mkdir -p src/components/layout
mkdir -p src/components/routing
mkdir -p src/contexts
\`\`\`

### 5. Copy Component Files

Copy each component file from the artifacts above into their respective directories:

#### Auth Context
- Copy `AuthContext.js` → `src/contexts/AuthContext.js`

#### Routing Components
- Copy `Router.jsx` → `src/components/routing/Router.jsx`
- Copy `ProtectedRoute.jsx` → `src/components/routing/ProtectedRoute.jsx`

#### Auth Components
- Copy `AuthPage.jsx` → `src/components/auth/AuthPage.jsx`

#### Layout Components
- Copy `Layout.jsx` → `src/components/layout/Layout.jsx`

#### Dashboard Components
- Copy `AdminDashboard.jsx` → `src/components/dashboards/AdminDashboard.jsx`
- Copy `AdminDoctorsDashboard.jsx` → `src/components/dashboards/AdminDoctorsDashboard.jsx`
- Copy `PatientDashboard.jsx` → `src/components/dashboards/PatientDashboard.jsx`
- Copy `DoctorDashboard.jsx` → `src/components/dashboards/DoctorDashboard.jsx`

#### Main App
- Copy `App.jsx` → `src/App.jsx` (replace existing)

### 6. Update main.jsx

**Replace `src/main.jsx` with:**
\`\`\`javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
\`\`\`

### 7. Run the Application
\`\`\`bash
npm run dev
\`\`\`

## 🔧 Features Included

### ✅ Authentication System
- **Login/Signup** with role selection (Patient, Doctor, Admin)
- **Protected Routes** based on user roles
- **Persistent Login** using localStorage
- **Auto-redirect** based on user type

### ✅ Role-Based Dashboards

**Admin Dashboard:**
- Doctor management (add, edit, remove)
- Appointment oversight
- Feedback management
- Analytics and reports
- System settings

**Doctor Dashboard:**
- Today's schedule
- Patient management
- Appointment notes
- Reviews and ratings
- Availability management

**Patient Dashboard:**
- Upcoming appointments
- Medical history
- Doctor search and booking
- Reviews and feedback
- Health metrics

### ✅ Responsive Design
- **Mobile-first** approach
- **Sidebar navigation** with role-based menus
- **Touch-friendly** interface
- **Modern UI** with Tailwind CSS

## 🎯 User Flows

### 1. **First Time User**
1. Visit app → Redirected to `/auth`
2. Select user type (Patient/Doctor/Admin)
3. Sign up with required information
4. Automatically logged in and redirected to appropriate dashboard

### 2. **Returning User**
1. Visit app → Redirected to `/auth`
2. Select user type and login
3. Redirected to their role-specific dashboard

### 3. **Navigation**
- **Sidebar menu** shows role-appropriate options
- **Breadcrumbs** for easy navigation
- **Quick actions** on each dashboard
- **Logout** functionality

## 🔐 Authentication Features

### User Types & Access Control
- **Patient**: Can access patient dashboard, find doctors, book appointments
- **Doctor**: Can manage schedule, view patients, handle appointments
- **Admin**: Full system access, manage doctors, view analytics

### Security Features
- **Route Protection**: Unauthorized users redirected to login
- **Role Validation**: Users can't access other role's pages
- **Session Persistence**: Login state maintained across browser sessions
- **Auto-logout**: Easy logout with confirmation

## 🎨 UI/UX Features

### Design System
- **Medical Theme**: Professional healthcare appearance
- **Color Coding**: Different colors for each user type
- **Consistent Icons**: Lucide React icon library
- **Modern Cards**: Shadow and hover effects
- **Interactive Elements**: Smooth transitions and animations

### User Experience
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Feedback**: Success/error notifications
- **Responsive**: Works on all device sizes

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Single column, hamburger menu)
- **Tablet**: 768px - 1024px (Adapted layouts)
- **Desktop**: > 1024px (Full sidebar, multi-column layouts)

## 🚀 Getting Started with Development

### Test Users
Use these credentials to test different user types:

**Admin User:**
- Email: admin@medicare.com
- Type: Admin

**Doctor User:**
- Email: doctor@medicare.com  
- Type: Doctor

**Patient User:**
- Email: patient@medicare.com
- Type: Patient

### Adding New Pages
1. Create component in appropriate directory
2. Add route in `App.jsx`
3. Update navigation in `Layout.jsx`
4. Add role permissions if needed

### Customization
- **Colors**: Update Tailwind config for brand colors
- **Components**: All components are modular and reusable
- **Data**: Replace mock data with API calls
- **Styling**: Customize CSS classes as needed

## 🔄 Next Steps

### Backend Integration
- Replace mock authentication with real API
- Connect to database for data persistence
- Add real-time features with WebSockets
- Implement file upload for medical records

### Additional Features
- **Notifications**: Real-time notifications system
- **Video Calls**: Telemedicine integration
- **Payments**: Billing and payment processing
- **Reports**: PDF generation for medical reports
- **Calendar**: Advanced scheduling system

## 📞 Support

The app includes comprehensive routing, authentication, and role-based access control. All components are fully responsive and follow modern React best practices.

For questions or issues, refer to the component files which include detailed implementations and comments.
```

# src\apis\AdminDashboardApi.js

```js
// apis/AdminDashboardApi.js
const API_BASE_URL = 'http://127.0.0.1:8000';

class AdminDashboardApi {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    try {
      console.log(`🔥 Making request to: ${url}`);
      console.log('🔥 Request options:', requestOptions);
      
      const response = await fetch(url, requestOptions);
      const responseText = await response.text();
      
      console.log('🔥 Response status:', response.status);
      console.log('🔥 Response text:', responseText);
      
      if (response.ok) {
        const data = responseText ? JSON.parse(responseText) : {};
        console.log('✅ Success response:', data);
        return {
          success: true,
          data: data,
          status: response.status
        };
      } else {
        console.error('❌ Error response:', response.status, responseText);
        let errorData = {};
        try {
          errorData = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
          console.error('❌ Error parsing error response:', parseError);
        }
        
        return {
          success: false,
          error: errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          data: errorData
        };
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      return {
        success: false,
        error: error.message || 'Network error occurred. Please check your connection.',
        status: 0
      };
    }
  }

  async getDashboardData(userType, emailId) {
    console.log('🔥 getDashboardData called with:', { userType, emailId });
    
    if (!userType) {
      return { success: false, error: 'User type is required' };
    }

    if (!emailId) {
      return { success: false, error: 'Email ID is required' };
    }

    if (userType !== 'admin') {
      return { success: false, error: 'Invalid user type. Must be admin.' };
    }

    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    console.log('🔥 Sending dashboard request with payload:', payload);

    const result = await this.makeRequest('/v1/med-admin/dashboard', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    console.log('🔥 Dashboard API result:', result);

    if (result.success) {
      if (result.data && result.data.success && result.data.data) {
        console.log('✅ Dashboard data received:', result.data.data);
        return {
          success: true,
          message: result.data.message || 'Dashboard data retrieved successfully',
          data: result.data.data,
          status_code: result.data.status_code
        };
      } else {
        console.error('❌ Invalid response format:', result.data);
        return { success: false, error: 'Invalid response format from server' };
      }
    } else {
      console.error('❌ API request failed:', result);
      // Handle specific error status codes
      if (result.status === 403) {
        return { success: false, error: 'Access denied. Only administrators can access this dashboard.' };
      } else if (result.status === 404) {
        return { success: false, error: 'Admin not found or dashboard data unavailable' };
      } else if (result.status === 400) {
        return { success: false, error: result.error || 'Invalid request data' };
      } else if (result.status === 500) {
        return { success: false, error: 'Server error. Please try again later.' };
      } else if (result.status === 0) {
        return { success: false, error: 'Unable to connect to server. Please check your internet connection and ensure the backend is running on http://127.0.0.1:8000' };
      } else {
        return { success: false, error: result.error || 'Failed to retrieve dashboard data' };
      }
    }
  }

  async getAllAppointments(userType, emailId) {
    console.log('🔥 getAllAppointments called with:', { userType, emailId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    const result = await this.makeRequest('/v1/med-admin/appointments/all', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || [],
        message: result.data.message || 'All appointments retrieved successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to retrieve appointments'
      };
    }
  }

  async getAllFeedback(userType, emailId) {
    console.log('🔥 getAllFeedback called with:', { userType, emailId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    const result = await this.makeRequest('/v1/med-admin/feedback/all', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || [],
        message: result.data.message || 'All feedback retrieved successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to retrieve feedback'
      };
    }
  }

  async getDoctorManagement(userType, emailId) {
    console.log('🔥 getDoctorManagement called with:', { userType, emailId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    const result = await this.makeRequest('/v1/med-admin/doctors/manage', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || [],
        message: result.data.message || 'Doctor management data retrieved successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to retrieve doctor management data'
      };
    }
  }

  async addDoctor(userType, emailId, doctorData) {
    console.log('🔥 addDoctor called with:', { userType, emailId, doctorData });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      ...doctorData
    };

    const result = await this.makeRequest('/v1/med-admin/doctors/add', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'Doctor added successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to add doctor'
      };
    }
  }

  async updateDoctor(userType, emailId, doctorId, doctorData) {
    console.log('🔥 updateDoctor called with:', { userType, emailId, doctorId, doctorData });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      doctor_id: doctorId,
      ...doctorData
    };

    const result = await this.makeRequest('/v1/med-admin/doctors/update', {
      method: 'PUT',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'Doctor updated successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to update doctor'
      };
    }
  }

  async deleteDoctor(userType, emailId, doctorId) {
    console.log('🔥 deleteDoctor called with:', { userType, emailId, doctorId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      doctor_id: doctorId
    };

    const result = await this.makeRequest('/v1/med-admin/doctors/delete', {
      method: 'DELETE',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'Doctor deleted successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to delete doctor'
      };
    }
  }

  async getSystemAnalytics(userType, emailId) {
    console.log('🔥 getSystemAnalytics called with:', { userType, emailId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    const result = await this.makeRequest('/v1/med-admin/analytics', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'System analytics retrieved successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to retrieve system analytics'
      };
    }
  }

  async respondToFeedback(userType, emailId, feedbackId, responseText) {
    console.log('🔥 respondToFeedback called with:', { userType, emailId, feedbackId, responseText });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      feedback_id: feedbackId,
      response_text: responseText
    };

    const result = await this.makeRequest('/v1/med-admin/feedback/respond', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'Response submitted successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to submit response'
      };
    }
  }
}

const adminDashboardApi = new AdminDashboardApi();
export default adminDashboardApi;
```

# src\apis\DoctorDashboardApi.js

```js
// apis/DoctorDashboardApi.js
const API_BASE_URL = 'http://127.0.0.1:8000';

class DoctorDashboardApi {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    try {
      console.log(`🔥 Making request to: ${url}`);
      console.log('🔥 Request options:', requestOptions);
      
      const response = await fetch(url, requestOptions);
      const responseText = await response.text();
      
      console.log('🔥 Response status:', response.status);
      console.log('🔥 Response text:', responseText);
      
      if (response.ok) {
        const data = responseText ? JSON.parse(responseText) : {};
        console.log('✅ Success response:', data);
        return {
          success: true,
          data: data,
          status: response.status
        };
      } else {
        console.error('❌ Error response:', response.status, responseText);
        let errorData = {};
        try {
          errorData = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
          console.error('❌ Error parsing error response:', parseError);
        }
        
        return {
          success: false,
          error: errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          data: errorData
        };
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      return {
        success: false,
        error: error.message || 'Network error occurred. Please check your connection.',
        status: 0
      };
    }
  }

  async getDashboardData(userType, emailId) {
    console.log('🔥 getDashboardData called with:', { userType, emailId });
    
    if (!userType) {
      return { success: false, error: 'User type is required' };
    }

    if (!emailId) {
      return { success: false, error: 'Email ID is required' };
    }

    if (userType !== 'doctor') {
      return { success: false, error: 'Invalid user type. Must be doctor.' };
    }

    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    console.log('🔥 Sending dashboard request with payload:', payload);

    const result = await this.makeRequest('/v1/doctor/dashboard', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    console.log('🔥 Dashboard API result:', result);

    if (result.success) {
      if (result.data && result.data.success && result.data.data) {
        console.log('✅ Dashboard data received:', result.data.data);
        return {
          success: true,
          message: result.data.message || 'Dashboard data retrieved successfully',
          data: result.data.data,
          status_code: result.data.status_code
        };
      } else {
        console.error('❌ Invalid response format:', result.data);
        return { success: false, error: 'Invalid response format from server' };
      }
    } else {
      console.error('❌ API request failed:', result);
      // Handle specific error status codes
      if (result.status === 403) {
        return { success: false, error: 'Access denied. Only doctors can access this dashboard.' };
      } else if (result.status === 404) {
        return { success: false, error: 'Doctor not found or dashboard data unavailable' };
      } else if (result.status === 400) {
        return { success: false, error: result.error || 'Invalid request data' };
      } else if (result.status === 500) {
        return { success: false, error: 'Server error. Please try again later.' };
      } else if (result.status === 0) {
        return { success: false, error: 'Unable to connect to server. Please check your internet connection and ensure the backend is running on http://127.0.0.1:8000' };
      } else {
        return { success: false, error: result.error || 'Failed to retrieve dashboard data' };
      }
    }
  }
}

const doctorDashboardApi = new DoctorDashboardApi();
export default doctorDashboardApi;
```

# src\apis\ForgotPasswordApi.js

```js
// apis/ForgotPasswordApi.js
const API_BASE_URL = 'http://127.0.0.1:8000/v1';

class ForgotPasswordApi {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Helper method to make HTTP requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, requestOptions);
      
      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          data: data,
          status: response.status
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || errorData.error || 'Request failed',
          status: response.status,
          data: errorData
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Network error occurred',
        status: 0
      };
    }
  }

  // Set new password - using if-then logic
  async setPassword(email, password) {
    // Validate inputs using if-then
    if (!email) {
      return {
        success: false,
        error: 'Email is required'
      };
    }

    if (!password) {
      return {
        success: false,
        error: 'Password is required'
      };
    }

    // Validate email format using if-then
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Invalid email format'
      };
    }

    // Validate password length using if-then
    if (password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters'
      };
    }

    // Prepare payload - schema: email and password
    const resetPayload = {
      email: email,
      password: password
    };

    // Make API request to set new password
    const result = await this.makeRequest('/users/set-password', {
      method: 'POST',
      body: JSON.stringify(resetPayload)
    });

    // Handle response using if-then logic
    if (result.success) {
      return {
        success: true,
        message: 'Password reset successfully',
        data: result.data
      };
    } else {
      // Handle specific error status codes using if-then
      if (result.status === 400) {
        return {
          success: false,
          error: 'Invalid email or password format'
        };
      } else if (result.status === 404) {
        return {
          success: false,
          error: 'Email not found'
        };
      } else if (result.status === 422) {
        return {
          success: false,
          error: 'Validation failed. Please check your email and password.'
        };
      } else if (result.status === 429) {
        return {
          success: false,
          error: 'Too many password reset attempts. Please try again later.'
        };
      } else if (result.status === 500) {
        return {
          success: false,
          error: 'Server error. Please try again later.'
        };
      } else {
        return {
          success: false,
          error: result.error || 'Failed to reset password'
        };
      }
    }
  }
}

// Create and export a singleton instance
const forgotPasswordApi = new ForgotPasswordApi();
export default forgotPasswordApi;
```

# src\apis\LoginApi.js

```js
// apis/LoginApi.js
const API_BASE_URL = 'http://127.0.0.1:8000';

class LoginApi {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Helper method to make HTTP requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    try {
      console.log(`Making request to: ${url}`);
      console.log('Request options:', requestOptions);
      
      const response = await fetch(url, requestOptions);
      const responseText = await response.text();
      
      console.log('Response status:', response.status);
      console.log('Response text:', responseText);
      
      if (response.ok) {
        const data = responseText ? JSON.parse(responseText) : {};
        return {
          success: true,
          data: data,
          status: response.status
        };
      } else {
        let errorData = {};
        try {
          errorData = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
        }
        
        return {
          success: false,
          error: errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          data: errorData
        };
      }
    } catch (error) {
      console.error('Network error:', error);
      return {
        success: false,
        error: error.message || 'Network error occurred. Please check your connection.',
        status: 0
      };
    }
  }

  // Login user - updated to match backend API format
  async loginUser(userType, emailId, password) {
    // Validate inputs using if-then
    if (!userType) {
      return {
        success: false,
        error: 'User type is required'
      };
    }

    if (!emailId) {
      return {
        success: false,
        error: 'Email ID is required'
      };
    }

    if (!password) {
      return {
        success: false,
        error: 'Password is required'
      };
    }

    // Validate email format using if-then
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(emailId)) {
      return {
        success: false,
        error: 'Invalid email format'
      };
    }

    // Validate password length using if-then
    if (password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters'
      };
    }

    // Validate user type
    const validUserTypes = ['patient', 'doctor', 'admin'];
    if (!validUserTypes.includes(userType.toLowerCase())) {
      return {
        success: false,
        error: 'Invalid user type. Must be patient, doctor, or admin'
      };
    }

    // Prepare login payload - match backend API schema exactly
    const loginPayload = {
      user_type: userType.toLowerCase(),
      email_id: emailId,
      password: password
    };

    console.log('Sending login request with payload:', loginPayload);

    // Make API request to login user
    const result = await this.makeRequest('/v1/users/log-in', {
      method: 'POST',
      body: JSON.stringify(loginPayload)
    });

    console.log('Login API result:', result);

    // Handle response using if-then logic
    if (result.success) {
      // Check if response has the expected structure
      if (result.data && result.data.success && result.data.data) {
        return {
          success: true,
          message: result.data.message || 'Login successful',
          user: result.data.data,
          status_code: result.data.status_code
        };
      } else {
        return {
          success: false,
          error: 'Invalid response format from server'
        };
      }
    } else {
      // Handle specific error status codes using if-then
      if (result.status === 401) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      } else if (result.status === 404) {
        return {
          success: false,
          error: 'User not found'
        };
      } else if (result.status === 400) {
        return {
          success: false,
          error: result.error || 'Invalid login credentials'
        };
      } else if (result.status === 403) {
        return {
          success: false,
          error: 'Account is disabled or suspended'
        };
      } else if (result.status === 422) {
        return {
          success: false,
          error: 'Invalid email or password format'
        };
      } else if (result.status === 429) {
        return {
          success: false,
          error: 'Too many login attempts. Please try again later.'
        };
      } else if (result.status === 500) {
        return {
          success: false,
          error: 'Server error. Please try again later.'
        };
      } else if (result.status === 0) {
        return {
          success: false,
          error: 'Unable to connect to server. Please check your internet connection and ensure the backend is running on http://127.0.0.1:8000'
        };
      } else {
        return {
          success: false,
          error: result.error || 'Login failed'
        };
      }
    }
  }

  // Helper method to validate user session
  async validateSession(userType, emailId) {
    if (!userType || !emailId) {
      return {
        success: false,
        error: 'User type and email ID are required for session validation'
      };
    }

    // This could be expanded to call a backend session validation endpoint
    return {
      success: true,
      message: 'Session is valid'
    };
  }
}

// Create and export a singleton instance
const loginApi = new LoginApi();
export default loginApi;
```

# src\apis\PatientDashboardApi.js

```js
// apis/PatientDashboardApi.js
const API_BASE_URL = 'http://127.0.0.1:8000';

class PatientDashboardApi {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    try {
      console.log(`🔥 Making request to: ${url}`);
      console.log('🔥 Request options:', requestOptions);
      
      const response = await fetch(url, requestOptions);
      const responseText = await response.text();
      
      console.log('🔥 Response status:', response.status);
      console.log('🔥 Response text:', responseText);
      
      if (response.ok) {
        const data = responseText ? JSON.parse(responseText) : {};
        console.log('✅ Success response:', data);
        return {
          success: true,
          data: data,
          status: response.status
        };
      } else {
        console.error('❌ Error response:', response.status, responseText);
        let errorData = {};
        try {
          errorData = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
          console.error('❌ Error parsing error response:', parseError);
        }
        
        return {
          success: false,
          error: errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          data: errorData
        };
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      return {
        success: false,
        error: error.message || 'Network error occurred. Please check your connection.',
        status: 0
      };
    }
  }

  async getDashboardData(userType, emailId) {
    console.log('🔥 getDashboardData called with:', { userType, emailId });
    
    if (!userType) {
      return { success: false, error: 'User type is required' };
    }

    if (!emailId) {
      return { success: false, error: 'Email ID is required' };
    }

    if (userType !== 'patient') {
      return { success: false, error: 'Invalid user type. Must be patient.' };
    }

    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    console.log('🔥 Sending dashboard request with payload:', payload);

    const result = await this.makeRequest('/v1/patient/dashboard', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    console.log('🔥 Dashboard API result:', result);

    if (result.success) {
      if (result.data && result.data.success && result.data.data) {
        console.log('✅ Dashboard data received:', result.data.data);
        return {
          success: true,
          message: result.data.message || 'Dashboard data retrieved successfully',
          data: result.data.data,
          status_code: result.data.status_code
        };
      } else {
        console.error('❌ Invalid response format:', result.data);
        return { success: false, error: 'Invalid response format from server' };
      }
    } else {
      console.error('❌ API request failed:', result);
      // Handle specific error status codes
      if (result.status === 403) {
        return { success: false, error: 'Access denied. Only patients can access this dashboard.' };
      } else if (result.status === 404) {
        return { success: false, error: 'Patient not found or dashboard data unavailable' };
      } else if (result.status === 400) {
        return { success: false, error: result.error || 'Invalid request data' };
      } else if (result.status === 500) {
        return { success: false, error: 'Server error. Please try again later.' };
      } else if (result.status === 0) {
        return { success: false, error: 'Unable to connect to server. Please check your internet connection and ensure the backend is running on http://127.0.0.1:8000' };
      } else {
        return { success: false, error: result.error || 'Failed to retrieve dashboard data' };
      }
    }
  }

  async getUpcomingAppointments(userType, emailId) {
    console.log('🔥 getUpcomingAppointments called with:', { userType, emailId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    const result = await this.makeRequest('/v1/patient/appointments/upcoming', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || [],
        message: result.data.message || 'Upcoming appointments retrieved successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to retrieve upcoming appointments'
      };
    }
  }

  async getPastAppointments(userType, emailId) {
    console.log('🔥 getPastAppointments called with:', { userType, emailId });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase()
    };

    const result = await this.makeRequest('/v1/patient/appointments/history', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || [],
        message: result.data.message || 'Appointment history retrieved successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to retrieve appointment history'
      };
    }
  }

  async bookAppointment(userType, emailId, appointmentData) {
    console.log('🔥 bookAppointment called with:', { userType, emailId, appointmentData });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      ...appointmentData
    };

    const result = await this.makeRequest('/v1/patient/appointments/book', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'Appointment booked successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to book appointment'
      };
    }
  }

  async submitFeedback(userType, emailId, feedbackData) {
    console.log('🔥 submitFeedback called with:', { userType, emailId, feedbackData });
    
    const payload = {
      user_type: userType.toLowerCase(),
      email_id: emailId.toLowerCase(),
      ...feedbackData
    };

    const result = await this.makeRequest('/v1/patient/feedback/submit', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (result.success) {
      return {
        success: true,
        data: result.data.data || {},
        message: result.data.message || 'Feedback submitted successfully'
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to submit feedback'
      };
    }
  }
}

const patientDashboardApi = new PatientDashboardApi();
export default patientDashboardApi;
```

# src\apis\RegistrationApi.js

```js
// apis/RegistrationApi.js
const API_BASE_URL = 'http://127.0.0.1:8000/v1';

class RegistrationApi {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Helper method to make HTTP requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, requestOptions);
      
      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          data: data,
          status: response.status
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || errorData.error || 'Request failed',
          status: response.status,
          data: errorData
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Network error occurred',
        status: 0
      };
    }
  }

  // Create new user account - using if-then logic
  async createUser(userData) {
    // Validate required fields using if-then
    if (!userData.email) {
      return {
        success: false,
        error: 'Email is required'
      };
    }

    if (!userData.password) {
      return {
        success: false,
        error: 'Password is required'
      };
    }

    if (!userData.firstName) {
      return {
        success: false,
        error: 'First name is required'
      };
    }

    if (!userData.lastName) {
      return {
        success: false,
        error: 'Last name is required'
      };
    }

    if (!userData.phone) {
      return {
        success: false,
        error: 'Phone number is required'
      };
    }

    if (!userData.userType) {
      return {
        success: false,
        error: 'User type is required'
      };
    }

    // Validate email format using if-then
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(userData.email)) {
      return {
        success: false,
        error: 'Invalid email format'
      };
    }

    // Clean and validate phone number using if-then
    const cleanedPhone = userData.phone.replace(/\D/g, '');
    const phoneNumber = parseInt(cleanedPhone);
    
    if (isNaN(phoneNumber) || phoneNumber <= 0) {
      return {
        success: false,
        error: 'Invalid mobile number'
      };
    }

    // Transform frontend data to backend schema format
    const apiPayload = {
      user_type: userData.userType,
      first_name: userData.firstName,
      last_name: userData.lastName,
      email_id: userData.email,
      mobile: phoneNumber,
      password: userData.password
    };

    // Make API request to create user
    const result = await this.makeRequest('/users/sign-in', {
      method: 'POST',
      body: JSON.stringify(apiPayload)
    });

    // Handle response using if-then logic
    if (result.success) {
      return {
        success: true,
        message: 'Account created successfully',
        user: result.data
      };
    } else {
      // Handle specific error status codes using if-then
      if (result.status === 400) {
        return {
          success: false,
          error: result.error || 'Invalid data provided'
        };
      } else if (result.status === 409) {
        return {
          success: false,
          error: 'Email already exists'
        };
      } else if (result.status === 422) {
        return {
          success: false,
          error: 'Validation failed. Please check your data.'
        };
      } else if (result.status === 500) {
        return {
          success: false,
          error: 'Server error. Please try again later.'
        };
      } else {
        return {
          success: false,
          error: result.error || 'Failed to create account'
        };
      }
    }
  }
}

// Create and export a singleton instance
const registrationApi = new RegistrationApi();
export default registrationApi;
```

# src\apis\SinginApi.js

```js

```

# src\App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

# src\App.jsx

```jsx
// import React, { Suspense, lazy } from 'react';
// import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
// import { Router, useRouter } from './components/routing/Router';

// // Lazy load components for better performance
// const Layout = lazy(() => import('./components/layout/Layout'));
// const AuthPage = lazy(() => import('./components/auth/AuthPage'));
// const AdminDashboard = lazy(() => import('./components/dashboards/AdminDashboard'));
// const PatientDashboard = lazy(() => import('./components/dashboards/PatientDashboard'));
// const DoctorDashboard = lazy(() => import('./components/dashboards/DoctorDashboard'));
// const AdminDoctorsDashboard = lazy(() => import('./components/dashboards/AdminDoctorsDashboard'));

// // Loading component for Suspense
// const LoadingSpinner = ({ message = "Loading..." }) => (
//   <div className="min-h-screen flex items-center justify-center bg-gray-50">
//     <div className="text-center">
//       <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//       <p className="text-gray-600">{message}</p>
//     </div>
//   </div>
// );

// // Placeholder components for pages not yet created
// const DoctorPersonalDashboard = () => (
//   <div className="p-8">
//     <h1 className="text-3xl font-bold text-gray-900 mb-6">Doctor Dashboard</h1>
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//       <p className="text-gray-600">Doctor personal dashboard with schedule and patient management will be implemented here.</p>
//     </div>
//   </div>
// );

// const PlaceholderPage = ({ title }) => (
//   <div className="p-8">
//     <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//       <p className="text-gray-600">{title} page will be implemented here.</p>
//     </div>
//   </div>
// );

// // Helper function to get dashboard path based on user type
// const getDashboardPath = (userType) => {
//   switch (userType) {
//     case 'admin':
//       return '/admin';
//     case 'doctor':
//       return '/doctor';
//     case 'patient':
//       return '/patient';
//     default:
//       return '/patient';
//   }
// };

// // Route permissions configuration
// const routePermissions = {
//   // Admin routes
//   '/admin': ['admin'],
//   '/admin/doctors': ['admin'],
//   '/admin/appointments': ['admin'],
//   '/admin/feedback': ['admin'],
//   '/admin/analytics': ['admin'],
//   '/admin/settings': ['admin'],
  
//   // Doctor routes
//   '/doctor': ['doctor'],
//   '/doctor/schedule': ['doctor'],
//   '/doctor/appointments': ['doctor'],
//   '/doctor/patients': ['doctor'],
//   '/doctor/reviews': ['doctor'],
//   '/doctor/profile': ['doctor'],
  
//   // Patient routes
//   '/patient': ['patient'],
//   '/doctors': ['patient'],
//   '/patient/appointments': ['patient'],
//   '/patient/history': ['patient'],
//   '/patient/reviews': ['patient'],
//   '/patient/profile': ['patient']
// };

// // Function to check if user has permission for a route
// const hasRoutePermission = (path, userType) => {
//   const permissions = routePermissions[path];
//   if (!permissions) {
//     return false;
//   }
//   return permissions.includes(userType);
// };

// // Access Denied Component
// const AccessDenied = ({ userType, attemptedPath }) => (
//   <div className="min-h-screen flex items-center justify-center bg-gray-50">
//     <div className="text-center max-w-md mx-auto px-4">
//       <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//         <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//         </svg>
//       </div>
//       <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
//       <p className="text-gray-600 mb-4">
//         You don't have permission to access this page. Your account type ({userType}) cannot access {attemptedPath}.
//       </p>
//       <button 
//         onClick={() => {
//           const dashboardPath = getDashboardPath(userType);
//           window.history.replaceState({}, '', dashboardPath);
//           window.dispatchEvent(new PopStateEvent('popstate'));
//         }}
//         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//       >
//         Go to My Dashboard
//       </button>
//     </div>
//   </div>
// );

// // Main App routing component
// const AppRoutes = () => {
//   const { currentPath } = useRouter();
//   const { isAuthenticated, user, loading } = useAuth();

//   console.log('AppRoutes render:', { currentPath, isAuthenticated: isAuthenticated(), user, loading });

//   // Show loading screen while checking authentication
//   if (loading) {
//     return <LoadingSpinner message="Checking authentication..." />;
//   }

//   // Public routes (no authentication required)
//   if (currentPath === '/auth' || currentPath === '/') {
//     // If user is already authenticated, redirect to their dashboard
//     if (isAuthenticated() && user) {
//       console.log('User already authenticated, redirecting to dashboard');
//       const dashboardPath = getDashboardPath(user.user_type || user.userType);
//       window.history.replaceState({}, '', dashboardPath);
//       return null;
//     }
    
//     return (
//       <Suspense fallback={<LoadingSpinner message="Loading login page..." />}>
//         <AuthPage />
//       </Suspense>
//     );
//   }

//   // All other routes require authentication
//   if (!isAuthenticated()) {
//     console.log('User not authenticated, redirecting to auth');
//     window.history.replaceState({}, '', '/auth');
//     return null;
//   }

//   // Get user type for routing decisions
//   const userType = user.user_type || user.userType;
//   console.log('Authenticated user type:', userType);

//   // Check route permissions
//   if (!hasRoutePermission(currentPath, userType)) {
//     console.log('Access denied for route:', currentPath, 'User type:', userType);
//     return (
//       <Suspense fallback={<LoadingSpinner />}>
//         <Layout>
//           <AccessDenied userType={userType} attemptedPath={currentPath} />
//         </Layout>
//       </Suspense>
//     );
//   }

//   // Route definitions based on user role and path
//   const renderRoute = () => {
//     // Admin routes
//     if (currentPath.startsWith('/admin')) {
//       const AdminComponent = () => {
//         switch (currentPath) {
//           case '/admin':
//             return <AdminDashboard />;
//           case '/admin/doctors':
//             return <AdminDoctorsDashboard />;
//           case '/admin/appointments':
//             return <PlaceholderPage title="Appointments" />;
//           case '/admin/feedback':
//             return <PlaceholderPage title="Feedback Management" />;
//           case '/admin/analytics':
//             return <PlaceholderPage title="Analytics" />;
//           case '/admin/settings':
//             return <PlaceholderPage title="Settings" />;
//           default:
//             return <AdminDashboard />;
//         }
//       };

//       return (
//         <Suspense fallback={<LoadingSpinner message="Loading admin dashboard..." />}>
//           <Layout>
//             <AdminComponent />
//           </Layout>
//         </Suspense>
//       );
//     }

//     // Doctor routes
//     if (currentPath.startsWith('/doctor')) {
//       const DoctorComponent = () => {
//         switch (currentPath) {
//           case '/doctor':
//             return <DoctorPersonalDashboard />;
//           case '/doctor/schedule':
//             return <PlaceholderPage title="Schedule Management" />;
//           case '/doctor/appointments':
//             return <PlaceholderPage title="Appointments" />;
//           case '/doctor/patients':
//             return <PlaceholderPage title="My Patients" />;
//           case '/doctor/reviews':
//             return <PlaceholderPage title="Reviews" />;
//           case '/doctor/profile':
//             return <PlaceholderPage title="Profile" />;
//           default:
//             return <DoctorPersonalDashboard />;
//         }
//       };

//       return (
//         <Suspense fallback={<LoadingSpinner message="Loading doctor dashboard..." />}>
//           <Layout>
//             <DoctorComponent />
//           </Layout>
//         </Suspense>
//       );
//     }

//     // Patient routes
//     if (currentPath.startsWith('/patient') || currentPath === '/doctors') {
//       const PatientComponent = () => {
//         switch (currentPath) {
//           case '/patient':
//             return <PatientDashboard />;
//           case '/doctors':
//             return <DoctorDashboard />;
//           case '/patient/appointments':
//             return <PlaceholderPage title="My Appointments" />;
//           case '/patient/history':
//             return <PlaceholderPage title="Medical History" />;
//           case '/patient/reviews':
//             return <PlaceholderPage title="Reviews" />;
//           case '/patient/profile':
//             return <PlaceholderPage title="Profile" />;
//           default:
//             return <PatientDashboard />;
//         }
//       };

//       return (
//         <Suspense fallback={<LoadingSpinner message="Loading patient dashboard..." />}>
//           <Layout>
//             <PatientComponent />
//           </Layout>
//         </Suspense>
//       );
//     }

//     // If user is authenticated but on an invalid path, redirect to their dashboard
//     console.log('Invalid path for authenticated user, redirecting to dashboard');
//     const dashboardPath = getDashboardPath(userType);
//     window.history.replaceState({}, '', dashboardPath);
//     return null;
//   };

//   return renderRoute();
// };

// // Main App component
// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <AppRoutes />
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;
import React, { Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { Router, useRouter } from './components/routing/Router';

// Lazy load components for better performance
const Layout = lazy(() => import('./components/layout/Layout'));
const AuthPage = lazy(() => import('./components/auth/AuthPage'));
const AdminDashboard = lazy(() => import('./components/dashboards/AdminDashboard'));
const PatientDashboard = lazy(() => import('./components/dashboards/PatientDashboard'));
const DoctorDashboard = lazy(() => import('./components/dashboards/DoctorDashboard')); // This is the correct one
const AdminDoctorsDashboard = lazy(() => import('./components/dashboards/AdminDoctorsDashboard'));

// Loading component for Suspense
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

// Placeholder components for pages not yet created
const PlaceholderPage = ({ title }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <p className="text-gray-600">{title} page will be implemented here.</p>
    </div>
  </div>
);

// Helper function to get dashboard path based on user type
const getDashboardPath = (userType) => {
  switch (userType) {
    case 'admin':
      return '/admin';
    case 'doctor':
      return '/doctor';
    case 'patient':
      return '/patient';
    default:
      return '/patient';
  }
};

// Route permissions configuration
const routePermissions = {
  // Admin routes
  '/admin': ['admin'],
  '/admin/doctors': ['admin'],
  '/admin/appointments': ['admin'],
  '/admin/feedback': ['admin'],
  '/admin/analytics': ['admin'],
  '/admin/settings': ['admin'],
  
  // Doctor routes
  '/doctor': ['doctor'],
  '/doctor/schedule': ['doctor'],
  '/doctor/appointments': ['doctor'],
  '/doctor/patients': ['doctor'],
  '/doctor/reviews': ['doctor'],
  '/doctor/profile': ['doctor'],
  
  // Patient routes
  '/patient': ['patient'],
  '/doctors': ['patient'],
  '/patient/appointments': ['patient'],
  '/patient/history': ['patient'],
  '/patient/reviews': ['patient'],
  '/patient/profile': ['patient']
};

// Function to check if user has permission for a route
const hasRoutePermission = (path, userType) => {
  const permissions = routePermissions[path];
  if (!permissions) {
    return false;
  }
  return permissions.includes(userType);
};

// Access Denied Component
const AccessDenied = ({ userType, attemptedPath }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center max-w-md mx-auto px-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-4">
        You don't have permission to access this page. Your account type ({userType}) cannot access {attemptedPath}.
      </p>
      <button 
        onClick={() => {
          const dashboardPath = getDashboardPath(userType);
          window.history.replaceState({}, '', dashboardPath);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go to My Dashboard
      </button>
    </div>
  </div>
);

// Main App routing component
const AppRoutes = () => {
  const { currentPath } = useRouter();
  const { isAuthenticated, user, loading } = useAuth();

  console.log('AppRoutes render:', { currentPath, isAuthenticated: isAuthenticated(), user, loading });

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  // Public routes (no authentication required)
  if (currentPath === '/auth' || currentPath === '/') {
    // If user is already authenticated, redirect to their dashboard
    if (isAuthenticated() && user) {
      console.log('User already authenticated, redirecting to dashboard');
      const dashboardPath = getDashboardPath(user.user_type || user.userType);
      window.history.replaceState({}, '', dashboardPath);
      return null;
    }
    
    return (
      <Suspense fallback={<LoadingSpinner message="Loading login page..." />}>
        <AuthPage />
      </Suspense>
    );
  }

  // All other routes require authentication
  if (!isAuthenticated()) {
    console.log('User not authenticated, redirecting to auth');
    window.history.replaceState({}, '', '/auth');
    return null;
  }

  // Get user type for routing decisions
  const userType = user.user_type || user.userType;
  console.log('Authenticated user type:', userType);

  // Check route permissions
  if (!hasRoutePermission(currentPath, userType)) {
    console.log('Access denied for route:', currentPath, 'User type:', userType);
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <AccessDenied userType={userType} attemptedPath={currentPath} />
        </Layout>
      </Suspense>
    );
  }

  // Route definitions based on user role and path
  const renderRoute = () => {
    // Admin routes
    if (currentPath.startsWith('/admin')) {
      const AdminComponent = () => {
        switch (currentPath) {
          case '/admin':
            return <AdminDashboard />;
          case '/admin/doctors':
            return <AdminDoctorsDashboard />;
          case '/admin/appointments':
            return <PlaceholderPage title="Appointments" />;
          case '/admin/feedback':
            return <PlaceholderPage title="Feedback Management" />;
          case '/admin/analytics':
            return <PlaceholderPage title="Analytics" />;
          case '/admin/settings':
            return <PlaceholderPage title="Settings" />;
          default:
            return <AdminDashboard />;
        }
      };

      return (
        <Suspense fallback={<LoadingSpinner message="Loading admin dashboard..." />}>
          <Layout>
            <AdminComponent />
          </Layout>
        </Suspense>
      );
    }

    // Doctor routes - FIXED TO USE CORRECT COMPONENT
    if (currentPath.startsWith('/doctor')) {
      const DoctorComponent = () => {
        switch (currentPath) {
          case '/doctor':
            return <DoctorDashboard />; // THIS IS THE CORRECT COMPONENT
          case '/doctor/schedule':
            return <PlaceholderPage title="Schedule Management" />;
          case '/doctor/appointments':
            return <PlaceholderPage title="Appointments" />;
          case '/doctor/patients':
            return <PlaceholderPage title="My Patients" />;
          case '/doctor/reviews':
            return <PlaceholderPage title="Reviews" />;
          case '/doctor/profile':
            return <PlaceholderPage title="Profile" />;
          default:
            return <DoctorDashboard />; // THIS IS THE CORRECT COMPONENT
        }
      };

      return (
        <Suspense fallback={<LoadingSpinner message="Loading doctor dashboard..." />}>
          <Layout>
            <DoctorComponent />
          </Layout>
        </Suspense>
      );
    }

    // Patient routes
    if (currentPath.startsWith('/patient') || currentPath === '/doctors') {
      const PatientComponent = () => {
        switch (currentPath) {
          case '/patient':
            return <PatientDashboard />;
          case '/doctors':
            return <DoctorDashboard />; // This shows the doctor search for patients
          case '/patient/appointments':
            return <PlaceholderPage title="My Appointments" />;
          case '/patient/history':
            return <PlaceholderPage title="Medical History" />;
          case '/patient/reviews':
            return <PlaceholderPage title="Reviews" />;
          case '/patient/profile':
            return <PlaceholderPage title="Profile" />;
          default:
            return <PatientDashboard />;
        }
      };

      return (
        <Suspense fallback={<LoadingSpinner message="Loading patient dashboard..." />}>
          <Layout>
            <PatientComponent />
          </Layout>
        </Suspense>
      );
    }

    // If user is authenticated but on an invalid path, redirect to their dashboard
    console.log('Invalid path for authenticated user, redirecting to dashboard');
    const dashboardPath = getDashboardPath(userType);
    window.history.replaceState({}, '', dashboardPath);
    return null;
  };

  return renderRoute();
};

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
```

# src\assets\react.svg

This is a file of the type: SVG Image

# src\components\appointments\AppointmentBooking.jsx

```jsx
import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, CheckCircle, X } from 'lucide-react';

const AppointmentBooking = ({ doctor, isOpen, onClose, onBookingSuccess }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [patientNotes, setPatientNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const appointmentTypes = [
    { value: 'consultation', label: 'Consultation' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'check-up', label: 'Check-up' },
    { value: 'emergency', label: 'Emergency' }
  ];

  // Generate next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    return dates;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !appointmentType) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const appointmentData = {
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        notes: patientNotes,
        status: 'pending',
        location: doctor.location
      };

      // Call success callback
      if (onBookingSuccess) {
        onBookingSuccess(appointmentData);
      }

      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setAppointmentType('consultation');
      setPatientNotes('');
      
      alert('Appointment booked successfully! You will receive a confirmation email shortly.');
      onClose();
    } catch (error) {
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Book Appointment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Doctor Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin size={14} className="mr-1" />
                  {doctor.location}
                </div>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date *
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Choose a date</option>
              {getAvailableDates().map(date => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {doctor.availableSlots?.map((time, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                    selectedTime === time
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Appointment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Type *
            </label>
            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {appointmentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Patient Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={patientNotes}
              onChange={(e) => setPatientNotes(e.target.value)}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Please describe your symptoms or reason for visit..."
            />
          </div>

          {/* Summary */}
          {selectedDate && selectedTime && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2 flex items-center">
                <CheckCircle size={16} className="mr-2" />
                Appointment Summary
              </h4>
              <div className="text-sm text-green-800 space-y-1">
                <p><strong>Doctor:</strong> {doctor.name}</p>
                <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Type:</strong> {appointmentTypes.find(t => t.value === appointmentType)?.label}</p>
                <p><strong>Location:</strong> {doctor.location}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !selectedDate || !selectedTime}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                isSubmitting || !selectedDate || !selectedTime
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Booking...
                </div>
              ) : (
                'Book Appointment'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentBooking;
```

# src\components\auth\AuthPage.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Stethoscope, Shield, Heart, X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useRouter } from '../routing/Router';
import registrationApi from '../../apis/RegistrationApi.js';
import loginApi from '../../apis/LoginApi.js';
import forgotPasswordApi from '../../apis/ForgotPasswordApi.js';

// Toast Component
const Toast = ({ message, type, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getToastIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg border shadow-lg transform transition-all duration-300 ${getToastStyles()}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getToastIcon()}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="inline-flex rounded-md p-1.5 hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  const { login } = useAuth();
  const { navigate } = useRouter();

  // Toast functions
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    userType: 'patient',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // onClick Create Account - calls RegistrationApi
  const onClickCreateAccount = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Prepare registration data
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        userType: userType
      };

      // Call RegistrationApi
      const result = await registrationApi.createUser(registrationData);
      
      if (result.success) {
        console.log('Registration successful:', result.message);
        
        // After successful registration, automatically log the user in
        const userData = {
          user_type: userType,
          email_id: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          id: result.user?.id
        };
        
        await login(userData);
        showToast('Account created successfully! Welcome to Medicare Portal.', 'success');
      } else {
        setErrors({ submit: result.error });
        showToast(result.error, 'error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setErrors({ submit: errorMessage });
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // onClick Sign In - calls LoginApi with updated parameters
  const onClickSignIn = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Attempting login with:', {
        userType: userType,
        email: formData.email,
        password: '***'
      });

      // Call LoginApi with the correct parameters (userType, emailId, password)
      const result = await loginApi.loginUser(userType, formData.email, formData.password);
      
      console.log('Login API result:', result);
      
      if (result.success && result.user) {
        console.log('Login successful, user data from backend:', result.user);
        
        // Pass the user data from the backend to the AuthContext
        await login(result.user);
        
        showToast('Login successful! Redirecting...', 'success');
        
        // The AuthContext will handle the redirection based on user_type
        console.log('Login completed, redirection handled by AuthContext');
        
      } else {
        const errorMessage = result.error || 'Login failed';
        console.error('Login failed:', errorMessage);
        setErrors({ submit: errorMessage });
        showToast(errorMessage, 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      // Handle specific network errors
      if (error.message && error.message.includes('fetch')) {
        errorMessage = 'Cannot connect to server. Please check if the backend is running on http://127.0.0.1:8000';
      }
      
      setErrors({ submit: errorMessage });
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // onClick main submit button
  const onClickSubmit = async () => {
    if (isLogin) {
      await onClickSignIn();
    } else {
      await onClickCreateAccount();
    }
  };

  // onClick Forgot Password - calls ForgotPasswordApi
  const onClickForgotPassword = async () => {
    if (!formData.email) {
      setErrors({ email: 'Please enter your email address' });
      return;
    }

    setShowForgotPassword(false);
    setShowNewPasswordForm(true);
  };

  // onClick Set New Password - calls ForgotPasswordApi
  const onClickSetNewPassword = async () => {
    if (!formData.email) {
      setErrors({ email: 'Email is required' });
      return;
    }

    if (!formData.newPassword) {
      setErrors({ newPassword: 'New password is required' });
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrors({ confirmNewPassword: 'Passwords do not match' });
      return;
    }

    setIsLoading(true);

    try {
      // Call ForgotPasswordApi
      const result = await forgotPasswordApi.setPassword(formData.email, formData.newPassword);
      
      if (result.success) {
        showToast('Password reset successfully! You can now login with your new password.', 'success');
        setShowNewPasswordForm(false);
        setShowForgotPassword(false);
        resetForm();
        setIsLogin(true);
      } else {
        setErrors({ submit: result.error });
        showToast(result.error, 'error');
      }
    } catch (error) {
      const errorMessage = 'Failed to reset password. Please try again.';
      setErrors({ submit: errorMessage });
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      userType: 'patient',
      newPassword: '',
      confirmNewPassword: ''
    });
    setErrors({});
    setShowForgotPassword(false);
    setShowNewPasswordForm(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const getUserTypeIcon = (type) => {
    switch (type) {
      case 'patient': return <User className="w-5 h-5" />;
      case 'doctor': return <Stethoscope className="w-5 h-5" />;
      case 'admin': return <Shield className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getUserTypeColor = (type) => {
    switch (type) {
      case 'patient': return 'from-blue-500 to-blue-600';
      case 'doctor': return 'from-green-500 to-green-600';
      case 'admin': return 'from-purple-500 to-purple-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  // Show New Password Form
  if (showNewPasswordForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Set New Password</h2>
              <p className="text-gray-600 mt-2">Enter your email and new password</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); onClickSetNewPassword(); }} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.newPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmNewPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword}</p>}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-medium transition duration-200 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                } text-white`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Setting Password...
                  </div>
                ) : (
                  'Set New Password'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowNewPasswordForm(false);
                  setShowForgotPassword(false);
                  resetForm();
                }}
                className="w-full text-gray-600 hover:text-gray-800 transition duration-200"
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Show Forgot Password Form
  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
              <p className="text-gray-600 mt-2">Enter your email to continue</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); onClickForgotPassword(); }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-200 font-medium"
              >
                Continue
              </button>

              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="w-full text-gray-600 hover:text-gray-800 transition duration-200"
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main Auth Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="text-center p-8 pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Medicare Portal</h1>
            <p className="text-gray-600 mt-2">
              {isLogin ? 'Welcome back! Please sign in to your account.' : 'Create your account to get started.'}
            </p>
          </div>

          {/* Main Content */}
          <form onSubmit={(e) => { e.preventDefault(); onClickSubmit(); }} className="px-8 pb-8">
            {/* User Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a:</label>
              <div className="grid grid-cols-3 gap-2">
                {['patient', 'doctor', 'admin'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setUserType(type);
                      setFormData(prev => ({ ...prev, userType: type }));
                    }}
                    className={`p-3 rounded-lg border-2 transition duration-200 flex flex-col items-center ${
                      userType === type
                        ? `bg-gradient-to-r ${getUserTypeColor(type)} text-white border-transparent`
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    {getUserTypeIcon(type)}
                    <span className="text-xs mt-1 capitalize">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Name Fields (Registration only) */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John"
                      autoComplete="given-name"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Doe"
                      autoComplete="family-name"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone (Registration only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+1 (555) 123-4567"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password (Registration only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {/* Forgot Password Link (Login only) */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button with onClick */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-medium transition duration-200 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : `bg-gradient-to-r ${getUserTypeColor(userType)} hover:shadow-lg`
                } text-white`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </div>

            {/* Toggle Mode */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className={`font-medium bg-gradient-to-r ${getUserTypeColor(userType)} bg-clip-text text-transparent hover:underline`}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Features */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm mb-4">Secure • HIPAA Compliant • 24/7 Support</p>
          <div className="flex justify-center space-x-6 text-xs text-gray-500 flex-wrap">
            <span>✓ Book Appointments</span>
            <span>✓ Manage Schedules</span>
            <span>✓ Patient Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
```

# src\components\dashboards\AdminDashboard.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  User,
  Stethoscope,
  Shield,
  Heart
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import adminDashboardApi from '../../apis/AdminDashboardApi.js';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Load dashboard data on component mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const userType = user?.user_type || user?.userType;
      const emailId = user?.email_id || user?.email;

      if (!userType || !emailId) {
        throw new Error('User information not available');
      }

      const result = await adminDashboardApi.getDashboardData(userType, emailId);

      if (result.success) {
        setDashboardData(result.data);
      } else {
        setError(result.error || 'Failed to load dashboard data');
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const StatCard = ({ title, value, change, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, color, onClick }) => (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );

  const AppointmentCard = ({ appointment }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{appointment.patient_name}</h4>
          <p className="text-sm text-gray-600">{appointment.doctor_name} - {appointment.department}</p>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {appointment.date}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {appointment.time}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {appointment.status}
          </span>
          <button className="text-gray-400 hover:text-gray-600">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const FeedbackCard = ({ feedback }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <p className="font-medium text-gray-900">{feedback.patient_name}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">{feedback.doctor_name} - {feedback.department}</p>
          <p className="text-sm text-gray-500 mt-1">{feedback.comment?.substring(0, 60)}...</p>
          <p className="text-xs text-gray-400 mt-1">{feedback.date}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            feedback.status === 'responded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {feedback.status}
          </span>
          <button className="text-gray-400 hover:text-gray-600">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const NotificationCard = ({ notification }) => (
    <div className={`p-4 rounded-lg border-l-4 ${
      notification.priority === 'high' ? 'border-red-500 bg-red-50' :
      notification.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
      'border-blue-500 bg-blue-50'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
        </div>
        <div className={`w-2 h-2 rounded-full ${
          notification.priority === 'high' ? 'bg-red-500' :
          notification.priority === 'medium' ? 'bg-yellow-500' :
          'bg-blue-500'
        }`}></div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-96"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main dashboard render
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {dashboardData?.admin_info?.first_name}! Here's what's happening at Medicare today.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Appointments"
          value={dashboardData?.dashboard_stats?.total_appointments?.toLocaleString() || 0}
          change="+12%"
          trend="up"
          icon={Calendar}
          color="bg-blue-500"
        />
        <StatCard
          title="Today's Appointments"
          value={dashboardData?.dashboard_stats?.today_appointments || 0}
          change="+5%"
          trend="up"
          icon={Clock}
          color="bg-green-500"
        />
        <StatCard
          title="Active Doctors"
          value={dashboardData?.dashboard_stats?.active_doctors || 0}
          change="+2"
          trend="up"
          icon={Users}
          color="bg-purple-500"
        />
        <StatCard
          title="Average Rating"
          value={dashboardData?.dashboard_stats?.average_rating || 0}
          change="+0.2"
          trend="up"
          icon={Star}
          color="bg-yellow-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          title="Manage Doctors"
          description="Add, edit, or remove doctors"
          icon={Users}
          color="bg-blue-500"
          onClick={() => window.location.href = '/admin/doctors'}
        />
        <QuickActionCard
          title="View Appointments"
          description="Manage all appointments"
          icon={Calendar}
          color="bg-green-500"
          onClick={() => window.location.href = '/admin/appointments'}
        />
        <QuickActionCard
          title="Review Feedback"
          description="Handle patient feedback"
          icon={MessageSquare}
          color="bg-purple-500"
          onClick={() => window.location.href = '/admin/feedback'}
        />
        <QuickActionCard
          title="Analytics"
          description="View detailed reports"
          icon={BarChart3}
          color="bg-orange-500"
          onClick={() => window.location.href = '/admin/analytics'}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {dashboardData?.recent_appointments?.length > 0 ? (
              dashboardData.recent_appointments.map((appointment, index) => (
                <AppointmentCard key={index} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No recent appointments</h4>
                <p className="text-gray-600">Appointment data will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Feedback</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {dashboardData?.recent_feedback?.length > 0 ? (
              dashboardData.recent_feedback.map((feedback, index) => (
                <FeedbackCard key={index} feedback={feedback} />
              ))
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No recent feedback</h4>
                <p className="text-gray-600">Patient feedback will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Performing Doctors */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Doctors</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">This Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData?.top_doctors?.length > 0 ? (
                dashboardData.top_doctors.map((doctor, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                          <Stethoscope className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.patients}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm text-gray-900">{doctor.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.appointments} appointments</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No doctor data available</h4>
                    <p className="text-gray-600">Doctor performance data will appear here</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Overview and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* System Alerts */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData?.system_alerts?.length > 0 ? (
                dashboardData.system_alerts.map((alert, index) => (
                  <div key={index} className={`flex items-center p-4 border rounded-lg ${
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    alert.type === 'error' ? 'bg-red-50 border-red-200' :
                    alert.type === 'success' ? 'bg-green-50 border-green-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    {alert.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" /> :
                     alert.type === 'error' ? <AlertTriangle className="w-5 h-5 text-red-600 mr-3" /> :
                     alert.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-600 mr-3" /> :
                     <Activity className="w-5 h-5 text-blue-600 mr-3" />}
                    <div>
                      <p className={`text-sm font-medium ${
                        alert.type === 'warning' ? 'text-yellow-800' :
                        alert.type === 'error' ? 'text-red-800' :
                        alert.type === 'success' ? 'text-green-800' :
                        'text-blue-800'
                      }`}>{alert.title}</p>
                      <p className={`text-xs ${
                        alert.type === 'warning' ? 'text-yellow-700' :
                        alert.type === 'error' ? 'text-red-700' :
                        alert.type === 'success' ? 'text-green-700' :
                        'text-blue-700'
                      }`}>{alert.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        {dashboardData?.dashboard_stats?.pending_feedback || 15} feedback responses pending
                      </p>
                      <p className="text-xs text-yellow-700">Some patient feedback requires admin response</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">System performance is optimal</p>
                      <p className="text-xs text-blue-700">All services are running smoothly</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Monthly backup completed</p>
                      <p className="text-xs text-green-700">Data backup was successful</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Analytics Summary */}
        <div className="space-y-6">
          
          {/* Quick Analytics */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Analytics</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Patients</span>
                <span className="font-semibold text-gray-900">{dashboardData?.dashboard_stats?.total_patients?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monthly Revenue</span>
                <span className="font-semibold text-green-600">${dashboardData?.dashboard_stats?.monthly_revenue?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Patient Satisfaction</span>
                <span className="font-semibold text-yellow-600">{dashboardData?.dashboard_stats?.patient_satisfaction || 94}%</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Uptime</span>
                  <span className="font-semibold text-green-600">{dashboardData?.dashboard_stats?.system_uptime || '99.9'}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData?.notifications?.length > 0 ? (
                dashboardData.notifications.map((notification, index) => (
                  <NotificationCard key={index} notification={notification} />
                ))
              ) : (
                <div className="text-center py-4">
                  <Activity className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">No new notifications</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Info Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Administrator Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Role</p>
              <p className="font-medium text-gray-900">System Administrator</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{dashboardData?.admin_info?.email_id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Last Login</p>
              <p className="font-medium text-gray-900">
                {dashboardData?.admin_info?.last_login ? 
                  new Date(dashboardData.admin_info.last_login).toLocaleString() : 
                  'N/A'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Activity className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Access Level</p>
              <p className="font-medium text-gray-900">{dashboardData?.admin_info?.access_level || 'Full Access'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
```

# src\components\dashboards\AdminDoctorsDashboard.jsx

```jsx
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Save,
  X,
  Stethoscope,
  Users,
  Star,
  Eye
} from 'lucide-react';

const AdminDoctorsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Sample doctors data
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      firstName: 'Dr. Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@medicare.com',
      phone: '+1 (555) 123-4567',
      specialization: 'Cardiology',
      department: 'Cardiology',
      experience: '8 years',
      qualification: 'MD, FACC',
      status: 'active',
      rating: 4.8,
      patients: 245,
      location: 'Building A, Floor 2',
      joinDate: '2020-03-15',
      schedule: {
        monday: { start: '09:00', end: '17:00', active: true },
        tuesday: { start: '09:00', end: '17:00', active: true },
        wednesday: { start: '09:00', end: '17:00', active: true },
        thursday: { start: '09:00', end: '17:00', active: true },
        friday: { start: '09:00', end: '15:00', active: true },
        saturday: { start: '', end: '', active: false },
        sunday: { start: '', end: '', active: false }
      }
    },
    {
      id: 2,
      firstName: 'Dr. Michael',
      lastName: 'Chen',
      email: 'michael.chen@medicare.com',
      phone: '+1 (555) 234-5678',
      specialization: 'Neurology',
      department: 'Neurology',
      experience: '12 years',
      qualification: 'MD, PhD',
      status: 'active',
      rating: 4.9,
      patients: 189,
      location: 'Building B, Floor 3',
      joinDate: '2018-07-22',
      schedule: {
        monday: { start: '08:00', end: '16:00', active: true },
        tuesday: { start: '08:00', end: '16:00', active: true },
        wednesday: { start: '08:00', end: '16:00', active: true },
        thursday: { start: '08:00', end: '16:00', active: true },
        friday: { start: '08:00', end: '14:00', active: true },
        saturday: { start: '10:00', end: '14:00', active: true },
        sunday: { start: '', end: '', active: false }
      }
    },
    {
      id: 3,
      firstName: 'Dr. Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@medicare.com',
      phone: '+1 (555) 345-6789',
      specialization: 'Pediatrics',
      department: 'Pediatrics',
      experience: '6 years',
      qualification: 'MD, FAAP',
      status: 'inactive',
      rating: 4.7,
      patients: 156,
      location: 'Building A, Floor 1',
      joinDate: '2021-01-10',
      schedule: {
        monday: { start: '10:00', end: '18:00', active: true },
        tuesday: { start: '10:00', end: '18:00', active: true },
        wednesday: { start: '10:00', end: '18:00', active: true },
        thursday: { start: '10:00', end: '18:00', active: true },
        friday: { start: '10:00', end: '16:00', active: true },
        saturday: { start: '', end: '', active: false },
        sunday: { start: '', end: '', active: false }
      }
    }
  ]);

  const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Emergency Medicine'];
  const specializations = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Emergency Medicine', 'Internal Medicine'];

  const [newDoctor, setNewDoctor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    department: '',
    experience: '',
    qualification: '',
    location: '',
    status: 'active'
  });

  const [editDoctor, setEditDoctor] = useState({});

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || doctor.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || doctor.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddDoctor = () => {
    if (newDoctor.firstName && newDoctor.lastName && newDoctor.email) {
      const doctor = {
        ...newDoctor,
        id: doctors.length + 1,
        rating: 0,
        patients: 0,
        joinDate: new Date().toISOString().split('T')[0],
        schedule: {
          monday: { start: '09:00', end: '17:00', active: true },
          tuesday: { start: '09:00', end: '17:00', active: true },
          wednesday: { start: '09:00', end: '17:00', active: true },
          thursday: { start: '09:00', end: '17:00', active: true },
          friday: { start: '09:00', end: '17:00', active: true },
          saturday: { start: '', end: '', active: false },
          sunday: { start: '', end: '', active: false }
        }
      };
      setDoctors([...doctors, doctor]);
      setNewDoctor({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialization: '',
        department: '',
        experience: '',
        qualification: '',
        location: '',
        status: 'active'
      });
      setShowAddModal(false);
    }
  };

  const handleEditDoctor = () => {
    setDoctors(doctors.map(doc => doc.id === editDoctor.id ? editDoctor : doc));
    setShowEditModal(false);
  };

  const handleDeleteDoctor = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(doc => doc.id !== id));
    }
  };

  const handleUpdateSchedule = (schedule) => {
    setDoctors(doctors.map(doc => 
      doc.id === selectedDoctor.id ? { ...doc, schedule } : doc
    ));
    setShowScheduleModal(false);
  };

  const DoctorCard = ({ doctor }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {doctor.firstName} {doctor.lastName}
            </h3>
            <p className="text-sm text-gray-600">{doctor.specialization}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            doctor.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {doctor.status}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Award className="w-4 h-4 mr-2" />
          {doctor.qualification}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {doctor.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          {doctor.patients} patients
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Star className="w-4 h-4 mr-2 text-yellow-500" />
          {doctor.rating}/5.0
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            setEditDoctor(doctor);
            setShowEditModal(true);
          }}
          className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-1"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => {
            setSelectedDoctor(doctor);
            setShowScheduleModal(true);
          }}
          className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors duration-200 flex items-center justify-center gap-1"
        >
          <Calendar className="w-4 h-4" />
          Schedule
        </button>
        <button
          onClick={() => handleDeleteDoctor(doctor.id)}
          className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const DoctorModal = ({ show, onClose, title, doctor, setDoctor, onSave }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={doctor.firstName}
                  onChange={(e) => setDoctor({...doctor, firstName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={doctor.lastName}
                  onChange={(e) => setDoctor({...doctor, lastName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={doctor.email}
                  onChange={(e) => setDoctor({...doctor, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="doctor@medicare.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={doctor.phone}
                  onChange={(e) => setDoctor({...doctor, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={doctor.department}
                  onChange={(e) => setDoctor({...doctor, department: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <select
                  value={doctor.specialization}
                  onChange={(e) => setDoctor({...doctor, specialization: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Specialization</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <input
                  type="text"
                  value={doctor.experience}
                  onChange={(e) => setDoctor({...doctor, experience: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 8 years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
                <input
                  type="text"
                  value={doctor.qualification}
                  onChange={(e) => setDoctor({...doctor, qualification: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., MD, FACC"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={doctor.location}
                  onChange={(e) => setDoctor({...doctor, location: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Building A, Floor 2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={doctor.status}
                  onChange={(e) => setDoctor({...doctor, status: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onSave}
                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {title.includes('Add') ? 'Add Doctor' : 'Save Changes'}
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ScheduleModal = ({ show, onClose, doctor }) => {
    const [schedule, setSchedule] = useState(doctor?.schedule || {});

    if (!show || !doctor) return null;

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Manage Schedule - {doctor.firstName} {doctor.lastName}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {days.map(day => (
                <div key={day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-24">
                    <span className="font-medium text-gray-700 capitalize">{day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={schedule[day]?.active || false}
                      onChange={(e) => setSchedule({
                        ...schedule,
                        [day]: { ...schedule[day], active: e.target.checked }
                      })}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                  {schedule[day]?.active && (
                    <>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Start:</label>
                        <input
                          type="time"
                          value={schedule[day]?.start || ''}
                          onChange={(e) => setSchedule({
                            ...schedule,
                            [day]: { ...schedule[day], start: e.target.value }
                          })}
                          className="p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">End:</label>
                        <input
                          type="time"
                          value={schedule[day]?.end || ''}
                          onChange={(e) => setSchedule({
                            ...schedule,
                            [day]: { ...schedule[day], end: e.target.value }
                          })}
                          className="p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleUpdateSchedule(schedule)}
                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Schedule
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
          <p className="text-gray-600 mt-1">Manage doctors, schedules, and assignments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add New Doctor
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Doctors</p>
              <p className="text-2xl font-bold text-gray-900">
                {doctors.filter(d => d.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {(doctors.reduce((acc, d) => acc + d.rating, 0) / doctors.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Modals */}
      <DoctorModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Doctor"
        doctor={newDoctor}
        setDoctor={setNewDoctor}
        onSave={handleAddDoctor}
      />

      <DoctorModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Doctor"
        doctor={editDoctor}
        setDoctor={setEditDoctor}
        onSave={handleEditDoctor}
      />

      <ScheduleModal
        show={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        doctor={selectedDoctor}
      />
    </div>
  );
};

export default AdminDoctorsDashboard;
```

# src\components\dashboards\DoctorDashboard.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Bell, 
  Activity,
  TrendingUp,
  TrendingDown,
  Heart,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Phone,
  Mail,
  MapPin,
  Award,
  BookOpen,
  MessageSquare,
  RefreshCw,
  User,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import doctorDashboardApi from '../../apis/DoctorDashboardApi.js';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load dashboard data on component mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const userType = user?.user_type || user?.userType;
      const emailId = user?.email_id || user?.email;

      if (!userType || !emailId) {
        throw new Error('User information not available');
      }

      const result = await doctorDashboardApi.getDashboardData(userType, emailId);

      if (result.success) {
        setDashboardData(result.data);
      } else {
        setError(result.error || 'Failed to load dashboard data');
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const StatCard = ({ title, value, change, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const AppointmentCard = ({ appointment }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{appointment.patient_name}</h4>
          <p className="text-sm text-gray-600">{appointment.type}</p>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {appointment.time}
            </div>
            <div className="flex items-center">
              <Activity className="w-4 h-4 mr-1" />
              {appointment.duration}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {appointment.status}
          </span>
          <div className="flex space-x-1">
            <button className="text-blue-600 hover:text-blue-800 p-1">
              <Eye className="w-4 h-4" />
            </button>
            <button className="text-green-600 hover:text-green-800 p-1">
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PatientCard = ({ patient }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{patient.name}</h4>
            <p className="text-sm text-gray-600">{patient.condition}</p>
            <p className="text-xs text-gray-500">Last visit: {patient.last_visit}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            patient.status === 'Active' ? 'bg-green-100 text-green-800' :
            patient.status === 'Follow-up needed' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {patient.status}
          </span>
          <button className="text-blue-600 hover:text-blue-800 p-1">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const ReviewCard = ({ review }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <p className="font-medium text-gray-900">{review.patient_name}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
          <p className="text-xs text-gray-500">{review.date}</p>
        </div>
      </div>
    </div>
  );

  const NotificationCard = ({ notification }) => (
    <div className={`p-4 rounded-lg border-l-4 ${
      notification.priority === 'high' ? 'border-red-500 bg-red-50' :
      notification.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
      'border-blue-500 bg-blue-50'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
        </div>
        <div className={`w-2 h-2 rounded-full ${
          notification.priority === 'high' ? 'bg-red-500' :
          notification.priority === 'medium' ? 'bg-yellow-500' :
          'bg-blue-500'
        }`}></div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-96"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main dashboard render
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, Dr. {dashboardData?.doctor_info?.first_name} {dashboardData?.doctor_info?.last_name}
          </h1>
          <p className="text-gray-600 mt-1">
            {dashboardData?.doctor_info?.specialty} • {dashboardData?.doctor_info?.experience}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Appointments"
          value={dashboardData?.dashboard_stats?.today_appointments || 0}
          change="+2 from yesterday"
          trend="up"
          icon={Calendar}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Patients"
          value={dashboardData?.dashboard_stats?.total_patients || 0}
          change="+12 this month"
          trend="up"
          icon={Users}
          color="bg-green-500"
        />
        <StatCard
          title="Average Rating"
          value={dashboardData?.dashboard_stats?.average_rating || 0}
          change="+0.1 from last month"
          trend="up"
          icon={Star}
          color="bg-yellow-500"
        />
        <StatCard
          title="Pending Reviews"
          value={dashboardData?.dashboard_stats?.pending_reviews || 0}
          icon={MessageSquare}
          color="bg-purple-500"
        />
      </div>

      {/* Doctor Info Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{dashboardData?.doctor_info?.email_id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{dashboardData?.doctor_info?.mobile}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Qualifications</p>
              <p className="font-medium text-gray-900">{dashboardData?.doctor_info?.qualifications}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Experience</p>
              <p className="font-medium text-gray-900">{dashboardData?.doctor_info?.experience}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData?.today_schedule?.length > 0 ? (
                dashboardData.today_schedule.map((appointment, index) => (
                  <AppointmentCard key={index} appointment={appointment} />
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No appointments today</h4>
                  <p className="text-gray-600">Enjoy your free day!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Notifications */}
        <div className="space-y-6">
          
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData?.notifications?.length > 0 ? (
                dashboardData.notifications.map((notification, index) => (
                  <NotificationCard key={index} notification={notification} />
                ))
              ) : (
                <div className="text-center py-4">
                  <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">No new notifications</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Appointments</span>
                <span className="font-semibold text-gray-900">{dashboardData?.dashboard_stats?.total_appointments || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">{dashboardData?.dashboard_stats?.completed_appointments || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-semibold text-yellow-600">{dashboardData?.dashboard_stats?.pending_appointments || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cancelled</span>
                <span className="font-semibold text-red-600">{dashboardData?.dashboard_stats?.cancelled_appointments || 0}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Reviews</span>
                  <span className="font-semibold text-gray-900">{dashboardData?.dashboard_stats?.total_reviews || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Patients and Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Patients */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {dashboardData?.recent_patients?.length > 0 ? (
              dashboardData.recent_patients.map((patient, index) => (
                <PatientCard key={index} patient={patient} />
              ))
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No recent patients</h4>
                <p className="text-gray-600">Patient data will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {dashboardData?.recent_reviews?.length > 0 ? (
              dashboardData.recent_reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))
            ) : (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No recent reviews</h4>
                <p className="text-gray-600">Patient reviews will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Patient Satisfaction</h4>
              <p className="text-3xl font-bold text-blue-600 mt-2">{dashboardData?.dashboard_stats?.average_rating || 0}/5</p>
              <p className="text-sm text-gray-600 mt-1">Based on {dashboardData?.dashboard_stats?.total_reviews || 0} reviews</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Appointment Success</h4>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {dashboardData?.dashboard_stats?.completed_appointments && dashboardData?.dashboard_stats?.total_appointments
                  ? Math.round((dashboardData.dashboard_stats.completed_appointments / dashboardData.dashboard_stats.total_appointments) * 100)
                  : 0}%
              </p>
              <p className="text-sm text-gray-600 mt-1">Completion rate</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Patient Growth</h4>
              <p className="text-3xl font-bold text-purple-600 mt-2">+15%</p>
              <p className="text-sm text-gray-600 mt-1">This month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Calendar className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Schedule</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Patients</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <MessageSquare className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Reviews</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <User className="w-8 h-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
```

# src\components\dashboards\PatientDashboard.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Star, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  MapPin,
  Phone,
  Mail,
  Heart,
  Activity,
  FileText,
  Bell,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import patientDashboardApi from '../../apis/PatientDashboardApi.js';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load dashboard data on component mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const userType = user?.user_type || user?.userType;
      const emailId = user?.email_id || user?.email;

      if (!userType || !emailId) {
        throw new Error('User information not available');
      }

      const result = await patientDashboardApi.getDashboardData(userType, emailId);

      if (result.success) {
        setDashboardData(result.data);
      } else {
        setError(result.error || 'Failed to load dashboard data');
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const StatCard = ({ title, value, change, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const AppointmentCard = ({ appointment, isPast = false }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{appointment.doctor_name}</h4>
          <p className="text-sm text-gray-600">{appointment.specialty}</p>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {appointment.date}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {appointment.time}
            </div>
          </div>
          {!isPast && appointment.location && (
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {appointment.location}
            </div>
          )}
          <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {appointment.type}
          </span>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {appointment.status}
          </span>
          
          {isPast && appointment.rating && (
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < appointment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          )}
          
          <div className="flex space-x-1">
            {!isPast && (
              <>
                <button className="text-blue-600 hover:text-blue-800 p-1">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            {isPast && appointment.can_review && (
              <button className="text-green-600 hover:text-green-800 text-xs px-2 py-1 border border-green-200 rounded">
                Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, color, onClick }) => (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );

  const NotificationCard = ({ notification }) => (
    <div className={`p-4 rounded-lg border-l-4 ${
      notification.priority === 'high' ? 'border-red-500 bg-red-50' :
      notification.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
      'border-blue-500 bg-blue-50'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
        </div>
        <div className={`w-2 h-2 rounded-full ${
          notification.priority === 'high' ? 'bg-red-500' :
          notification.priority === 'medium' ? 'bg-yellow-500' :
          'bg-blue-500'
        }`}></div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-96"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main dashboard render
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {dashboardData?.patient_info?.first_name} {dashboardData?.patient_info?.last_name}
          </h1>
          <p className="text-gray-600 mt-1">Manage your appointments and health records</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Book Appointment
          </button>
        </div>
      </div>

      {/* Health Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Appointments"
          value={dashboardData?.dashboard_stats?.total_appointments || 0}
          change="+2 this month"
          trend="up"
          icon={Calendar}
          color="bg-blue-500"
        />
        <StatCard
          title="Upcoming Appointments"
          value={dashboardData?.dashboard_stats?.upcoming_appointments || 0}
          icon={Clock}
          color="bg-green-500"
        />
        <StatCard
          title="Average Rating Given"
          value={dashboardData?.dashboard_stats?.average_rating || 0}
          change="+0.1 from last visit"
          trend="up"
          icon={Star}
          color="bg-yellow-500"
        />
        <StatCard
          title="Last Checkup"
          value={dashboardData?.dashboard_stats?.last_checkup ? new Date(dashboardData.dashboard_stats.last_checkup).toLocaleDateString() : 'N/A'}
          icon={Activity}
          color="bg-purple-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          title="Find Doctors"
          description="Search and book appointments"
          icon={User}
          color="bg-blue-500"
          onClick={() => window.location.href = '/doctors'}
        />
        <QuickActionCard
          title="Medical History"
          description="View past appointments"
          icon={FileText}
          color="bg-green-500"
          onClick={() => window.location.href = '/patient/history'}
        />
        <QuickActionCard
          title="My Reviews"
          description="Rate your experiences"
          icon={Star}
          color="bg-yellow-500"
          onClick={() => window.location.href = '/patient/reviews'}
        />
        <QuickActionCard
          title="Emergency"
          description="Contact emergency services"
          icon={Heart}
          color="bg-red-500"
          onClick={() => alert('Emergency services: 911')}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData?.upcoming_appointments?.length > 0 ? (
                dashboardData.upcoming_appointments.map((appointment, index) => (
                  <AppointmentCard key={index} appointment={appointment} />
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h4>
                  <p className="text-gray-600">Book your first appointment to get started</p>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Book Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData?.notifications?.length > 0 ? (
                dashboardData.notifications.map((notification, index) => (
                  <NotificationCard key={index} notification={notification} />
                ))
              ) : (
                <div className="text-center py-4">
                  <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">No new notifications</p>
                </div>
              )}
            </div>
          </div>

          {/* Health Tips */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Health Tips</h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData?.health_tips?.length > 0 ? (
                dashboardData.health_tips.map((tip, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${
                    tip.category === 'hydration' ? 'bg-blue-50 border-blue-200' :
                    tip.category === 'exercise' ? 'bg-green-50 border-green-200' :
                    'bg-purple-50 border-purple-200'
                  }`}>
                    <h4 className={`font-medium mb-1 ${
                      tip.category === 'hydration' ? 'text-blue-900' :
                      tip.category === 'exercise' ? 'text-green-900' :
                      'text-purple-900'
                    }`}>{tip.title}</h4>
                    <p className={`text-sm ${
                      tip.category === 'hydration' ? 'text-blue-700' :
                      tip.category === 'exercise' ? 'text-green-700' :
                      'text-purple-700'
                    }`}>{tip.description}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">Stay Hydrated</h4>
                    <p className="text-sm text-blue-700">Drink at least 8 glasses of water daily for optimal health.</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-1">Regular Exercise</h4>
                    <p className="text-sm text-green-700">30 minutes of daily exercise can improve your overall health.</p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-1">Sleep Well</h4>
                    <p className="text-sm text-purple-700">Aim for 7-9 hours of quality sleep each night.</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed Appointments</span>
                <span className="font-semibold text-green-600">{dashboardData?.dashboard_stats?.completed_appointments || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending Appointments</span>
                <span className="font-semibold text-yellow-600">{dashboardData?.dashboard_stats?.pending_appointments || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cancelled Appointments</span>
                <span className="font-semibold text-red-600">{dashboardData?.dashboard_stats?.cancelled_appointments || 0}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Reviews Given</span>
                  <span className="font-semibold text-gray-900">{dashboardData?.dashboard_stats?.total_reviews || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Past Appointments */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboardData?.past_appointments?.length > 0 ? (
              dashboardData.past_appointments.slice(0, 4).map((appointment, index) => (
                <AppointmentCard key={index} appointment={appointment} isPast={true} />
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No past appointments</h4>
                <p className="text-gray-600">Your appointment history will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{dashboardData?.patient_info?.email_id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{dashboardData?.patient_info?.mobile}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="font-medium text-gray-900">
                {dashboardData?.patient_info?.member_since ? 
                  new Date(dashboardData.patient_info.member_since).toLocaleDateString() : 
                  'N/A'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Heart className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Health Score</p>
              <p className="font-medium text-gray-900">{dashboardData?.patient_info?.health_score || 'Good'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
```

# src\components\layout\Layout.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Stethoscope, 
  Shield, 
  LogOut, 
  Menu, 
  X, 
  Home, 
  Calendar, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Bell,
  Search,
  FileText,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useRouter } from '../routing/Router';

const Layout = ({ children }) => {
  const { user, logout, forceLogout } = useAuth();
  const { currentPath, navigate } = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Mock notification count
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time and hide sidebar flash
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Small delay to prevent flash

    return () => clearTimeout(timer);
  }, []);

  const getUserTypeIcon = (type) => {
    switch (type) {
      case 'admin': return <Shield className="w-5 h-5" />;
      case 'doctor': return <Stethoscope className="w-5 h-5" />;
      case 'patient': return <User className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getUserTypeColor = (type) => {
    switch (type) {
      case 'admin': return 'from-purple-500 to-purple-600';
      case 'doctor': return 'from-green-500 to-green-600';
      case 'patient': return 'from-blue-500 to-blue-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const getNavigationItems = () => {
    const userType = user?.user_type || user?.userType;
    
    switch (userType) {
      case 'admin':
        return [
          { path: '/admin', label: 'Dashboard', icon: Home },
          { path: '/admin/doctors', label: 'Manage Doctors', icon: Users },
          { path: '/admin/appointments', label: 'Appointments', icon: Calendar },
          { path: '/admin/feedback', label: 'Feedback', icon: MessageSquare },
          { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
          { path: '/admin/settings', label: 'Settings', icon: Settings }
        ];
      case 'doctor':
        return [
          { path: '/doctor', label: 'Dashboard', icon: Home },
          { path: '/doctor/schedule', label: 'My Schedule', icon: Calendar },
          { path: '/doctor/appointments', label: 'Appointments', icon: Clock },
          { path: '/doctor/patients', label: 'My Patients', icon: Users },
          { path: '/doctor/reviews', label: 'Reviews', icon: MessageSquare },
          { path: '/doctor/profile', label: 'Profile', icon: User }
        ];
      case 'patient':
        return [
          { path: '/patient', label: 'Dashboard', icon: Home },
          { path: '/doctors', label: 'Find Doctors', icon: Users },
          { path: '/patient/appointments', label: 'My Appointments', icon: Calendar },
          { path: '/patient/history', label: 'Medical History', icon: FileText },
          { path: '/patient/reviews', label: 'My Reviews', icon: MessageSquare },
          { path: '/patient/profile', label: 'Profile', icon: User }
        ];
      default:
        return [];
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        console.log('Starting logout process...');
        
        // Close sidebar first
        setSidebarOpen(false);
        
        // Call logout
        logout();
        
        // Verify logout after a short delay
        setTimeout(() => {
          const hasUserData = localStorage.getItem('medicare_user') || 
                             localStorage.getItem('medicare_user_type') || 
                             localStorage.getItem('medicare_email_id');
          
          if (hasUserData) {
            console.warn('Logout verification failed - some data remains');
            // Use force logout as fallback
            if (forceLogout) {
              console.log('Using force logout as fallback');
              forceLogout();
            } else {
              // Manual cleanup
              localStorage.clear();
              window.location.href = '/auth';
            }
          } else {
            console.log('✅ Logout verification successful');
          }
        }, 500);
        
      } catch (error) {
        console.error('Logout error:', error);
        
        // Fallback logout
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/auth';
      }
    }
  };

  const isActiveRoute = (path) => {
    if (path === '/admin' || path === '/doctor' || path === '/patient') {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const getBreadcrumbs = () => {
    const pathSegments = currentPath.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    pathSegments.forEach((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Customize specific labels
      if (segment === 'doctors' && pathSegments[0] !== 'admin') {
        label = 'Find Doctors';
      }
      
      breadcrumbs.push({ path, label });
    });
    
    return breadcrumbs;
  };

  const userType = user?.user_type || user?.userType;

  // Show loading state to prevent layout flash
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Placeholder sidebar */}
        <div className="hidden lg:block w-64 bg-white border-r border-gray-200"></div>
        {/* Main content loading */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className={`w-8 h-8 bg-gradient-to-r ${getUserTypeColor(userType)} rounded-lg flex items-center justify-center mr-3`}>
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Medicare</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className={`w-10 h-10 bg-gradient-to-r ${getUserTypeColor(userType)} rounded-full flex items-center justify-center mr-3`}>
              {getUserTypeIcon(userType)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {user?.firstName || 'User'} {user?.lastName || ''}
              </p>
              <p className="text-sm text-gray-600 capitalize">{userType}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 pb-4 flex-1">
          <div className="space-y-2">
            {getNavigationItems().map((item, index) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);
              return (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    isActive
                      ? `bg-gradient-to-r ${getUserTypeColor(userType)} text-white shadow-lg`
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Logout Button */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Breadcrumbs - Hidden on mobile */}
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
                {getBreadcrumbs().map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <span>/</span>}
                    <button
                      onClick={() => navigate(crumb.path)}
                      className={`hover:text-gray-900 transition-colors duration-200 ${
                        index === getBreadcrumbs().length - 1 ? 'text-gray-900 font-medium' : ''
                      }`}
                    >
                      {crumb.label}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              {/* Mobile title */}
              <div className="lg:hidden flex items-center">
                <div className={`w-8 h-8 bg-gradient-to-r ${getUserTypeColor(userType)} rounded-lg flex items-center justify-center mr-3`}>
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">Medicare</span>
              </div>

              {/* Right side - Notifications and Search */}
              <div className="flex items-center space-x-4">
                
                {/* Search - Hidden on mobile */}
                <div className="hidden md:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                    />
                  </div>
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className={`w-8 h-8 bg-gradient-to-r ${getUserTypeColor(userType)} rounded-full flex items-center justify-center`}>
                      {getUserTypeIcon(userType)}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName || 'User'} {user?.lastName || ''}
                      </p>
                      <p className="text-xs text-gray-600 capitalize">{userType}</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <p>&copy; 2025 Medicare Portal. All rights reserved.</p>
              <div className="flex space-x-4">
                <button className="hover:text-gray-900 transition-colors duration-200">Privacy</button>
                <button className="hover:text-gray-900 transition-colors duration-200">Terms</button>
                <button className="hover:text-gray-900 transition-colors duration-200">Support</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
```

# src\components\routing\ProtectedRoute.jsx

```jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useRouter } from './Router';
import { Shield, User, Stethoscope, AlertTriangle } from 'lucide-react';

// Route permissions configuration - centralized for easy management
export const ROUTE_PERMISSIONS = {
  // Admin-only routes
  '/admin': ['admin'],
  '/admin/doctors': ['admin'],
  '/admin/appointments': ['admin'],
  '/admin/feedback': ['admin'],
  '/admin/analytics': ['admin'],
  '/admin/settings': ['admin'],
  
  // Doctor-only routes
  '/doctor': ['doctor'],
  '/doctor/schedule': ['doctor'],
  '/doctor/appointments': ['doctor'],
  '/doctor/patients': ['doctor'],
  '/doctor/reviews': ['doctor'],
  '/doctor/profile': ['doctor'],
  
  // Patient-only routes
  '/patient': ['patient'],
  '/doctors': ['patient'], // Patient can search for doctors
  '/patient/appointments': ['patient'],
  '/patient/history': ['patient'],
  '/patient/reviews': ['patient'],
  '/patient/profile': ['patient'],
  
  // Shared routes (all authenticated users can access)
  '/profile': ['admin', 'doctor', 'patient']
};

// Function to check if user has permission for a specific route
export const hasRoutePermission = (path, userType) => {
  console.log('Checking route permission:', { path, userType });
  
  if (!userType) {
    console.log('No user type provided');
    return false;
  }
  
  const permissions = ROUTE_PERMISSIONS[path];
  if (!permissions) {
    console.log('Route not found in permissions:', path);
    return false;
  }
  
  const hasPermission = permissions.includes(userType);
  console.log('Permission check result:', hasPermission);
  return hasPermission;
};

// Helper function to get dashboard path based on user type
const getDashboardPath = (userType) => {
  switch (userType) {
    case 'admin':
      return '/admin';
    case 'doctor':
      return '/doctor';
    case 'patient':
      return '/patient';
    default:
      return '/patient';
  }
};

// Loading Spinner Component
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

// Protected Route Component
export const ProtectedRoute = ({ children, allowedRoles = [], redirectTo = '/auth' }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const { navigate, currentPath } = useRouter();

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  // Redirect to auth if not authenticated
  if (!isAuthenticated()) {
    console.log('User not authenticated, redirecting to:', redirectTo);
    // Store the attempted path for redirect after login
    localStorage.setItem('medicare_redirect_path', currentPath);
    navigate(redirectTo, { replace: true });
    return null;
  }

  const userType = user?.user_type || user?.userType;

  // Check role-based access if allowedRoles is specified
  if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    console.log('User role not in allowed roles:', { userType, allowedRoles });
    return <UnauthorizedPage userType={userType} attemptedPath={currentPath} />;
  }

  return children;
};

// Public Route Component (redirects if already authenticated)
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { navigate } = useRouter();

  if (isAuthenticated()) {
    console.log('User already authenticated, redirecting to dashboard');
    
    // Check for stored redirect path
    const redirectPath = localStorage.getItem('medicare_redirect_path');
    if (redirectPath && redirectPath !== '/auth') {
      localStorage.removeItem('medicare_redirect_path');
      
      // Verify user has permission for the stored path
      const userType = user?.user_type || user?.userType;
      if (hasRoutePermission(redirectPath, userType)) {
        navigate(redirectPath, { replace: true });
        return null;
      }
    }

    // Default redirect based on user type
    const userType = user?.user_type || user?.userType;
    const defaultPath = getDashboardPath(userType);
    navigate(defaultPath, { replace: true });
    return null;
  }

  return children;
};

// Unauthorized Page Component
const UnauthorizedPage = ({ userType, attemptedPath }) => {
  const { navigate } = useRouter();

  const getIcon = () => {
    switch (userType) {
      case 'admin': return <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      case 'doctor': return <Stethoscope className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      case 'patient': return <User className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      default: return <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />;
    }
  };

  const getErrorMessage = () => {
    const routeOwner = getRouteOwner(attemptedPath);
    if (routeOwner) {
      return `This page is restricted to ${routeOwner} users only. Your account type (${userType}) does not have access to ${attemptedPath}.`;
    }
    return `You don't have permission to access this page. Your account type (${userType}) cannot access ${attemptedPath}.`;
  };

  const getRouteOwner = (path) => {
    const permissions = ROUTE_PERMISSIONS[path];
    if (!permissions || permissions.length === 0) return null;
    
    if (permissions.length === 1) {
      return permissions[0];
    } else if (permissions.length === 3) {
      return 'authenticated';
    }
    return permissions.join(' and ');
  };

  const handleGoToDashboard = () => {
    const dashboardPath = getDashboardPath(userType);
    navigate(dashboardPath);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-lg mx-auto px-4">
        {getIcon()}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {getErrorMessage()}
        </p>
        
        {/* Action buttons */}
        <div className="space-y-3">
          <button 
            onClick={handleGoToDashboard}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Go to My Dashboard
          </button>
          <button 
            onClick={() => window.history.back()}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Go Back
          </button>
        </div>

        {/* Help text */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Need access?</strong> Contact your administrator if you believe you should have access to this page.
          </p>
        </div>
      </div>
    </div>
  );
};

// 404 Not Found Page
export const NotFoundPage = () => {
  const { navigate } = useRouter();
  const { user, isAuthenticated } = useAuth();

  const handleGoHome = () => {
    if (isAuthenticated()) {
      const userType = user?.user_type || user?.userType;
      const dashboardPath = getDashboardPath(userType);
      navigate(dashboardPath);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-3">
          <button 
            onClick={handleGoHome}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            {isAuthenticated() ? 'Go to Dashboard' : 'Go to Login'}
          </button>
          <button 
            onClick={() => window.history.back()}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

// Route Guard Hook - can be used in components to check permissions
export const useRouteGuard = () => {
  const { user, isAuthenticated } = useAuth();
  const { currentPath } = useRouter();

  const checkPermission = (path = currentPath) => {
    if (!isAuthenticated()) return false;
    
    const userType = user?.user_type || user?.userType;
    return hasRoutePermission(path, userType);
  };

  const requiresPermission = (requiredRoles) => {
    if (!isAuthenticated()) return false;
    
    const userType = user?.user_type || user?.userType;
    return requiredRoles.includes(userType);
  };

  return {
    checkPermission,
    requiresPermission,
    userType: user?.user_type || user?.userType,
    isAuthenticated: isAuthenticated()
  };
};
```

# src\components\routing\Router.jsx

```jsx
import React, { useState, useEffect, createContext, useContext } from 'react';

// Router Context
const RouterContext = createContext();

// Custom hook to use router
export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a Router');
  }
  return context;
};

// Custom Router Component
export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path, options = {}) => {
    if (path !== currentPath) {
      if (options.replace) {
        window.history.replaceState({}, '', path);
      } else {
        window.history.pushState({}, '', path);
      }
      setCurrentPath(path);
      setSearchParams(new URLSearchParams(path.split('?')[1] || ''));
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const goForward = () => {
    window.history.forward();
  };

  const value = {
    currentPath,
    searchParams,
    navigate,
    goBack,
    goForward
  };

  return (
    <RouterContext.Provider value={value}>
      <div data-current-path={currentPath}>
        {typeof children === 'function' ? children(value) : children}
      </div>
    </RouterContext.Provider>
  );
};

// Route Component
export const Route = ({ path, component: Component, exact = false, children }) => {
  const { currentPath } = useRouter();
  
  const isMatch = exact 
    ? currentPath === path 
    : currentPath.startsWith(path);

  if (!isMatch) return null;

  if (Component) {
    return <Component />;
  }

  return children || null;
};

// Routes Component
export const Routes = ({ children }) => {
  const { currentPath } = useRouter();
  
  let matchedRoute = null;

  React.Children.forEach(children, (child) => {
    if (!matchedRoute && React.isValidElement(child)) {
      const { path, exact = false } = child.props;
      const isMatch = exact 
        ? currentPath === path 
        : currentPath.startsWith(path);
      
      if (isMatch) {
        matchedRoute = child;
      }
    }
  });

  return matchedRoute;
};

// Link Component
export const Link = ({ to, children, className, onClick }) => {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
```

# src\contexts\AuthContext.jsx

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Authentication Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (check localStorage)
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('medicare_user');
        const savedUserType = localStorage.getItem('medicare_user_type');
        const savedEmailId = localStorage.getItem('medicare_email_id');
        
        console.log('Checking auth - localStorage data:', { savedUser, savedUserType, savedEmailId });
        
        if (savedUser && savedUserType && savedEmailId) {
          const userData = JSON.parse(savedUser);
          // Ensure we have the required fields and normalize user type
          if (userData.user_type && userData.email_id) {
            // Normalize user type field for consistency
            userData.userType = userData.user_type;
            setUser(userData);
            console.log('User restored from localStorage:', userData);
          } else {
            // Clear incomplete data
            clearAuthData();
            console.log('Cleared incomplete auth data');
          }
        }
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        // Clear corrupted data
        clearAuthData();
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const clearAuthData = () => {
    // List of all possible medicare-related localStorage keys
    const medicareKeys = [
      'medicare_user',
      'medicare_user_type', 
      'medicare_email_id',
      'medicare_token',
      'medicare_refresh_token',
      'medicare_redirect_path',
      'medicare_session',
      'medicare_preferences',
      'medicare_last_login'
    ];
    
    // Remove each key
    medicareKeys.forEach(key => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        console.log('Cleared localStorage key:', key);
      }
    });
    
    // Also clear any sessionStorage items
    medicareKeys.forEach(key => {
      if (sessionStorage.getItem(key)) {
        sessionStorage.removeItem(key);
        console.log('Cleared sessionStorage key:', key);
      }
    });
    
    // Verify clearance
    const remainingMedicareKeys = medicareKeys.filter(key => 
      localStorage.getItem(key) || sessionStorage.getItem(key)
    );
    
    if (remainingMedicareKeys.length > 0) {
      console.warn('Some localStorage/sessionStorage keys were not cleared:', remainingMedicareKeys);
    } else {
      console.log('All medicare-related storage cleared successfully');
    }
  };

  const login = async (userData) => {
    // This function now expects userData from the backend API response
    return new Promise((resolve, reject) => {
      try {
        console.log('Login function called with userData:', userData);
        
        // Validate required fields from backend
        if (!userData.user_type || !userData.email_id) {
          reject(new Error('Invalid user data: user_type and email_id are required'));
          return;
        }

        // Create user object with backend data and normalize fields
        const user = {
          user_type: userData.user_type,
          email_id: userData.email_id,
          userType: userData.user_type, // Normalized field for component compatibility
          email: userData.email_id,     // Normalized field for component compatibility
          firstName: userData.first_name || extractFirstName(userData.email_id),
          lastName: userData.last_name || '',
          loginTime: new Date().toISOString(),
          id: userData.id || Date.now()
        };

        console.log('Setting user in state:', user);

        // Save to state
        setUser(user);
        
        // Save to localStorage - save each piece separately for easy access in API calls
        localStorage.setItem('medicare_user', JSON.stringify(user));
        localStorage.setItem('medicare_user_type', userData.user_type);
        localStorage.setItem('medicare_email_id', userData.email_id);
        
        console.log('User logged in successfully and saved to localStorage');
        
        // Redirect based on user type
        redirectUserToDashboard(userData.user_type);
        
        resolve(user);
      } catch (error) {
        console.error('Login error in AuthContext:', error);
        reject(error);
      }
    });
  };

  const redirectUserToDashboard = (userType) => {
    console.log('Redirecting user based on type:', userType);
    
    let redirectPath;
    switch (userType) {
      case 'admin':
        redirectPath = '/admin';
        break;
      case 'doctor':
        redirectPath = '/doctor';
        break;
      case 'patient':
        redirectPath = '/patient';
        break;
      default:
        redirectPath = '/patient'; // Default fallback
    }
    
    console.log('Redirecting to:', redirectPath);
    
    // Use setTimeout to ensure state is updated before navigation
    setTimeout(() => {
      window.history.pushState({}, '', redirectPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 100);
  };

  // Enhanced logout with verification
  const logout = () => {
    console.log('Initiating logout process...');
    
    try {
      // Clear user state first
      setUser(null);
      
      // Clear all localStorage data
      clearAuthData();
      
      // Additional cleanup - scan for any medicare-related keys
      const allKeys = Object.keys(localStorage);
      const medicareKeys = allKeys.filter(key => key.toLowerCase().includes('medicare'));
      
      medicareKeys.forEach(key => {
        localStorage.removeItem(key);
        console.log('Removed additional medicare key:', key);
      });
      
      // Verify logout success
      const remainingKeys = [
        'medicare_user',
        'medicare_user_type', 
        'medicare_email_id',
        'medicare_token'
      ].filter(key => localStorage.getItem(key));
      
      if (remainingKeys.length === 0) {
        console.log('✅ Logout successful - all data cleared');
      } else {
        console.warn('⚠️ Some data may not have been cleared:', remainingKeys);
        
        // Force clear critical items one more time
        localStorage.removeItem('medicare_user');
        localStorage.removeItem('medicare_user_type');
        localStorage.removeItem('medicare_email_id');
        localStorage.removeItem('medicare_token');
      }
      
      console.log('Final localStorage state:', {
        hasUser: !!localStorage.getItem('medicare_user'),
        hasUserType: !!localStorage.getItem('medicare_user_type'),
        hasEmail: !!localStorage.getItem('medicare_email_id'),
        hasToken: !!localStorage.getItem('medicare_token'),
        totalKeys: Object.keys(localStorage).length
      });
      
    } catch (error) {
      console.error('Error during logout:', error);
      
      // Fallback - force clear critical items
      try {
        localStorage.clear(); // Nuclear option - clear everything
        console.log('Performed complete localStorage clear as fallback');
      } catch (clearError) {
        console.error('Failed to clear localStorage:', clearError);
      }
    }
    
    // Redirect to auth page
    setTimeout(() => {
      window.history.replaceState({}, '', '/auth');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 100);
  };

  const isAuthenticated = () => {
    const authenticated = !!(user && (user.user_type || user.userType) && (user.email_id || user.email));
    console.log('isAuthenticated check:', authenticated, user);
    return authenticated;
  };

  const hasRole = (roles) => {
    if (!user) {
      console.log('hasRole check: no user');
      return false;
    }
    
    const userRole = user.user_type || user.userType;
    console.log('hasRole check:', { userRole, roles });
    
    if (Array.isArray(roles)) {
      return roles.includes(userRole);
    }
    return userRole === roles;
  };

  const updateUser = (updatedData) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      
      // Ensure both user_type and userType are updated for consistency
      if (updatedData.user_type) {
        updatedUser.userType = updatedData.user_type;
      }
      if (updatedData.userType) {
        updatedUser.user_type = updatedData.userType;
      }
      
      setUser(updatedUser);
      localStorage.setItem('medicare_user', JSON.stringify(updatedUser));
      
      // Update individual localStorage items if they changed
      if (updatedData.user_type || updatedData.userType) {
        localStorage.setItem('medicare_user_type', updatedUser.user_type);
      }
      if (updatedData.email_id || updatedData.email) {
        localStorage.setItem('medicare_email_id', updatedUser.email_id || updatedUser.email);
      }
      
      console.log('User updated:', updatedUser);
    }
  };

  // Helper function to extract first name from email
  const extractFirstName = (email) => {
    if (!email) return 'User';
    const localPart = email.split('@')[0];
    // Remove numbers and special characters, capitalize first letter
    const cleanName = localPart.replace(/[^a-zA-Z]/g, '');
    return cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase() || 'User';
  };

  // Helper function to get user data for API requests
  const getUserForApi = () => {
    return {
      user_type: localStorage.getItem('medicare_user_type'),
      email_id: localStorage.getItem('medicare_email_id')
    };
  };

  // Helper function to get headers for API requests
  const getApiHeaders = (additionalHeaders = {}) => {
    const userType = localStorage.getItem('medicare_user_type');
    const emailId = localStorage.getItem('medicare_email_id');
    
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(userType && { 'X-User-Type': userType }),
      ...(emailId && { 'X-User-Email': emailId }),
      ...additionalHeaders
    };
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    updateUser,
    loading,
    getUserForApi,
    getApiHeaders
  };

  console.log('AuthContext current state:', { user, loading, isAuthenticated: isAuthenticated() });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

# src\index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
@layer base {
  html {
    font-family: system-ui, sans-serif;
  }
}

@layer components {
  /* Layout Components - Prevent layout shifts and improve loading */
  
  /* Prevent layout shift during loading */
  .layout-container {
    display: flex;
    min-height: 100vh;
    background-color: #f9fafb;
  }

  /* Sidebar styles */
  .sidebar {
    width: 16rem; /* 64 * 0.25rem = 16rem */
    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    position: fixed;
    height: 100vh;
    z-index: 50;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  @media (min-width: 1024px) {
    .sidebar {
      position: static;
      transform: translateX(0);
      z-index: auto;
    }
  }

  /* Main content area */
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  @media (min-width: 1024px) {
    .main-content {
      margin-left: 0; /* Remove margin since sidebar is in flow */
    }
  }

  /* Header */
  .header {
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 30;
  }

  /* Content area */
  .content {
    flex: 1;
    overflow-y: auto;
  }

  /* Loading states */
  .loading-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* Prevent flash of unstyled content */
  .layout-loading {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .layout-loaded {
    opacity: 1;
  }

  /* Mobile sidebar backdrop */
  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 40;
  }

  @media (min-width: 1024px) {
    .sidebar-backdrop {
      display: none;
    }
  }

  /* Animation for smooth transitions */
  .fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Prevent layout shift for navigation */
  .nav-item {
    transition: all 0.2s ease-in-out;
    transform: translateZ(0); /* Force hardware acceleration */
  }

  .nav-item:hover {
    transform: translateX(2px);
  }

  /* Smooth scrolling */
  .content {
    scroll-behavior: smooth;
  }

  /* Focus styles for accessibility */
  .nav-item:focus,
  button:focus,
  input:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
}

@layer utilities {
  /* Custom utility styles can go here */
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Content scrollbar - more subtle */
.content::-webkit-scrollbar {
  width: 6px;
}

.content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
```

# src\main.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

# src\utils\apiHelper.js

```js
// utils/apiHelper.js
const API_BASE_URL = 'http://127.0.0.1:8000/v1';

class ApiHelper {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Get user data from localStorage for API requests
  getUserData() {
    return {
      user_type: localStorage.getItem('medicare_user_type'),
      email_id: localStorage.getItem('medicare_email_id')
    };
  }

  // Get headers with user authentication data
  getAuthHeaders(additionalHeaders = {}) {
    const userData = this.getUserData();
    
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(userData.user_type && { 'X-User-Type': userData.user_type }),
      ...(userData.email_id && { 'X-User-Email': userData.email_id }),
      ...additionalHeaders
    };
  }

  // Make authenticated API request
  async makeAuthenticatedRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const userData = this.getUserData();

    // Check if user is authenticated
    if (!userData.user_type || !userData.email_id) {
      throw new Error('User not authenticated. Please login again.');
    }

    const defaultOptions = {
      headers: this.getAuthHeaders(options.headers)
    };

    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    try {
      console.log(`Making authenticated request to: ${url}`);
      console.log('Request options:', requestOptions);
      
      const response = await fetch(url, requestOptions);
      const responseText = await response.text();
      
      console.log('Response status:', response.status);
      console.log('Response text:', responseText);
      
      if (response.ok) {
        const data = responseText ? JSON.parse(responseText) : {};
        return {
          success: true,
          data: data,
          status: response.status
        };
      } else {
        let errorData = {};
        try {
          errorData = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
        }
        
        // Handle authentication errors
        if (response.status === 401 || response.status === 403) {
          // Clear local storage and redirect to login
          localStorage.removeItem('medicare_user');
          localStorage.removeItem('medicare_user_type');
          localStorage.removeItem('medicare_email_id');
          window.location.href = '/auth';
          return {
            success: false,
            error: 'Session expired. Please login again.',
            status: response.status
          };
        }
        
        return {
          success: false,
          error: errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          data: errorData
        };
      }
    } catch (error) {
      console.error('Network error:', error);
      return {
        success: false,
        error: error.message || 'Network error occurred. Please check your connection.',
        status: 0
      };
    }
  }

  // Helper method for GET requests
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.makeAuthenticatedRequest(url, {
      method: 'GET'
    });
  }

  // Helper method for POST requests
  async post(endpoint, data = {}) {
    const userData = this.getUserData();
    
    // Include user data in the request body
    const requestBody = {
      ...data,
      user_type: userData.user_type,
      email_id: userData.email_id
    };

    return this.makeAuthenticatedRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(requestBody)
    });
  }

  // Helper method for PUT requests
  async put(endpoint, data = {}) {
    const userData = this.getUserData();
    
    // Include user data in the request body
    const requestBody = {
      ...data,
      user_type: userData.user_type,
      email_id: userData.email_id
    };

    return this.makeAuthenticatedRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(requestBody)
    });
  }

  // Helper method for DELETE requests
  async delete(endpoint, data = {}) {
    const userData = this.getUserData();
    
    // Include user data in the request body for DELETE requests
    const requestBody = {
      ...data,
      user_type: userData.user_type,
      email_id: userData.email_id
    };

    return this.makeAuthenticatedRequest(endpoint, {
      method: 'DELETE',
      body: JSON.stringify(requestBody)
    });
  }

  // Check if user is authenticated
  isAuthenticated() {
    const userData = this.getUserData();
    return !!(userData.user_type && userData.email_id);
  }

  // Get current user type
  getCurrentUserType() {
    return localStorage.getItem('medicare_user_type');
  }

  // Get current user email
  getCurrentUserEmail() {
    return localStorage.getItem('medicare_email_id');
  }
}

// Create and export a singleton instance
const apiHelper = new ApiHelper();
export default apiHelper;
```

# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

# vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: []
  }
})
```

