import React, { useState } from 'react';

export default function CustomStyleForm({ onStyleSelected }) {
  const [formData, setFormData] = useState({
    description: '',
    hairType: '',
    hairLength: '',
    preferences: '',
    budget: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description || !formData.hairType || !formData.budget) {
      alert('Please fill in all required fields');
      return;
    }

    const customStyle = {
      id: 'custom-' + Date.now(),
      name: formData.description.substring(0, 30) + '...',
      category: 'custom',
      price: parseFloat(formData.budget),
      image: '✨',
      description: formData.description,
      hairType: formData.hairType,
      hairLength: formData.hairLength,
      preferences: formData.preferences,
      isCustom: true
    };

    onStyleSelected(customStyle);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Describe Your Custom Style</h2>
      <p className="text-gray-600 mb-6">Can't find what you're looking for? Tell us your vision!</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Style Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your ideal hairstyle in detail..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hair Type *
            </label>
            <select
              name="hairType"
              value={formData.hairType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select hair type...</option>
              <option value="straight">Straight</option>
              <option value="wavy">Wavy</option>
              <option value="curly">Curly</option>
              <option value="coily">Coily</option>
              <option value="kinky">Kinky</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Hair Length
            </label>
            <select
              name="hairLength"
              value={formData.hairLength}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select current length...</option>
              <option value="short">Short (above ears)</option>
              <option value="medium">Medium (ear level)</option>
              <option value="long">Long (shoulder length+)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Preferences
          </label>
          <textarea
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any specific requirements? (e.g., low maintenance, color treatment, styling needs)"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Budget (USD) *
          </label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            min="0"
            step="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your budget..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Continue to Booking
        </button>
      </form>
    </div>
  );
}