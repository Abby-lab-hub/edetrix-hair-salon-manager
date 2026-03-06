import React, { useState } from 'react';
import CatalogSelector from './CatalogSelector';
import CustomStyleForm from './CustomStyleForm';
import BookingForm from './BookingForm';

export default function Dashboard({ user, onCreateOrder }) {
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedStyle, setSelectedStyle] = useState(null);

  const handleStyleSelected = (style) => {
    setSelectedStyle(style);
    setActiveTab('booking');
  };

  const handleBookingCreated = () => {
    setSelectedStyle(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}! Book your next hairstyle.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`pb-4 px-4 font-semibold transition ${
            activeTab === 'catalog'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Browse Catalog
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`pb-4 px-4 font-semibold transition ${
            activeTab === 'custom'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Custom Style
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-4 px-4 font-semibold transition ${
            activeTab === 'bookings'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          My Bookings ({bookings.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        {activeTab === 'catalog' && (
          <CatalogSelector onStyleSelected={handleStyleSelected} />
        )}

        {activeTab === 'custom' && (
          <CustomStyleForm onStyleSelected={handleStyleSelected} />
        )}

        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
            <p className="text-gray-600 mb-6">View your style orders here. Orders are pending admin confirmation.</p>
            <p className="text-center text-gray-500 py-8">Orders will appear here after you submit your first booking.</p>
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {selectedStyle && activeTab === 'booking' && (
        <BookingForm
          user={user}
          style={selectedStyle}
          onClose={() => setSelectedStyle(null)}
          onBookingCreated={handleBookingCreated}
          onCreateOrder={onCreateOrder}
        />
      )}
    </div>
  );
}