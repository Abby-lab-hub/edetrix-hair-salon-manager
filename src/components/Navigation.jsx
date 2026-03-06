import React, { useState } from 'react';

export default function Navigation({ user, onLogout, setCurrentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setCurrentPage('home');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div onClick={() => setCurrentPage('home')} className="flex items-center cursor-pointer hover:opacity-80">
            <span className="text-2xl font-bold text-blue-600">✂️ Edetrix</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <>
                    <button onClick={() => setCurrentPage('admin')} className="text-blue-600 font-semibold hover:text-blue-800">
                      Admin Panel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setCurrentPage('dashboard')} className="text-gray-700 hover:text-blue-600 font-medium">
                      Dashboard
                    </button>
                    <button onClick={() => setCurrentPage('subscriptions')} className="text-gray-700 hover:text-blue-600 font-medium">
                      Subscriptions
                    </button>
                    <button onClick={() => setCurrentPage('billing')} className="text-gray-700 hover:text-blue-600 font-medium">
                      Billing
                    </button>
                  </>
                )}
                <div className="flex items-center space-x-4 pl-8 border-l border-gray-200">
                  <span className="text-sm text-gray-600">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => setCurrentPage('login')} className="text-gray-700 hover:text-blue-600 font-medium">
                  Login
                </button>
                <button onClick={() => setCurrentPage('signup')} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {user ? (
              <>
                {user.role !== 'admin' && (
                  <>
                    <button onClick={() => { setCurrentPage('dashboard'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Dashboard
                    </button>
                    <button onClick={() => { setCurrentPage('subscriptions'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Subscriptions
                    </button>
                    <button onClick={() => { setCurrentPage('billing'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                      Billing
                    </button>
                  </>
                )}
                {user.role === 'admin' && (
                  <button onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-blue-600 font-semibold hover:bg-gray-100 rounded">
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Login
                </button>
                <button onClick={() => { setCurrentPage('signup'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded font-medium">
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}