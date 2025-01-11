import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { School } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <School className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ClassTools</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Tools</Link>
              <Link to="/templates" className="text-gray-600 hover:text-gray-900">Templates</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            </div>
          </div>
        </nav>
      </header>

      <Outlet />

      <footer className="bg-white mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <School className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">ClassTools</span>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-600">
              © 2024 ClassTools. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}