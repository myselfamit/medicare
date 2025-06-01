import React, { useState } from 'react';
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
  const { user, logout } = useAuth();
  const { currentPath, navigate } = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Mock notification count

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
    switch (user.userType) {
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

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      setSidebarOpen(false);
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
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ path, label });
    });
    
    return breadcrumbs;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:inset-0`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className={`w-8 h-8 bg-gradient-to-r ${getUserTypeColor(user.userType)} rounded-lg flex items-center justify-center mr-3`}>
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
            <div className={`w-10 h-10 bg-gradient-to-r ${getUserTypeColor(user.userType)} rounded-full flex items-center justify-center mr-3`}>
              {getUserTypeIcon(user.userType)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-600 capitalize">{user.userType}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 pb-4">
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
                      ? `bg-gradient-to-r ${getUserTypeColor(user.userType)} text-white shadow-lg`
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

      {/* Main content */}
      <div className="lg:ml-64">
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
                <div className={`w-8 h-8 bg-gradient-to-r ${getUserTypeColor(user.userType)} rounded-lg flex items-center justify-center mr-3`}>
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
                    <div className={`w-8 h-8 bg-gradient-to-r ${getUserTypeColor(user.userType)} rounded-full flex items-center justify-center`}>
                      {getUserTypeIcon(user.userType)}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-600 capitalize">{user.userType}</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-screen">
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