// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutSection from './components/AboutSection';
import InstagramVideoSimple from './components/VideoPage';
import VolunteerPage from './components/VolunteerPage';
import VolunteerForm from './components/VolunteerForm';
import VolunteerCard from './components/VolunteerCard';

function App() {
  // Mock volunteer data for testing
  const mockVolunteer = {
    _id: '123',
    uniqueId: 15,
    name: 'HUA SANCTHAT',
    aakNo: '0015',
    mobileNo: '9923225066',
    address: 'Sample Address, City, State, India',
    imageUrl: null,
    joinDate: new Date().toISOString()
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
            },
            error: {
              duration: 4000,
              style: {
                background: '#ef4444',
                color: '#fff',
              },
            },
          }}
        />
        
        <Navbar />
        
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={
            <>
              <Home />
              <AboutSection />
              <InstagramVideoSimple />
              <VolunteerPage />
            </>
          } />
          
          {/* Volunteer Registration Page */}
          <Route path="/volunteer/register" element={
            <div className="py-8 px-4">
              <VolunteerForm />
            </div>
          } />
          
          {/* View ID Card Page */}
          <Route path="/volunteer/card" element={
            <div className="py-8 px-4">
              <VolunteerCard 
                volunteer={mockVolunteer}
                isPreview={false}
                onDelete={(id) => console.log('Delete', id)}
              />
            </div>
          } />
          
          {/* Fallback to Home */}
          <Route path="*" element={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
                <p className="text-gray-600 mt-2">Return to <a href="/" className="text-blue-600 hover:underline">Home</a></p>
              </div>
            </div>
          } />
        </Routes>
        
        {/* Simple Footer */}
        <footer className="mt-12 py-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center">
          <p className="text-xl font-bold mb-2">शूरवीर युवा ट्रस्ट</p>
          <p className="text-gray-300">Shoorveer Yuva Trust</p>
          <p className="text-gray-400 text-sm mt-4">Contact: +91 99232 25066</p>
          <p className="text-gray-500 text-xs mt-2">© {new Date().getFullYear()} All rights reserved</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;