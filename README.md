# Edetrix Hair Salon - Web App

A comprehensive single-page hairstyling web application with customer bookings, subscription management, billing, and admin panel.

## Features

✂️ **Customer Features**
- User authentication (signup/login) with secure password handling
- Browse hairstyle catalog by category (Men's, Women's, Curly Hair)
- Book custom hairstyles with detailed descriptions
- Submit style orders with date/time scheduling
- Flexible subscription plans (Monthly, Quarterly, Annual)
- Billing management and order history
- Payment method management
- Track order status (Pending, Confirmed, Cancelled)

👨‍💼 **Admin Features**
- Dedicated admin dashboard to manage customer orders
- Filter orders by status (All, Pending, Confirmed, Cancelled)
- One-click order confirmation
- Reject orders with reason tracking
- Real-time statistics dashboard
- View comprehensive order details
- Mobile-responsive admin interface

## Demo Credentials

**Customer Account:**
- Email: customer@edetrix.com
- Password: password123

**Admin Account:**
- Email: admin@edetrix.com
- Password: admin123

## Project Structure

```
/workspace/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── Navigation.jsx
    │   ├── LandingPage.jsx
    │   ├── auth/
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── customer/
    │   │   ├── Dashboard.jsx
    │   │   ├── CatalogSelector.jsx
    │   │   ├── CustomStyleForm.jsx
    │   │   └── BookingForm.jsx
    │   ├── billing/
    │   │   ├── Subscriptions.jsx
    │   │   └── BillingPage.jsx
    │   └── admin/
    │       └── AdminPanel.jsx
```

## Technology Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS (CDN)
- **Storage**: LocalStorage (for demo)
- **Build**: Vite

## Getting Started

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:8080`

## Usage

### For Customers

1. **Sign Up** - Create a new account with name, email, and password
2. **Browse or Create** - Choose from the hairstyle catalog or describe a custom style
3. **Book** - Select date, time, and confirm your booking
4. **Subscribe** - Choose a subscription plan for recurring bookings
5. **Manage Billing** - View invoices and update payment methods

### For Admins

1. **Login** with admin credentials
2. **View Dashboard** - See all pending, confirmed, and completed bookings
3. **Manage Bookings** - Confirm, reject, or mark bookings as complete
4. **Add Notes** - Include rejection reasons or special instructions

## Data Storage

This app uses browser LocalStorage for demo purposes. All data is stored locally and will persist across browser sessions but is specific to each browser/device.

## Subscription Plans

- **Monthly** - $49/month - 1 haircut + priority booking
- **Quarterly** - $129/3 months - 3 haircuts + VIP support
- **Annual** - $459/year - Unlimited haircuts + all premium features

## Hairstyle Catalog

### Men's Styles
- Classic Fade ($25)
- Pompadour ($35)
- Undercut ($30)

### Women's Styles
- Layers ($45)
- Bob Cut ($40)
- Pixie Cut ($35)

### Curly Hair Styles
- Afro ($40)
- Braids ($55)
- Locs ($50)

## Order Status Workflow

1. **Pending** - Customer submits order, awaiting admin confirmation
2. **Confirmed** - Admin confirms the order
3. **Cancelled** - Admin rejects the order

## Features Implemented

- ✅ User Authentication (Login/Signup with demo accounts)
- ✅ Customer Dashboard with catalog and custom style form
- ✅ Hairstyle catalog with category filtering
- ✅ Custom style booking form with description
- ✅ Subscription plans and management (Monthly/Quarterly/Annual)
- ✅ Billing page with order history tracking
- ✅ Admin panel with order confirmation/rejection
- ✅ Real-time order status management
- ✅ Responsive design (desktop and mobile)
- ✅ Mobile-friendly navigation with hamburger menu
- ✅ LocalStorage data persistence
- ✅ Clean Light UI theme with blue accents

## Notes

- This is a single-page application using client-side storage
- For production, replace LocalStorage with a backend database
- Payment processing is simulated - integrate with Stripe or similar for real payments
- Email notifications are not implemented in the demo

---

**Edetrix Hair Salon** © 2024 - Your Premium Hair Styling Destination