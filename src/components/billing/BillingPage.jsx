import React, { useState, useEffect } from 'react';

export default function BillingPage({ user, orders }) {
  const [userSubscription, setUserSubscription] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const currentUser = allUsers.find(u => u.id === user.id);

    if (currentUser && currentUser.subscription) {
      setUserSubscription(currentUser.subscription);
    }
    
    if (orders) {
      const filteredOrders = orders.filter(o => o.customerId === user.id);
      setUserOrders(filteredOrders);
    }
  }, [user.id, orders]);

  const handleUpdatePayment = () => {
    const cardNumber = prompt('Enter card number (last 4 digits):');
    if (cardNumber) {
      setPaymentMethod({
        type: 'card',
        last4: cardNumber.slice(-4),
        brand: 'Visa',
        updatedAt: new Date().toLocaleDateString()
      });
      alert('Payment method updated successfully!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Billing & Payments</h1>
        <p className="text-gray-600">Manage your subscription and billing information</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Subscription Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold mb-6">Subscription Details</h2>

          {userSubscription ? (
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600">Current Plan</p>
                <p className="text-xl font-bold text-gray-900">{userSubscription.planName}</p>
              </div>

              <div className="pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-xl font-bold text-blue-600">
                  ${userSubscription.price} / {userSubscription.duration.toLowerCase()}
                </p>
              </div>

              <div className="pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="text-lg font-semibold text-green-700">
                    {userSubscription.status.charAt(0).toUpperCase() + userSubscription.status.slice(1)}
                  </p>
                </div>
              </div>

              <div className="pb-4">
                <p className="text-sm text-gray-600">Renewal Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(userSubscription.renewalDate).toLocaleDateString()}
                </p>
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold">
                Change Plan
              </button>
              <button className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-semibold">
                Cancel Subscription
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No active subscription</p>
              <a href="/subscriptions" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Browse Plans
              </a>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

          {paymentMethod ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white mb-6">
                <p className="text-sm font-semibold mb-8">Saved Card</p>
                <p className="text-2xl font-bold tracking-widest mb-4">•••• •••• •••• {paymentMethod.last4}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-75">CARD BRAND</p>
                    <p className="font-semibold">{paymentMethod.brand}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Updated on {paymentMethod.updatedAt}
              </p>
              <button
                onClick={handleUpdatePayment}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Update Card
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No payment method saved</p>
              <button
                onClick={handleUpdatePayment}
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Add Payment Method
              </button>
            </div>
          )}
        </div>
      </div>

       {/* Orders */}
       <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
         <h2 className="text-2xl font-bold mb-6">My Orders</h2>

         {userOrders.length > 0 ? (
           <div className="overflow-x-auto">
             <table className="w-full">
               <thead>
                 <tr className="border-b border-gray-200">
                   <th className="text-left py-4 px-4 font-semibold text-gray-700">Style</th>
                   <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
                   <th className="text-left py-4 px-4 font-semibold text-gray-700">Time</th>
                   <th className="text-left py-4 px-4 font-semibold text-gray-700">Amount</th>
                   <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                 </tr>
               </thead>
               <tbody>
                 {userOrders.map((order) => (
                   <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                     <td className="py-4 px-4 text-gray-900 font-medium">{order.styleName}</td>
                     <td className="py-4 px-4 text-gray-700">{order.date}</td>
                     <td className="py-4 px-4 text-gray-700">{order.time}</td>
                     <td className="py-4 px-4 font-semibold text-gray-900">${order.price}</td>
                     <td className="py-4 px-4">
                       <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                         order.status === 'confirmed'
                           ? 'bg-green-100 text-green-700'
                           : order.status === 'pending'
                           ? 'bg-yellow-100 text-yellow-700'
                           : 'bg-red-100 text-red-700'
                       }`}>
                         {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                       </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         ) : (
           <p className="text-gray-600 text-center py-8">No orders yet. Start by booking a style!</p>
         )}
       </div>
    </div>
  );
}