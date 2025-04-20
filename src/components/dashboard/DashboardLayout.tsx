import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { School, LayoutDashboard, Users, FileText, Settings, LogOut, Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const NavItem = ({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-primary-light text-primary'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
      onClick={closeSidebar}
    >
      <span className="mr-3">{icon}</span>
      {children}
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navigation bar */}
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                type="button"
                className="p-2 rounded-md text-gray-400 lg:hidden"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex-shrink-0 flex items-center">
                <School className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold text-gray-900">Al Modaqdimah</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:flex items-center">
                <span className="text-sm text-gray-700 mr-2">
                  {user?.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                leftIcon={<LogOut className="h-4 w-4" />}
                className="ml-2"
              >
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for mobile */}
        <div
          className={`fixed inset-0 z-20 transition-opacity ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={closeSidebar}></div>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform lg:translate-x-0 lg:static lg:h-auto ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-16 flex items-center justify-between px-4 lg:hidden">
            <div className="flex items-center">
              <School className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">Al Modaqdimah</span>
            </div>
            <button
              type="button"
              className="p-2 rounded-md text-gray-400"
              onClick={closeSidebar}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-2 py-4 space-y-1">
            <NavItem to="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />}>
              Dashboard
            </NavItem>
            <NavItem to="/dashboard/applicants" icon={<Users className="h-5 w-5" />}>
              Applicants
            </NavItem>
            <NavItem to="/dashboard/cv-management" icon={<FileText className="h-5 w-5" />}>
              CV Management
            </NavItem>
            <NavItem to="/dashboard/settings" icon={<Settings className="h-5 w-5" />}>
              Settings
            </NavItem>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;