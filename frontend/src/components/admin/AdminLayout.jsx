import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64 w-full">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Hamburger Menu Button - Only visible on mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            data-testid="mobile-menu-button"
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          {/* Language Switcher */}
          <div className="ml-auto">
            <LanguageSwitcher />
          </div>
        </div>
        
        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;