import React, { useState } from 'react';

export default function Login({ onLogin, setCurrentPage }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const user = allUsers.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-center mb-8">Sign in to your Edetrix account</p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <button onClick={() => setCurrentPage('signup')} className="text-blue-600 hover:underline font-semibold">
              Sign up here
            </button>
          </p>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
            <p className="font-semibold text-gray-900 mb-2">Demo Credentials:</p>
            <p className="text-gray-700"><strong>Customer:</strong></p>
            <p className="text-gray-600">Email: customer@edetrix.com | Password: password123</p>
            <p className="text-gray-700 mt-2"><strong>Admin:</strong></p>
            <p className="text-gray-600">Email: admin@edetrix.com | Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}