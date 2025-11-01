# InfluPlatform - Influencer Hiring Platform

A modern platform connecting influencers with brands/vendors, built with React.js, Node.js, and MongoDB.

## 🎨 Design Theme

- **Color Scheme**: Black and Red
- **Animations**: Framer Motion throughout the application
- **Responsive**: Built using Flexbox and Tailwind CSS
- **Icons**: Lucide React icons

## 📦 Installed NPM Packages

### Frontend Dependencies:
```bash
npm install axios framer-motion lucide-react react-router-dom
```

#### Package Details:
- **axios**: ^1.6.0+ - HTTP client for API requests
- **framer-motion**: ^11.0.0+ - Animation library for React
- **lucide-react**: ^0.300.0+ - Beautiful & consistent icon toolkit
- **react-router-dom**: ^6.20.0+ - Declarative routing for React
- **react**: ^19.2.0 - React library
- **react-dom**: ^19.2.0 - React DOM renderer
- **tailwindcss**: ^3.4.18 - Utility-first CSS framework

### Backend Dependencies (To be installed):
```bash
npm install express mongoose cors jsonwebtoken bcryptjs dotenv
```

## 🚀 Features

### User Roles:
1. **Admin**
   - View all influencers and clients
   - Manage platform users
   - Access to all user details

2. **Influencer**
   - Editable profile with follower counts (Facebook, Instagram, TikTok, YouTube)
   - Search and filter clients
   - Sector-based categorization
   - Dashboard with statistics

3. **Client/Vendor**
   - Editable profile with product details
   - Budget and payment type (Money/Barter)
   - Search and filter influencers
   - Campaign expectations

### Key Features:
- ✅ Login and Signup for all user types
- ✅ Dynamic Header and Footer based on user role
- ✅ Profile management with editing capabilities
- ✅ Advanced search and filter functionality
- ✅ Sector-based filtering
- ✅ Responsive design using Flexbox
- ✅ Smooth animations with Framer Motion
- ✅ Static data implementation (ready for backend integration)

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js          # Dynamic header based on user role
│   ├── Footer.js           # Footer component
│   └── ProtectedRoute.js   # Route protection component
├── context/
│   └── AuthContext.js      # Authentication context
├── pages/
│   ├── Home.js             # Landing page
│   ├── Login.js            # Login page
│   ├── Signup.js           # Signup page
│   ├── influencer/
│   │   ├── InfluencerDashboard.js
│   │   ├── InfluencerProfile.js
│   │   └── InfluencerSearch.js
│   ├── client/
│   │   ├── ClientDashboard.js
│   │   ├── ClientProfile.js
│   │   └── ClientSearch.js
│   └── admin/
│       └── AdminDashboard.js
├── utils/
│   ├── api.js              # API utility structure (ready for backend)
│   └── staticData.js       # Static data for development
├── App.js                  # Main app component with routing
└── index.js                # Entry point
```

## 🛠️ Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

### Login:
- **Influencer**: Use any email from `mockInfluencers` in `staticData.js` (e.g., sarah@example.com)
- **Client**: Use any email from `mockClients` in `staticData.js` (e.g., contact@techstart.com)
- **Admin**: Use admin@influplatform.com
- **Password**: `password123` (for all demo accounts)

## 🔄 Backend Integration

The project is structured to easily integrate with a backend:

1. **API Utility**: `src/utils/api.js` contains all API call structures
2. **Static Data**: Currently using `src/utils/staticData.js` - will be replaced with API calls
3. **Context API**: Already set up to work with JWT tokens

### Backend Requirements:
- Node.js + Express
- MongoDB (Mongoose)
- JWT for authentication
- CORS enabled

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Subscription model implementation
- [ ] Request-based communication system
- [ ] Payment integration
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] File upload for profile images
- [ ] Real-time messaging

## 📝 Notes

- Currently using static data - will be replaced when backend is ready
- All API calls are structured but commented/mocked
- Authentication is simulated using localStorage
- Responsive design tested on mobile, tablet, and desktop

## 🎨 Color Palette

- **Primary Black**: #000000
- **Dark**: #0a0a0a
- **Dark Gray**: #1a1a1a
- **Gray**: #2a2a2a
- **Accent Red**: #dc2626
- **Dark Red**: #991b1b
- **Light Red**: #ef4444

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**