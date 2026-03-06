import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/customer/Dashboard';
import Subscriptions from './components/billing/Subscriptions';
import BillingPage from './components/billing/BillingPage';
import AdminPanel from './components/admin/AdminPanel';
import LandingPage from './components/LandingPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage(userData.role === 'admin' ? 'admin' : 'dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentPage('home');
  };

  const handleCreateOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      customerId: user.id,
      status: 'pending',
      createdAt: new Date().toLocaleDateString(),
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    alert('Order created successfully! Awaiting admin confirmation.');
  };

  const handleConfirmOrder = (orderId) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: 'confirmed' } : o);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  const handleCancelOrder = (orderId) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  const handleUpdateSubscription = (subscription) => {
    const updatedUser = { ...user, subscription };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' && !user && <LandingPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'login' && <Login onLogin={handleLogin} setCurrentPage={setCurrentPage} />}
      {currentPage === 'signup' && <Signup onLogin={handleLogin} setCurrentPage={setCurrentPage} />}
      {currentPage === 'dashboard' && user && user.role !== 'admin' && <Dashboard user={user} onCreateOrder={handleCreateOrder} />}
      {currentPage === 'subscriptions' && user && user.role !== 'admin' && <Subscriptions user={user} onUpdateSubscription={handleUpdateSubscription} />}
      {currentPage === 'billing' && user && user.role !== 'admin' && <BillingPage user={user} orders={orders} />}
      {currentPage === 'admin' && user && user.role === 'admin' && <AdminPanel orders={orders} onConfirmOrder={handleConfirmOrder} onCancelOrder={handleCancelOrder} />}
    </div>
  );
}