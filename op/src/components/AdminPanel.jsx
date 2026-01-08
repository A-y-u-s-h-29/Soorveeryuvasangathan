    import React, { useState, useEffect } from 'react';
import { volunteerAPI } from '../services/api';
import { Shield, Crown, Users, MapPin, Award, Search, Filter, RefreshCw, Lock, UserCheck, AlertCircle, Check, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminPanel = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminSecret, setAdminSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [areaStats, setAreaStats] = useState([]);
  const [assigningRole, setAssigningRole] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [confirmDialog, setConfirmDialog] = useState(null);

  // Admin authentication
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!adminSecret.trim()) {
      toast.error('Please enter admin secret');
      return;
    }

    setLoading(true);
    try {
      // Test admin access by fetching assignment data
      const response = await volunteerAPI.getVolunteersForAssignment(adminSecret);
      
      if (response.success) {
        setIsAuthenticated(true);
        setVolunteers(response.data || []);
        setAreaStats(response.areaStats || []);
        toast.success('Admin access granted!');
        // Save admin secret in session storage (not recommended for production)
        sessionStorage.setItem('adminSecret', adminSecret);
      }
    } catch (error) {
      console.error('Admin login error:', error);
      if (error.status === 403) {
        toast.error('Invalid admin secret. Access denied.');
      } else {
        toast.error('Failed to authenticate. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Load saved admin secret on component mount
  useEffect(() => {
    const savedSecret = sessionStorage.getItem('adminSecret');
    if (savedSecret) {
      setAdminSecret(savedSecret);
      // Auto-login with saved secret
      const autoLogin = async () => {
        try {
          const response = await volunteerAPI.getVolunteersForAssignment(savedSecret);
          if (response.success) {
            setIsAuthenticated(true);
            setVolunteers(response.data || []);
            setAreaStats(response.areaStats || []);
          }
        } catch (error) {
          sessionStorage.removeItem('adminSecret');
        }
      };
      autoLogin();
    }
  }, []);

  // Fetch volunteers for admin
  const fetchVolunteersForAdmin = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const response = await volunteerAPI.getVolunteersForAssignment(adminSecret);
      if (response.success) {
        setVolunteers(response.data || []);
        setAreaStats(response.areaStats || []);
        toast.success('Data refreshed successfully');
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      toast.error('Failed to refresh data');
      if (error.status === 403) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminSecret');
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter volunteers
  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = !searchTerm || 
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.aakNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.mobileNo.includes(searchTerm) ||
      (volunteer.area && volunteer.area.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesArea = !selectedArea || volunteer.area === selectedArea;
    const matchesRole = !selectedRole || volunteer.role === selectedRole;
    
    return matchesSearch && matchesArea && matchesRole;
  });

  // Get unique areas and roles
  const areas = [...new Set(volunteers.map(v => v.area).filter(Boolean))].sort();
  const roles = ['member', 'president', 'vice-president'];

  // Handle role assignment
  const handleRoleAssignment = (volunteer) => {
    setAssigningRole(volunteer);
    setNewRole(volunteer.role || 'member');
  };

  const confirmRoleAssignment = async () => {
    if (!assigningRole || !newRole) return;

    setLoading(true);
    try {
      const response = await volunteerAPI.updateVolunteerRole(
        assigningRole._id, 
        newRole, 
        adminSecret
      );
      
      if (response.success) {
        toast.success(`Role updated: ${assigningRole.name} is now ${newRole}`);
        setAssigningRole(null);
        setNewRole('');
        setConfirmDialog(null);
        fetchVolunteersForAdmin(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error(error.message || 'Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  // Format role for display
  const formatRole = (role) => {
    switch(role) {
      case 'president': return 'President';
      case 'vice-president': return 'Vice President';
      case 'member': return 'Member';
      default: return 'Member';
    }
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'president': return <Crown className="w-4 h-4" />;
      case 'vice-president': return <Shield className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  // Get role color
  const getRoleColor = (role) => {
    switch(role) {
      case 'president': return 'bg-red-100 text-red-800 border-red-200';
      case 'vice-president': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  // Check if area has president
  const areaHasPresident = (area) => {
    return volunteers.some(v => v.area === area && v.role === 'president');
  };

  // Check if area has vice president
  const areaHasVicePresident = (area) => {
    return volunteers.some(v => v.area === area && v.role === 'vice-president');
  };

  // Admin logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminSecret('');
    sessionStorage.removeItem('adminSecret');
    toast.success('Admin session ended');
  };

  // Authentication form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Admin Access</h2>
                  <p className="text-red-100 mt-1">Role Management Panel</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleAdminLogin} className="p-6 md:p-8">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <Lock className="w-5 h-5 mr-2 text-gray-600" />
                    Admin Secret Key
                  </label>
                  <input
                    type="password"
                    value={adminSecret}
                    onChange={(e) => setAdminSecret(e.target.value)}
                    placeholder="Enter admin secret key"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    disabled={loading}
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    Contact system administrator for the secret key
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !adminSecret.trim()}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition flex items-center justify-center disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Access Admin Panel
                    </>
                  )}
                </button>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-800">
                      This panel is for authorized personnel only. 
                      Unauthorized access is strictly prohibited.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main Admin Panel
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-2xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Role Management</h1>
                <p className="text-red-100 opacity-90 text-lg">
                  Assign and manage volunteer roles
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <button
                  onClick={fetchVolunteersForAdmin}
                  disabled={loading}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium hover:bg-white/30 transition flex items-center disabled:opacity-70"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{volunteers.length}</div>
                <div className="text-sm text-red-100">Total Volunteers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{areas.length}</div>
                <div className="text-sm text-red-100">Areas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">
                  {volunteers.filter(v => v.role === 'president').length}
                </div>
                <div className="text-sm text-red-100">Presidents</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">
                  {volunteers.filter(v => v.role === 'vice-president').length}
                </div>
                <div className="text-sm text-red-100">Vice Presidents</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search volunteers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              />
            </div>

            {/* Area Filter */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MapPin className="w-5 h-5" />
              </div>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white"
              >
                <option value="">All Roles</option>
                <option value="member">Members</option>
                <option value="president">Presidents</option>
                <option value="vice-president">Vice Presidents</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedArea('');
                setSelectedRole('');
              }}
              className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Clear Filters
            </button>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">
                Showing {filteredVolunteers.length} of {volunteers.length} volunteers
              </span>
              <div className="text-sm text-gray-500">
                {selectedArea && `Area: ${selectedArea}`}
                {selectedRole && ` • Role: ${formatRole(selectedRole)}`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Area Statistics */}
      {areaStats.length > 0 && (
        <div className="max-w-7xl mx-auto mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Area-wise Leadership Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {areaStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 truncate">{stat._id || 'Unknown Area'}</h4>
                  <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
                    {stat.total} members
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">President:</span>
                    <span className={`text-sm font-medium ${stat.presidents > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.presidents > 0 ? '✓ Assigned' : '✗ Required'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Vice President:</span>
                    <span className={`text-sm font-medium ${stat.vicePresidents > 0 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {stat.vicePresidents > 0 ? '✓ Assigned' : 'Optional'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Regular Members:</span>
                    <span className="text-sm font-medium text-blue-600">
                      {stat.members}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volunteers List */}
      <div className="max-w-7xl mx-auto">
        {filteredVolunteers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No volunteers found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedArea || selectedRole 
                ? 'Try adjusting your search criteria'
                : 'No volunteers available for role assignment.'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Volunteer</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Area</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Current Role</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Contact</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredVolunteers.map((volunteer) => (
                  <tr key={volunteer._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                          <img 
                            src={volunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=80`}
                            alt={volunteer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{volunteer.name}</div>
                          <div className="text-sm text-gray-500">AAK: {volunteer.aakNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-gray-700">
                        <MapPin className="w-4 h-4 mr-2 text-green-600" />
                        {volunteer.area || 'Not specified'}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getRoleColor(volunteer.role || 'member')}`}>
                        {getRoleIcon(volunteer.role || 'member')}
                        <span className="ml-1 text-sm font-medium">
                          {formatRole(volunteer.role || 'member')}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-700">+91 {volunteer.mobileNo}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{volunteer.address}</div>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleRoleAssignment(volunteer)}
                        disabled={loading}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition flex items-center disabled:opacity-70"
                      >
                        <UserCheck className="w-4 h-4 mr-1" />
                        Assign Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Role Assignment Modal */}
      {assigningRole && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Assign Role</h3>
                <button
                  onClick={() => setAssigningRole(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={assigningRole.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(assigningRole.name)}&background=4f46e5&color=fff&size=96`}
                      alt={assigningRole.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{assigningRole.name}</div>
                    <div className="text-sm text-gray-500">
                      {assigningRole.area ? `${assigningRole.area} • AAK: ${assigningRole.aakNo}` : `AAK: ${assigningRole.aakNo}`}
                    </div>
                  </div>
                </div>

                {/* Current Role Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Current Role</div>
                  <div className="flex items-center">
                    {getRoleIcon(assigningRole.role || 'member')}
                    <span className="ml-2 font-medium">
                      {formatRole(assigningRole.role || 'member')}
                    </span>
                  </div>
                </div>

                {/* New Role Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select New Role
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {roles.map((role) => {
                      const isCurrentRole = role === (assigningRole.role || 'member');
                      const isDisabled = role === (assigningRole.role || 'member');
                      
                      // Check for role conflicts
                      let conflictMessage = '';
                      if (role === 'president' && areaHasPresident(assigningRole.area)) {
                        conflictMessage = 'Area already has president';
                      } else if (role === 'vice-president' && areaHasVicePresident(assigningRole.area)) {
                        conflictMessage = 'Area already has vice president';
                      }

                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            if (!isDisabled && !conflictMessage) {
                              setNewRole(role);
                              setConfirmDialog({
                                volunteer: assigningRole,
                                newRole: role,
                                conflictMessage
                              });
                            }
                          }}
                          disabled={isDisabled || !!conflictMessage}
                          className={`p-3 rounded-lg border-2 flex flex-col items-center justify-center transition ${
                            newRole === role 
                              ? 'border-red-500 bg-red-50' 
                              : isDisabled
                              ? 'border-gray-300 bg-gray-100 opacity-60'
                              : conflictMessage
                              ? 'border-yellow-300 bg-yellow-50'
                              : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                          }`}
                        >
                          <div className={`mb-1 ${
                            role === 'president' ? 'text-red-600' :
                            role === 'vice-president' ? 'text-blue-600' :
                            'text-green-600'
                          }`}>
                            {getRoleIcon(role)}
                          </div>
                          <div className="text-sm font-medium">{formatRole(role)}</div>
                          {conflictMessage && (
                            <div className="text-xs text-yellow-700 mt-1 text-center">
                              {conflictMessage}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Role Preview */}
                {newRole && (
                  <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Will be assigned as:</div>
                        <div className="flex items-center">
                          {getRoleIcon(newRole)}
                          <span className="ml-2 text-lg font-bold text-gray-900">
                            {formatRole(newRole)}
                          </span>
                          {assigningRole.area && (
                            <span className="ml-2 text-gray-600">in {assigningRole.area}</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setConfirmDialog({
                            volunteer: assigningRole,
                            newRole
                          });
                        }}
                        disabled={loading}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-medium hover:from-red-700 hover:to-orange-700 transition disabled:opacity-70 flex items-center"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Role Assignment</h3>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to assign <span className="font-semibold">{confirmDialog.volunteer.name}</span> 
                  as <span className="font-semibold">{formatRole(confirmDialog.newRole)}</span>?
                </p>
                
                {confirmDialog.conflictMessage && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                      <span className="text-sm text-yellow-700">{confirmDialog.conflictMessage}</span>
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-gray-500">
                  This action will update the volunteer's role and may affect area leadership structure.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDialog(null)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRoleAssignment}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition flex items-center justify-center disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Confirm Assignment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            शूरवीर युवा ट्रस्ट - Admin Panel
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Use this panel to assign roles to volunteers. Only authorized administrators can access this panel.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <p>• Only one president per area is allowed</p>
            <p className="mt-1">• Vice president assignment is optional per area</p>
            <p className="mt-1">• All changes are logged and cannot be undone automatically</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;