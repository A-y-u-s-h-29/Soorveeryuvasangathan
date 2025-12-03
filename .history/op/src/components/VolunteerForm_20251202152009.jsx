// components/VolunteerForm.jsx
import React, { useState } from 'react';
import { volunteerAPI } from '../services/api';
import toast from 'react-hot-toast';

const VolunteerForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        aakNo: '',
        mobileNo: '',
        address: '',
        image: null
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('aakNo', formData.aakNo);
            formDataToSend.append('mobileNo', formData.mobileNo);
            formDataToSend.append('address', formData.address);
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            const response = await volunteerAPI.createVolunteer(formDataToSend);
            
            if (response.success) {
                toast.success('Volunteer registered successfully!');
                onSubmit(response.data);
                resetForm();
            } else {
                toast.error(response.message || 'Registration failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Network error');
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
            image: null
        });
    };

    // ... rest of the component code ...
};