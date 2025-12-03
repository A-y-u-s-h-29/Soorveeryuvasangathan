import React, { useState, useEffect } from 'react';

import { volunteerAPI } from '../services/api';
import { Search, Filter, Download, User, Grid, List, Eye, Trash2 } from 'lucide-react';
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [volunteerToDelete, setVolunteerToDelete] = useState(null);

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

  // Delete volunteer
  const handleDeleteVolunteer = async (volunteerId) => {
    try {
      // Try backend API first
      try {
        const response = await volunteerAPI.deleteVolunteer(volunteerId);
        if (response.success) {
          toast.success('Volunteer deleted successfully');
          fetchVolunteers();
          setShowDeleteModal(false);
          setVolunteerToDelete(null);
          return;
        }
      } catch (apiError) {
        console.log('Backend delete failed, using local storage');
      }

      // Local storage deletion
      const updatedVolunteers = volunteers.filter(v => v._id !== volunteerId);
      setVolunteers(updatedVolunteers);
      setFilteredVolunteers(updatedVolunteers);
      localStorage.setItem('volunteers', JSON.stringify(updatedVolunteers));
      
      toast.success('Volunteer deleted successfully');
      setShowDeleteModal(false);
      setVolunteerToDelete(null);
      
    } catch (error) {
      console.error('Error deleting volunteer:', error);
      toast.error('Failed to delete volunteer');
    }
  };

  // Confirm delete
  const confirmDelete = (volunteer) => {
    setVolunteerToDelete(volunteer);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading volunteers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Volunteer ID Card Gallery</h1>
          <p className="text-blue-100 opacity-90">
            View and manage all volunteer ID cards. Total: {volunteers.length} volunteers
          </p>
        </div>
      </div>


      {/* Results Count */}
      <div className="max-w-7xl mx-auto mb-4">
        <p className="text-gray-600">
          Showing {filteredVolunteers.length} of {volunteers.length} volunteers
          {searchTerm && ` for "${searchTerm}"`}
          {selectedAakNo && ` with AAK: ${selectedAakNo}`}
        </p>
      </div>

      {/* Volunteers Display */}
      {filteredVolunteers.length === 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <User className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No volunteers found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedAakNo 
                ? 'Try adjusting your search or filter criteria'
                : 'No volunteers registered yet. Register a new volunteer to get started.'}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Grid View */}
          {viewMode === 'grid' ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVolunteers.map((volunteer) => (
                  <div key={volunteer._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Volunteer Summary */}
                    <div className="p-4 border-b">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                          <img 
                            src={volunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=96&bold=true`}
                            alt={volunteer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 truncate">{volunteer.name}</h3>
                          <p className="text-sm text-gray-600">{volunteer.aakNo}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Mobile:</span>
                          <div className="font-medium">+91 {volunteer.mobileNo}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Join Date:</span>
                          <div className="font-medium">
                            {new Date(volunteer.joinDate || volunteer.createdAt).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* ID Card Preview */}
                    <div className="p-4">
                      <div className="border-2 border-gray-200 rounded-lg overflow-hidden transform scale-90 origin-top">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
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
                        <div className="p-3 bg-white">
                          <div className="text-center text-xs text-gray-500">
                            ID Card Preview - Click View to see full card
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="p-4 bg-gray-50 border-t">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewVolunteer(volunteer)}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center text-sm"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Card
                        </button>
                        <button
                          onClick={() => confirmDelete(volunteer)}
                          className="px-3 py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* List View */
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Photo</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">AAK No</th>
                      <th className="py-3 px-4 text-left">Mobile</th>
                      <th className="py-3 px-4 text-left">Address</th>
                      <th className="py-3 px-4 text-left">Join Date</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVolunteers.map((volunteer, index) => (
                      <tr 
                        key={volunteer._id} 
                        className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                      >
                        <td className="py-3 px-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img 
                              src={volunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=96&bold=true`}
                              alt={volunteer.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">{volunteer.name}</td>
                        <td className="py-3 px-4 font-semibold text-blue-600">{volunteer.aakNo}</td>
                        <td className="py-3 px-4">+91 {volunteer.mobileNo}</td>
                        <td className="py-3 px-4 text-sm max-w-xs truncate">{volunteer.address}</td>
                        <td className="py-3 px-4 text-sm">
                          {new Date(volunteer.joinDate || volunteer.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewVolunteer(volunteer)}
                              className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition flex items-center"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </button>
                            <button
                              onClick={() => confirmDelete(volunteer)}
                              className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition flex items-center"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </button>
                          </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                ID Card - {selectedVolunteer.name}
              </h2>
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <MiniVolunteerCard volunteer={selectedVolunteer} />
            </div>
            <div className="p-4 border-t flex justify-end gap-3">
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && volunteerToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Volunteer</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete <span className="font-semibold">{volunteerToDelete.name}</span> (AAK: {volunteerToDelete.aakNo})? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setVolunteerToDelete(null);
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteVolunteer(volunteerToDelete._id)}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>
          शूरवीर युवा ट्रस्ट Volunteer Management System | Total Volunteers: {volunteers.length}
        </p>
        <p className="mt-1">Use the search and filter options to find specific volunteers</p>
      </div>
    </div>
  );
};

export default VolunteerGallery;