// components/MiniVolunteerCard.jsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Printer, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

const VolunteerCard = ({ volunteer }) => {
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
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `id-card-${volunteer.aakNo}.png`;
      link.click();
      
      toast.success('ID Card downloaded!');
    } catch (error) {
      toast.error('Download failed');
    } finally {
      setDownloading(false);
    }
  };

  // Get user image
  const getImageUrl = () => {
    if (volunteer.imageUrl) return volunteer.imageUrl;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=2563eb&color=fff&size=150`;
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Actions */}
      <div className="mb-4 flex justify-end gap-2">
        <button
          onClick={downloadAsPNG}
          disabled={downloading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center"
        >
          {downloading ? (
            <Loader className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          Download
        </button>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 flex items-center"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print
        </button>
      </div>

      {/* Minimal ID Card */}
      <div 
        ref={cardRef} 
        className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-blue-700 text-white py-5 px-4 flex items-center gap-10">
          <img src='/images/logo.jpg' className='h-15 w-10'/>
          <h2 className="font-bold">Soorveer Yuva Sangathan Trust</h2>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex gap-4">
            {/* Photo */}
            <div className="w-1/3">
              <div className="border-2 border-gray-400 rounded overflow-hidden">
                <img 
                  src={getImageUrl()} 
                  alt={volunteer.name}
                  className="w-full aspect-square object-cover"
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

export default VolunteerCard;