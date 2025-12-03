// components/MiniVolunteerCard.jsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Printer, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

const MiniVolunteerCard = ({ volunteer }) => {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  // Download as PNG
  const downloadAsPNG = async () => {
    if (!cardRef.current) return;
    
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true // Allow cross-origin images
      });
      
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `id-card-${volunteer.aakNo}.png`;
      link.click();
      
      toast.success('ID Card downloaded!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed');
    } finally {
      setDownloading(false);
    }
  };

  // Get user image - FIXED
  const getImageUrl = () => {
    // If imageUrl is a data URL (from form preview)
    if (volunteer.imageUrl && volunteer.imageUrl.startsWith('data:image')) {
      return volunteer.imageUrl;
    }
    
    // If imageUrl is from backend
    if (volunteer.imageUrl) {
      return `http://localhost:5000${volunteer.imageUrl}`;
    }
    
    // Default avatar
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=2563eb&color=fff&size=150`;
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Actions */}
      <div className="mb-4 flex justify-end gap-2">
       
      </div>

      {/* Minimal ID Card */}
      <div 
        ref={cardRef} 
        className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-orange-500 text-white py-2 px-4 flex items-center gap-10">
          <img 
            src='/images/logo.jpg' 
            alt="Logo" 
            className='h-15 w-15 rounded-full'
            crossOrigin="anonymous"
          />
          <h2 className="font-semibold text-xl">Soorveer Yuva Sangathan Trust</h2>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex gap-4">
            {/* Photo */}
            <div className="w-1/3">
              <div className="border-2 border-gray-400 rounded overflow-hidden bg-gray-100">
                <img 
                  src={getImageUrl()} 
                  alt={volunteer.name}
                  className="w-full h-40 object-cover"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    // If image fails to load, show default avatar
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=2563eb&color=fff&size=150`;
                  }}
                />
              </div>
              <div className="text-center mt-1">
                <span className="bg-gray-800 text-white text-xs px-2 py-1">PHOTO</span>
              </div>
            </div>

            {/* Details */}
            <div className="w-2/3">
              {/* Name */}
              <div className="mb-3">
                <div className="text-sm text-gray-500">NAME</div>
                <div className="text-xl font-bold">{volunteer.name}</div>
              </div>

              {/* AAK Number */}
              <div className="mb-3">
                <div className="text-sm text-gray-500">AAK NO.</div>
                <div className="text-lg font-semibold">{volunteer.aakNo}</div>
              </div>

              {/* Mobile */}
              <div className="mb-3">
                <div className="text-sm text-gray-500">MOBILE</div>
                <div className="text-lg font-semibold">+91 {volunteer.mobileNo}</div>
              </div>

              {/* Address */}
              <div>
                <div className="text-sm text-gray-500">ADDRESS</div>
                <div className="text-sm font-medium">{volunteer.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniVolunteerCard;