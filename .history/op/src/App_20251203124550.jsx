// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutSection from './components/AboutSection';
import InstagramVideoSimple from './components/VideoPage';
import VolunteerPage from './components/VolunteerPage';
import VolunteerForm from './components/VolunteerForm';
import VolunteerCard from './components/VolunteerCard'; // Make sure this is your MiniVolunteerCard
import ModernFooter from './components/ModernFooter';
import DonationPage from './components/DonationPage';
import VolunteerGallery from './components/VolunteerGallery';

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

  const handleBackToForm = () => {
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
        
       
        
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={
            <>
             <Navbar />
              <Home />
              <AboutSection />
              <InstagramVideoSimple />
              <VolunteerPage />
              <ModernFooter/>
            </>
          } />
          <Route path="/donate" element={<DonationPage/>}/>
  <Route path="/gallery" element={<VolunteerGallery />} />


          {/* Volunteer Registration Page with Auto Card Display */}
          <Route path="/volunteer/register" element={
            <div className="py-8 px-4">
              {showCard && latestVolunteer ? (
                <div>
                  {/* Success Message */}
                  <div className="max-w-4xl mx-auto mb-8">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-6 shadow-md">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                          <i className="fas fa-check-circle text-green-600 text-xl"></i>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-green-800 mb-1">Registration Successful! 🎉</h2>
                          <p className="text-green-700">
                            Volunteer <span className="font-bold">{latestVolunteer.name}</span> has been registered successfully. 
                            ID card has been generated below.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* ID Card */}
                  <div className="max-w-4xl mx-auto">
                    <VolunteerCard 
                      volunteer={latestVolunteer}
                      isPreview={false}
                      onDelete={handleDeleteVolunteer}
                    />
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="max-w-4xl mx-auto mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleBackToForm}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition flex items-center justify-center"
                    >
                      <i className="fas fa-user-plus mr-2"></i>
                      Register Another Volunteer
                    </button>
                    
                    <a
                      href="/"
                      className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center"
                    >
                      <i className="fas fa-home mr-2"></i>
                      Go to Home
                    </a>
                    
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-3 border-2 border-gray-600 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center"
                    >
                      <i className="fas fa-print mr-2"></i>
                      Print ID Card
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
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Volunteer ID Card</h1>
                    <p className="text-gray-600">Download or print your ID card</p>
                  </div>
                  <VolunteerCard 
                    volunteer={latestVolunteer}
                    isPreview={false}
                    onDelete={handleDeleteVolunteer}
                  />
                  <div className="mt-8 text-center">
                    <a 
                      href="/volunteer/register"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition inline-block"
                    >
                      <i className="fas fa-user-plus mr-2"></i>
                      Register New Volunteer
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 max-w-2xl mx-auto">
                  <div className="bg-gradient-to-r from-blue-100 to-green-100 p-8 rounded-2xl shadow-lg">
                    <i className="fas fa-id-card text-6xl text-blue-600 mb-4"></i>
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
                </div>
              )}
            </div>
          } />
          
          {/* Direct Card View with Mock Data */}
          <Route path="/volunteer/card" element={
            <div className="py-8 px-4">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-lg p-4">
                  <p className="text-yellow-800">
                    <i className="fas fa-info-circle mr-2"></i>
                    Showing sample ID card. Register a volunteer to see your own card.
                  </p>
                </div>
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
                <div className="mt-8 text-center">
                  <a 
                    href="/volunteer/register"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition inline-block"
                  >
                    <i className="fas fa-user-plus mr-2"></i>
                    Register Your Own Card
                  </a>
                </div>
              </div>
            </div>
          } />
          
          {/* Fallback to Home */}
          <Route path="*" element={
            <div className="min-h-[60vh] flex items-center justify-center px-4">
              <div className="text-center max-w-md">
                <i className="fas fa-exclamation-triangle text-6xl text-yellow-500 mb-4"></i>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Page Not Found</h1>
                <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition inline-block">
                  <i className="fas fa-home mr-2"></i>
                  Return to Home
                </a>
              </div>
            </div>
          } />
        </Routes>
     
      </div>
    </Router>
  );
}

export default App;