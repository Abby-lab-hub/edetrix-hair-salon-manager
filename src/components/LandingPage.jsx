import React from 'react';

export default function LandingPage({ setCurrentPage }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Edetrix Hair Salon</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Book your perfect hairstyle. Choose from our exclusive catalog or describe your vision. Premium styling at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('signup')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </button>
            <button
              onClick={() => setCurrentPage('login')}
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Edetrix?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="text-3xl mb-4">✂️</div>
            <h3 className="text-xl font-bold mb-2">Professional Styles</h3>
            <p className="text-gray-600">Browse our carefully curated catalog of trending hairstyles or describe your custom vision.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
            <p className="text-gray-600">Schedule your appointment in minutes with instant confirmation and flexible subscription plans.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="text-3xl mb-4">💳</div>
            <h3 className="text-xl font-bold mb-2">Flexible Plans</h3>
            <p className="text-gray-600">Choose from monthly, quarterly, or annual subscriptions with transparent pricing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}