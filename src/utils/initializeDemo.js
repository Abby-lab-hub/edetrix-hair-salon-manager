export function initializeDemoData() {
  const existingUsers = localStorage.getItem('allUsers');
  
  if (!existingUsers) {
    const demoUsers = [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'customer@edetrix.com',
        password: 'password123',
        role: 'customer',
        subscription: {
          id: 'sub-demo-1',
          plan: 'monthly',
          planName: 'Monthly',
          price: 49,
          duration: 'Month',
          startDate: new Date().toISOString(),
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        },
        createdAt: new Date().toISOString()
      },
      {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@edetrix.com',
        password: 'admin123',
        role: 'admin',
        subscription: null,
        createdAt: new Date().toISOString()
      }
    ];

    localStorage.setItem('allUsers', JSON.stringify(demoUsers));
  }
}