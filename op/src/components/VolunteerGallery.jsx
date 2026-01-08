import React, { useState, useEffect } from 'react';
import { volunteerAPI } from '../services/api';
import { 
  Search, Filter, Download, User, Grid, List, Eye, 
  Calendar, Phone, MapPin, Award, Crown, Shield, Users, Home 
} from 'lucide-react'; // ADDED Home here
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
  const [selectedArea, setSelectedArea] = useState(''); // NEW: Area filter
  const [selectedRole, setSelectedRole] = useState(''); // NEW: Role filter
  const [backendStatus, setBackendStatus] = useState('checking');
  const [areaStats, setAreaStats] = useState([]);

  // ✅ Improved fetch with area statistics
  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      setBackendStatus('checking');
      
      // First try backend API with retry
      try {
        const response = await volunteerAPI.getAllVolunteers();
        
        if (response.success) {
          setVolunteers(response.data || []);
          setFilteredVolunteers(response.data || []);
          setBackendStatus('online');
          console.log('✅ Connected to backend successfully');
          
          // Fetch area statistics
          try {
            const statsResponse = await volunteerAPI.getAreaStatistics();
            if (statsResponse.success) {
              setAreaStats(statsResponse.data || []);
            }
          } catch (statsError) {
            console.log('Area stats failed:', statsError.message);
          }
          
          return;
        }
      } catch (apiError) {
        console.log('Backend API failed:', apiError.message);
        
        // If it's a timeout error, try one more time (Render cold start)
        if (apiError.message?.includes('timeout') || apiError.message?.includes('starting')) {
          console.log('⚠️ Render cold start detected, waiting 10 seconds...');
          toast.loading('Backend is starting up. Please wait...');
          
          await new Promise(resolve => setTimeout(resolve, 10000));
          
          try {
            const retryResponse = await volunteerAPI.getAllVolunteers();
            if (retryResponse.success) {
              setVolunteers(retryResponse.data || []);
              setFilteredVolunteers(retryResponse.data || []);
              setBackendStatus('online');
              toast.dismiss();
              toast.success('Connected to backend!');
              console.log('✅ Connected on retry');
              return;
            }
          } catch (retryError) {
            console.log('Retry also failed:', retryError.message);
          }
        }
      }
      
      // If backend fails, use fallback
      setBackendStatus('offline');
      console.log('🔄 Using fallback data');
      
      // Fallback to local storage data or mock data
      const savedVolunteers = JSON.parse(localStorage.getItem('volunteers')) || [];
      if (savedVolunteers.length > 0) {
        setVolunteers(savedVolunteers);
        setFilteredVolunteers(savedVolunteers);
        toast('Using locally saved data', { icon: '💾' });
      } else {
        const mockVolunteers = generateMockVolunteers();
        setVolunteers(mockVolunteers);
        setFilteredVolunteers(mockVolunteers);
        toast('Using demo data', { icon: '🔄' });
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      setBackendStatus('offline');
      toast.error('Backend unavailable. Using offline data.');
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
  const areas = ['North Delhi', 'South Mumbai', 'Central Bangalore', 'East Chennai', 'West Kolkata', 'North Hyderabad'];

  return Array.from({ length: 8 }, (_, i) => ({
    _id: `mock_${i + 1}_${Date.now()}_${Math.random()}`, // ADDED timestamp for uniqueness
    uniqueId: 1000 + i + 1,
    name: names[i],
    aakNo: `AAK${String(1000 + i + 1).padStart(4, '0')}`,
    mobileNo: `9876543${i.toString().padStart(3, '0')}`,
    address: addresses[i % addresses.length],
    area: areas[i % areas.length],
    role: i === 0 ? 'president' : i === 1 ? 'vice-president' : 'member',
    imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(names[i])}&background=4f46e5&color=fff&size=200&bold=true&format=png`,
    joinDate: new Date(Date.now() - i * 86400000).toISOString(),
    createdAt: new Date(Date.now() - i * 86400000)
  }));
};

  // Initial fetch
  useEffect(() => {
    fetchVolunteers();
  }, []);

  // Filter volunteers based on search, area, and role
  useEffect(() => {
    let results = [...volunteers];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(v =>
        v.name.toLowerCase().includes(term) ||
        v.aakNo.toLowerCase().includes(term) ||
        v.mobileNo.includes(term) ||
        v.address.toLowerCase().includes(term) ||
        (v.area && v.area.toLowerCase().includes(term))
      );
    }
    
    if (selectedAakNo) {
      results = results.filter(v => v.aakNo === selectedAakNo);
    }
    
    if (selectedArea) {
      results = results.filter(v => v.area === selectedArea);
    }
    
    if (selectedRole) {
      results = results.filter(v => v.role === selectedRole);
    }
    
    setFilteredVolunteers(results);
  }, [searchTerm, selectedAakNo, selectedArea, selectedRole, volunteers]);

  // Get unique values for filters
  const aakNumbers = [...new Set(volunteers.map(v => v.aakNo))].sort();
  const areas = [...new Set(volunteers.map(v => v.area).filter(Boolean))].sort();
  const roles = [...new Set(volunteers.map(v => v.role).filter(Boolean))].sort();

  // View volunteer details
  const handleViewVolunteer = (volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  // Get role badge component
  const RoleBadge = ({ role, area }) => {
    const getRoleColor = (role) => {
      switch(role) {
        case 'president': return 'bg-red-100 text-red-700 border-red-200';
        case 'vice-president': return 'bg-blue-100 text-blue-700 border-blue-200';
        default: return 'bg-green-100 text-green-700 border-green-200';
      }
    };

    const getRoleIcon = (role) => {
      switch(role) {
        case 'president': return <Crown className="w-3 h-3" />;
        case 'vice-president': return <Shield className="w-3 h-3" />;
        default: return <Users className="w-3 h-3" />;
      }
    };

    const formatRole = (role) => {
      switch(role) {
        case 'president': return 'President';
        case 'vice-president': return 'Vice President';
        case 'member': return 'Member';
        default: return 'Member';
      }
    };

    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getRoleColor(role)} text-sm font-semibold`}>
        {getRoleIcon(role)}
        <span className="ml-1">{formatRole(role)}</span>
        {area && (
          <span className="ml-2 text-xs opacity-75">• {area}</span>
        )}
      </div>
    );
  };

  // Refresh data from backend
  const handleRefresh = async () => {
    toast.loading('Refreshing data...');
    await fetchVolunteers();
    toast.dismiss();
    
    if (backendStatus === 'online') {
      toast.success('Data refreshed from backend!');
    } else {
      toast('Using offline data', { icon: '📱' });
    }
  };

  // Download all ID cards as ZIP
  const handleDownloadAll = async () => {
    toast.loading('Preparing downloads... This may take a moment');
    
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
          <p className="text-gray-500 text-sm mt-2">
            Backend URL: https://soorveeryuvasangathan.onrender.com/api
          </p>
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
                  View and manage all volunteer ID cards with area-wise distribution
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className={`w-2 h-2 rounded-full ${backendStatus === 'online' ? 'bg-green-400' : backendStatus === 'offline' ? 'bg-yellow-400' : 'bg-gray-400'}`}></div>
                  <span className="text-sm">
                    {backendStatus === 'online' ? 'Connected to backend' : 
                     backendStatus === 'offline' ? 'Using offline data' : 
                     'Checking connection...'}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium hover:bg-white/30 transition flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-block">
                  <div className="text-4xl font-bold">{volunteers.length}</div>
                  <div className="text-blue-100 text-sm">Total Volunteers</div>
                </div>
              </div>
            </div>

            {/* Area Statistics */}
            {areaStats.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
                {areaStats.slice(0, 5).map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-xs text-blue-100 truncate">{stat._id || 'Unknown'}</div>
                    <div className="text-xl font-bold">{stat.total}</div>
                    <div className="flex gap-1 mt-1">
                      {stat.presidents > 0 && (
                        <span className="text-xs bg-red-500/30 text-white px-1 rounded">P: {stat.presidents}</span>
                      )}
                      {stat.vicePresidents > 0 && (
                        <span className="text-xs bg-blue-500/30 text-white px-1 rounded">VP: {stat.vicePresidents}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search by name, AAK, mobile, area..."
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

            {/* Area Filter */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MapPin className="w-5 h-5" />
              </div>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none bg-white transition"
              >
                <option value="">All Areas</option>
                {areas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            {/* Role Filter */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Award className="w-5 h-5" />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none appearance-none bg-white transition"
              >
                <option value="">All Roles</option>
                <option value="member">Members</option>
                <option value="president">Presidents</option>
                <option value="vice-president">Vice Presidents</option>
              </select>
            </div>
          </div>

          {/* Second Row: View Mode and Actions */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
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
              
              {/* Quick Filters */}
              <div className="flex gap-2">
                {selectedArea && (
                  <button
                    onClick={() => setSelectedArea('')}
                    className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full flex items-center"
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {selectedArea}
                    <span className="ml-2 text-gray-500">×</span>
                  </button>
                )}
                {selectedRole && (
                  <button
                    onClick={() => setSelectedRole('')}
                    className="text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-full flex items-center"
                  >
                    <Award className="w-3 h-3 mr-1" />
                    {selectedRole === 'president' ? 'Presidents' : selectedRole === 'vice-president' ? 'Vice Presidents' : 'Members'}
                    <span className="ml-2 text-gray-500">×</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedAakNo('');
                  setSelectedArea('');
                  setSelectedRole('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Clear All Filters
              </button>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-gray-700 font-medium">
                  Showing <span className="text-blue-600 font-bold">{filteredVolunteers.length}</span> of <span className="text-gray-800">{volunteers.length}</span> volunteers
                </span>
                {searchTerm && (
                  <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    Search: "{searchTerm}"
                  </span>
                )}
                {selectedArea && (
                  <span className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    Area: {selectedArea}
                  </span>
                )}
                {selectedRole && (
                  <span className="text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-full flex items-center">
                    <Award className="w-3 h-3 mr-1" />
                    Role: {selectedRole === 'president' ? 'President' : selectedRole === 'vice-president' ? 'Vice President' : 'Member'}
                  </span>
                )}
              </div>
              
              {/* Role Summary */}
              <div className="flex gap-2 text-sm">
                <span className="text-gray-600">
                  {volunteers.filter(v => v.role === 'president').length} President(s)
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-600">
                  {volunteers.filter(v => v.role === 'vice-president').length} Vice President(s)
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-600">
                  {volunteers.filter(v => v.role === 'member').length} Member(s)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backend Status Alert */}
      {backendStatus === 'offline' && (
        <div className="max-w-7xl mx-auto mb-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Backend is offline. Using locally saved data. 
                  <button 
                    onClick={handleRefresh}
                    className="ml-1 font-medium text-yellow-700 hover:text-yellow-600 underline"
                  >
                    Click here to retry connection
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Volunteers Display */}
      {filteredVolunteers.length === 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No volunteers found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              {searchTerm || selectedArea || selectedRole || selectedAakNo 
                ? 'Try adjusting your search or filter criteria'
                : 'No volunteers registered yet. Register a new volunteer to get started.'}
            </p>
            <div className="space-x-4">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedAakNo('');
                  setSelectedArea('');
                  setSelectedRole('');
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
                          {volunteer.area && (
                            <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                              <MapPin className="w-3 h-3" />
                              {volunteer.area}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Role Badge */}
                      {volunteer.role && (
                        <div className="mt-3">
                          <RoleBadge role={volunteer.role} area={volunteer.area} />
                        </div>
                      )}
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
                            <Home className="w-4 h-4 text-green-600" />
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
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Area & Role</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">AAK No</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Contact</th>
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
                              <div className="text-sm text-gray-500">ID: {volunteer.uniqueId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-2">
                            {volunteer.area && (
                              <div className="flex items-center text-gray-700">
                                <MapPin className="w-3 h-3 mr-1 text-green-600" />
                                <span className="text-sm font-medium">{volunteer.area}</span>
                              </div>
                            )}
                            {volunteer.role && (
                              <RoleBadge role={volunteer.role} />
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-blue-700">{volunteer.aakNo}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center text-gray-700">
                            <Phone className="w-4 h-4 mr-2 text-blue-600" />
                            +91 {volunteer.mobileNo}
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
                  {selectedVolunteer.area && ` • ${selectedVolunteer.area}`}
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
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            शूरवीर युवा ट्रस्ट Volunteer Management System
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Backend: {backendStatus === 'online' ? '✅ Connected' : '⚠️ Using offline data'} | 
            Total Volunteers: <span className="font-bold text-blue-600">{volunteers.length}</span> | 
            Areas: <span className="font-bold text-green-600">{areas.length}</span>
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <p>Use filters to view volunteers by area and role</p>
            <p className="mt-1">All volunteers can see each other's information for better coordination</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerGallery;