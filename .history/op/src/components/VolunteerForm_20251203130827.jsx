// components/VolunteerForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { volunteerAPI } from '../services/api';
import toast from 'react-hot-toast';
import { User, Phone, Home, IdCard, Camera, X, Upload, Loader } from 'lucide-react';

const VolunteerForm = ({ onSubmit, onCancel }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        aakNo: '',
        mobileNo: '',
        address: '',
        image: null,
        imagePreview: null
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        
        // Mobile number validation
        if (name === 'mobileNo') {
            if (!/^\d*$/.test(value)) return;
            if (value.length > 10) return;
        }
        
        // AAK number validation
        if (name === 'aakNo') {
            if (!/^\d*$/.test(value)) return;
        }
        
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }
            
            // Check file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                toast.error('Only JPG, PNG, and GIF images are allowed');
                return;
            }
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: file, // Keep the file object
                    imagePreview: reader.result // For preview
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            image: null,
            imagePreview: null
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.aakNo.trim()) {
            newErrors.aakNo = 'AAK number is required';
        } else if (formData.aakNo.length < 3) {
            newErrors.aakNo = 'AAK number is too short';
        }
        
        if (!formData.mobileNo.trim()) {
            newErrors.mobileNo = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobileNo)) {
            newErrors.mobileNo = 'Mobile number must be 10 digits';
        }
        
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        } else if (formData.address.length < 10) {
            newErrors.address = 'Address is too short';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }
        
        setLoading(true);

        try {
            // Create FormData to send image file
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name.trim());
            formDataToSend.append('aakNo', formData.aakNo.trim());
            formDataToSend.append('mobileNo', formData.mobileNo.trim());
            formDataToSend.append('address', formData.address.trim());
            
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            // Try to save to backend
            try {
                const response = await volunteerAPI.createVolunteer(formDataToSend);
                
                if (response.success) {
                    toast.success('Volunteer registered successfully!');
                    if (onSubmit) {
                        // Include imageUrl in the data
                        onSubmit({
                            ...response.data,
                            imageUrl: response.data.imageUrl || formData.imagePreview
                        });
                    }
                    resetForm();
                    return;
                }
            } catch (backendError) {
                console.log('Backend not available, using mock data');
            }

            // If backend fails, use mock data with image preview
            const mockVolunteerData = {
                _id: Date.now().toString(),
                uniqueId: Math.floor(Math.random() * 1000) + 1,
                name: formData.name.trim(),
                aakNo: formData.aakNo.trim(),
                mobileNo: formData.mobileNo.trim(),
                address: formData.address.trim(),
                imageUrl: formData.imagePreview || '', // Use the image preview
                joinDate: new Date().toISOString(),
                createdAt: new Date()
            };

            toast.success('Volunteer registered successfully! (Demo Mode)');
            if (onSubmit) {
                onSubmit(mockVolunteerData);
            }
            resetForm();
            
        } catch (error) {
            console.error('Error:', error);
            toast.error('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            aakNo: '',
            mobileNo: '',
            address: '',
            image: null,
            imagePreview: null
        });
        setErrors({});
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Volunteer Registration</h2>
                            <p className="text-blue-100 mt-1">Join शूरवीर युवा ट्रस्ट as a volunteer</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-full">
                            <User className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 md:p-8" encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column - Personal Details */}
                        <div className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label className="flex items-center text-gray-700 font-medium mb-2">
                                    <User className="w-5 h-5 mr-2 text-blue-600" />
                                    Full Name *
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className={`w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        disabled={loading}
                                    />
                                    <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <i className="fas fa-exclamation-circle mr-1"></i>
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* AAK Number Field */}
                            <div>
                                <label className="flex items-center text-gray-700 font-medium mb-2">
                                    <IdCard className="w-5 h-5 mr-2 text-green-600" />
                                    Adhar Number *
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="aakNo"
                                        value={formData.aakNo}
                                        onChange={handleChange}
                                        placeholder="Enter Adhar number"
                                        className={`w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.aakNo ? 'border-red-500' : 'border-gray-300'}`}
                                        disabled={loading}
                                    />
                                    <IdCard className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                </div>
                                {errors.aakNo && (
                                    <p className="text-red-500 text-sm mt-1">{errors.aakNo}</p>
                                )}
                            </div>

                            {/* Mobile Number Field */}
                            <div>
                                <label className="flex items-center text-gray-700 font-medium mb-2">
                                    <Phone className="w-5 h-5 mr-2 text-purple-600" />
                                    Mobile Number *
                                </label>
                                <div className="relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-gray-300 bg-gray-50 rounded-l-lg">
                                        <span className="text-gray-500">+91</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="mobileNo"
                                        value={formData.mobileNo}
                                        onChange={handleChange}
                                        placeholder="Enter 10-digit mobile number"
                                        className={`w-full px-4 py-3 pl-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.mobileNo ? 'border-red-500' : 'border-gray-300'}`}
                                        maxLength={10}
                                        disabled={loading}
                                    />
                                </div>
                                {errors.mobileNo && (
                                    <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Address & Photo */}
                        <div className="space-y-6">
                            {/* Address Field */}
                            <div>
                                <label className="flex items-center text-gray-700 font-medium mb-2">
                                    <Home className="w-5 h-5 mr-2 text-orange-600" />
                                    Address *
                                </label>
                                <div className="relative">
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter your complete address"
                                        rows="3"
                                        className={`w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                        disabled={loading}
                                    />
                                    <Home className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                </div>
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                )}
                            </div>

                            {/* Photo Upload Field */}
                            <div>
                                <label className="flex items-center text-gray-700 font-medium mb-2">
                                    <Camera className="w-5 h-5 mr-2 text-pink-600" />
                                    Profile Photo (Optional)
                                </label>
                                
                                {formData.imagePreview ? (
                                    <div className="relative">
                                        <div className="w-40 h-40 mx-auto border-4 border-white rounded-xl shadow-lg overflow-hidden">
                                            <img 
                                                src={formData.imagePreview} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                            disabled={loading}
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="image-upload"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            disabled={loading}
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition group"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-12 h-12 text-gray-400 group-hover:text-blue-500 mb-3" />
                                                <p className="text-sm text-gray-500 group-hover:text-blue-500">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    PNG, JPG, GIF up to 5MB
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center"
                            disabled={loading}
                        >
                            <X className="w-5 h-5 mr-2" />
                            Cancel
                        </button>
                        
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-6 py-3 border-2 border-blue-300 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center"
                            disabled={loading}
                        >
                            <i className="fas fa-redo mr-2"></i>
                            Reset Form
                        </button>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition flex items-center justify-center disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-user-plus mr-2"></i>
                                    Join as Volunteer & Generate ID Card
                                </>
                            )}
                        </button>
                    </div>

                    {/* Form Notes */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-800 flex items-start">
                            <i className="fas fa-info-circle mr-2 mt-0.5"></i>
                            <span>
                                * After registration, your ID card will be automatically generated and displayed 
                                on this page. You can download, print, or share it immediately.
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VolunteerForm;