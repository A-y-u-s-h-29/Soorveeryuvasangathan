// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutSection from './components/AboutSection';
import InstagramVideoSimple from './components/VideoPage';
import VolunteerPage from './components/VolunteerPage';
import VolunteerForm from './components/VolunteerForm';
import VolunteerCard from './components/VolunteerCard';

function App() {
  const [latestVolunteer, setLatestVolunteer] = useState(null);
  const [showCard, setShowCard] = useState(false);

  const handleVolunteerSubmit = (volunteerData) => {
    console.log('New volunteer submitted:', volunteerData);
    setLatestVolunteer(volunteerData);
    setShowCard(true);
  };

  const handleDeleteVolunteer = (id) => {
    console.log('Delete volunteer:', id);
    setShowCard(false);
    setLatestVolunteer(null);
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
          
          {/* Volunteer Registration Page with Auto Card Display */}
          <Route path="/volunteer/register" element={
            <div className="py-8 px-4">
              {showCard && latestVolunteer ? (
                <div>
                  <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                    <h2 className="text-xl font-bold text-green-800 mb-2">Registration Successful! 🎉</h2>
                    <p className="text-green-700">
                      Your ID card has been generated below. You can download, print, or share it.
                    </p>
                  </div>
                  <VolunteerCard 
                    volunteer={latestVolunteer}
                    isPreview={false}
                    onDelete={handleDeleteVolunteer}
                  />
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => {
                        setShowCard(false);
                        setLatestVolunteer(null);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition"
                    >
                      <i className="fas fa-user-plus mr-2"></i>
                      Register Another Volunteer
                    </button>
                  </div>
                </div>
              ) : (
                <VolunteerForm 
                  onSubmit={handleVolunteerSubmit}
                  onCancel={() => window.history.back()}
                />
              )}
            </div>
          } />
          
          {/* View Specific ID Card Page */}
          <Route path="/volunteer/card/:id" element={
            <div className="py-8 px-4">
              {latestVolunteer ? (
                <VolunteerCard 
                  volunteer={latestVolunteer}
                  isPreview={false}
                  onDelete={handleDeleteVolunteer}
                />
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">No Volunteer Data Found</h2>
                  <p className="text-gray-600 mb-6">Please register first to view your ID card</p>
                  <a 
                    href="/volunteer/register"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition inline-block"
                  >
                    <i className="fas fa-user-plus mr-2"></i>
                    Register Now
                  </a>
                </div>
              )}
            </div>
          } />
          
          {/* Direct Card View with Mock Data */}
          <Route path="/volunteer/card" element={
            <div className="py-8 px-4">
              <VolunteerCard 
                volunteer={{
                  _id: 'mock-123',
                  uniqueId: 15,
                  name: 'HUA SANCTHAT',
                  aakNo: '0015',
                  mobileNo: '9923225066',
                  address: 'Sample Address, City, State, India',
                  imageUrl: null,
                  joinDate: new Date().toISOString()
                }}
                isPreview={false}
                onDelete={handleDeleteVolunteer}
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