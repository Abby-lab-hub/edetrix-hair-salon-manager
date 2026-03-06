import React, { useState } from 'react';

export default function BookingForm({ user, style, onClose, onBookingCreated, onCreateOrder }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      alert('Please select date and time');
      return;
    }

    const orderData = {
      styleName: style.name,
      styleDescription: style.description || '',
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
      price: style.price,
    };

    onCreateOrder(orderData);
    onBookingCreated();
    onClose();
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Complete Your Booking</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Style Summary */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-lg mb-2">{style.name}</h3>
            <p className="text-gray-600 mb-4">{style.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">${style.price}</span>
              {style.isCustom && (
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Custom Style
                </span>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={minDate}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any specific instructions for the stylist?"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Style Price:</span>
                <span className="font-semibold">${style.price}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold text-blue-600">${style.price}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}