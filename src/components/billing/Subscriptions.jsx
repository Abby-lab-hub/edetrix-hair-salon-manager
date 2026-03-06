import React, { useState, useEffect } from 'react';

export default function Subscriptions({ user, onUpdateSubscription }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      duration: 'Month',
      price: 49,
      description: 'Perfect for trying out our service',
      features: [
        '1 haircut per month',
        'Priority booking',
        'Free consultations',
        'Cancel anytime'
      ],
      color: 'blue'
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      duration: '3 Months',
      price: 129,
      description: 'Save 12% with quarterly billing',
      features: [
        '3 haircuts per month',
        'Priority + VIP support',
        'Free consultations',
        'Exclusive member events',
        '10% off products'
      ],
      color: 'purple',
      popular: true
    },
    {
      id: 'annual',
      name: 'Annual',
      duration: 'Year',
      price: 459,
      description: 'Save 22% with annual billing',
      features: [
        'Unlimited haircuts',
        '24/7 VIP support',
        'Free consultations',
        'Exclusive member events',
        '15% off products',
        'Free styling products'
      ],
      color: 'green'
    }
  ];

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
  };

  const confirmSubscription = () => {
    if (!selectedPlan) return;

    const newSubscription = {
      id: 'sub-' + Date.now(),
      plan: selectedPlan.id,
      planName: selectedPlan.name,
      price: selectedPlan.price,
      duration: selectedPlan.duration,
      startDate: new Date().toISOString(),
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    };
    
    onUpdateSubscription(newSubscription);
    setSubscriptions([newSubscription]);
    setSelectedPlan(null);
    alert('Subscription activated!');
  };

  const hasActiveSubscription = subscriptions.length > 0 && subscriptions[0].status === 'active';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Subscription Plans</h1>
        <p className="text-gray-600 text-lg">Choose the perfect plan for your salon needs</p>
      </div>

      {/* Current Subscription */}
      {hasActiveSubscription && (
        <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-lg font-bold text-green-900 mb-2">Current Subscription</h2>
          <p className="text-green-800">
            <strong>{subscriptions[0].planName}</strong> - ${subscriptions[0].price}/{subscriptions[0].duration.toLowerCase()}
          </p>
          <p className="text-green-800 text-sm mt-2">
            Renews on {new Date(subscriptions[0].renewalDate).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-lg shadow-sm border-2 transition relative overflow-hidden ${
              plan.popular
                ? 'border-purple-500 shadow-lg transform md:scale-105'
                : 'border-gray-200'
            } ${selectedPlan?.id === plan.id ? 'ring-2 ring-blue-600' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 text-sm font-bold">
                POPULAR
              </div>
            )}

            <div className={`p-8 bg-gradient-to-br ${
              plan.color === 'blue' ? 'from-blue-50 to-blue-100' :
              plan.color === 'purple' ? 'from-purple-50 to-purple-100' :
              'from-green-50 to-green-100'
            }`}>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6 text-sm">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600 ml-2">/{plan.duration.toLowerCase()}</span>
              </div>

              <button
                onClick={() => handleSubscribe(plan)}
                className={`w-full py-3 rounded-lg font-semibold transition mb-6 ${
                  plan.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                  plan.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700 text-white' :
                  'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {hasActiveSubscription && subscriptions[0].plan === plan.id ? 'Current Plan' : 'Select Plan'}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className={`mr-3 text-lg ${
                      plan.color === 'blue' ? 'text-blue-600' :
                      plan.color === 'purple' ? 'text-purple-600' :
                      'text-green-600'
                    }`}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-8">
            <h2 className="text-2xl font-bold mb-4">Confirm Subscription</h2>
            <p className="text-gray-600 mb-6">
              You're about to subscribe to the <strong>{selectedPlan.name}</strong> plan for <strong>${selectedPlan.price}</strong> per {selectedPlan.duration.toLowerCase()}.
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmSubscription}
                className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setSelectedPlan(null)}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}