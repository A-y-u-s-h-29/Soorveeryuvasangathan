import React, { useState, useEffect } from 'react';
import { volunteerAPI } from '../services/api';
import { Search, Filter, Download, User, Grid, List, Eye, Calendar, Phone, MapPin, Award } from 'lucide-react';
import { toast } from 'react-hot-toast';
import MiniVolunteerCard from './VolunteerCard';

const VolunteerGallery = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAakNo, setSelectedAakNo] = useState('');

  // Fetch all volunteers
  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      // Try backend API first
      try {
        const response = await volunteerAPI.getAllVolunteers();
        if (response.success) {
          setVolunteers(response.data || []);
          setFilteredVolunteers(response.data || []);
          return;
        }
      } catch (apiError) {
        console.log('Backend API failed, using mock data');
      }

      // If backend fails, use local storage data or mock data
      const savedVolunteers = JSON.parse(localStorage.getItem('volunteers')) || [];
      if (savedVolunteers.length > 0) {
        setVolunteers(savedVolunteers);
        setFilteredVolunteers(savedVolunteers);
      } else {
        // Generate mock data for demo
        const mockVolunteers = generateMockVolunteers();
        setVolunteers(mockVolunteers);
        setFilteredVolunteers(mockVolunteers);
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      toast.error('Failed to load volunteers');
    } finally {
      setLoading(false);
    }
  };

  const generateMockVolunteers = () => {
    const names = [
      'Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Singh',
      'Vikram Yadav', 'Anjali Gupta', 'Rahul Verma', 'Pooja Mehta'
    ];
    const addresses = [
      'Mumbai, Maharashtra', 'Delhi, NCR', 'Bangalore, Karnataka',
      'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Hyderabad, Telangana'
    ];

    return Array.from({ length: 8 }, (_, i) => ({
      _id: `mock_${i + 1}`,
      uniqueId: 1000 + i + 1,
      name: names[i],
      aakNo: `AAK${String(1000 + i + 1).padStart(4, '0')}`,
      mobileNo: `9876543${i.toString().padStart(3, '0')}`,
      address: addresses[i % addresses.length],
      imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(names[i])}&background=4f46e5&color=fff&size=200&bold=true&format=png`,
      joinDate: new Date(Date.now() - i * 86400000).toISOString(),
      createdAt: new Date(Date.now() - i * 86400000)
    }));
  };

  // Initial fetch
  useEffect(() => {
    fetchVolunteers();
  }, []);

  // Filter volunteers based on search
  useEffect(() => {
    let results = [...volunteers];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(v =>
        v.name.toLowerCase().includes(term) ||
        v.aakNo.toLowerCase().includes(term) ||
        v.mobileNo.includes(term) ||
        v.address.toLowerCase().includes(term)
      );
    }
    
    if (selectedAakNo) {
      results = results.filter(v => v.aakNo === selectedAakNo);
    }
    
    setFilteredVolunteers(results);
  }, [searchTerm, selectedAakNo, volunteers]);

  // Get unique AAK numbers for filter
  const aakNumbers = [...new Set(volunteers.map(v => v.aakNo))].sort();

  // View volunteer details
  const handleViewVolunteer = (volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  // Download all ID cards as ZIP (simplified - individual download for now)
  const handleDownloadAll = async () => {
    toast.loading('Preparing downloads... This may take a moment');
    
    // For now, show message about individual downloads
    setTimeout(() => {
      toast.dismiss();
      toast.success('Please download each card individually for best quality');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg font-medium">Loading volunteers...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-4 md:p-6">
      {/* Header with Stats */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-2xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Volunteer ID Card Gallery</h1>
                <p className="text-blue-100 opacity-90 text-lg">
                  View and manage all volunteer ID cards
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-block">
                  <div className="text-4xl font-bold">{volunteers.length}</div>
                  <div className="text-blue-100 text-sm">Total Volunteers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search by name, AAK no, mobile, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* AAK Filter */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Filter className="w-5 h-5" />
              </div>
              <select
                value={selectedAakNo}
                onChange={(e) => setSelectedAakNo(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white transition"
              >
                <option value="">All AAK Numbers</option>
                {aakNumbers.map((aak) => (
                  <option key={aak} value={aak}>{aak}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between md:justify-end space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md transition ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md transition ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleDownloadAll}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition flex items-center shadow-md hover:shadow-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Export All
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  Showing <span className="text-blue-600 font-bold">{filteredVolunteers.length}</span> of <span className="text-gray-800">{volunteers.length}</span> volunteers
                </span>
                {searchTerm && (
                  <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    Search: "{searchTerm}"
                  </span>
                )}
                {selectedAakNo && (
                  <span className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    AAK: {selectedAakNo}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedAakNo('');
                }}
                className="text-sm text-gray-600 hover:text-blue-600 transition"
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Volunteers Display */}
      {filteredVolunteers.length === 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No volunteers found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              {searchTerm || selectedAakNo 
                ? 'Try adjusting your search or filter criteria'
                : 'No volunteers registered yet. Register a new volunteer to get started.'}
            </p>
            <div className="space-x-4">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedAakNo('');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition shadow-md"
              >
                View All Volunteers
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Grid View */}
          {viewMode === 'grid' ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVolunteers.map((volunteer) => (
                  <div 
                    key={volunteer._id} 
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                  >
                    {/* Volunteer Header with Gradient */}
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 border-b">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <img 
                              src={volunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=96&bold=true`}
                              alt={volunteer.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                            ID
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg truncate">{volunteer.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Award className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold text-blue-700">{volunteer.aakNo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Volunteer Details */}
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                            <Phone className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Mobile</div>
                            <div className="font-medium text-gray-900">+91 {volunteer.mobileNo}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Address</div>
                            <div className="font-medium text-gray-900 truncate">{volunteer.address}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Join Date</div>
                            <div className="font-medium text-gray-900">
                              {new Date(volunteer.joinDate || volunteer.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* ID Card Preview */}
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="text-center text-sm text-gray-500 mb-3">ID Card Preview</div>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden transform scale-95 origin-center">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white overflow-hidden shadow-md">
                                <img 
                                  src="/images/logo.jpg" 
                                  alt="Logo"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = '<div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs">LOGO</div>';
                                  }}
                                />
                              </div>
                              <div className="text-white text-sm font-semibold truncate">
                                Soorveer Yuva Sangathan Trust
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="p-4 bg-gradient-to-r from-blue-50/50 to-green-50/50 border-t">
                      <button
                        onClick={() => handleViewVolunteer(volunteer)}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group-hover:scale-105"
                      >
                        <Eye className="w-5 h-5 mr-2" />
                        View Full ID Card
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* List View */
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Volunteer</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">AAK No</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Contact</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Location</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Join Date</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredVolunteers.map((volunteer, index) => (
                      <tr 
                        key={volunteer._id} 
                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-green-50/50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                <img 
                                  src={volunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=96&bold=true`}
                                  alt={volunteer.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{volunteer.name}</div>
                              <div className="text-sm text-gray-500">Volunteer ID: {volunteer.uniqueId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">
                            <Award className="w-3 h-3 mr-1" />
                            {volunteer.aakNo}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center text-gray-700">
                            <Phone className="w-4 h-4 mr-2 text-blue-600" />
                            +91 {volunteer.mobileNo}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center text-gray-700 max-w-xs truncate">
                            <MapPin className="w-4 h-4 mr-2 text-green-600" />
                            {volunteer.address}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center text-gray-700">
                            <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                            {new Date(volunteer.joinDate || volunteer.createdAt).toLocaleDateString('en-IN')}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => handleViewVolunteer(volunteer)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal for Full ID Card View */}
      {selectedVolunteer && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Volunteer ID Card
                </h2>
                <p className="text-gray-600">
                  {selectedVolunteer.name} • {selectedVolunteer.aakNo}
                </p>
              </div>
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            <div className="p-6">
              <div className="max-w-md mx-auto">
                <MiniVolunteerCard volunteer={selectedVolunteer} />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white p-6 border-t flex justify-center">
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition shadow-md"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            शूरवीर युवा ट्रस्ट Volunteer Management System
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Empowering volunteers with digital identity solutions. Total Volunteers Registered: <span className="font-bold text-blue-600">{volunteers.length}</span>
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <p>Use search and filters to quickly find specific volunteers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerGallery;