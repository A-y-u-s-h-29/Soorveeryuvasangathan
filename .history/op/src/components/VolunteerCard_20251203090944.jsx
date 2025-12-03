// components/MiniVolunteerCard.jsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Loader } from 'lucide-react';
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
        useCORS: true,
        allowTaint: true, // Important for cross-origin images
        removeContainer: true,
        onclone: (clonedDoc) => {
          // Remove any problematic CSS that uses oklch
          const styleElements = clonedDoc.querySelectorAll('style');
          styleElements.forEach(style => {
            if (style.textContent.includes('oklch')) {
              style.remove();
            }
          });
          
          // Replace Tailwind classes that might use oklch
          const elements = clonedDoc.querySelectorAll('[class*="bg-"], [class*="text-"], [class*="border-"]');
          elements.forEach(el => {
            const classes = el.className;
            if (classes.includes('oklch')) {
              // Replace problematic classes
              const newClasses = classes
                .replace(/bg-\[.*oklch.*\]/g, 'bg-gray-100')
                .replace(/text-\[.*oklch.*\]/g, 'text-gray-800')
                .replace(/border-\[.*oklch.*\]/g, 'border-gray-300');
              el.className = newClasses;
            }
          });
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `id-card-${volunteer.aakNo || volunteer.uniqueId || 'volunteer'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('ID Card downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  // Get user image - FIXED with better error handling
  const getImageUrl = () => {
    // If imageUrl is a data URL (from form preview)
    if (volunteer.imageUrl && volunteer.imageUrl.startsWith('data:image')) {
      return volunteer.imageUrl;
    }
    
    // If imageUrl is from backend
    if (volunteer.imageUrl && volunteer.imageUrl.includes('uploads')) {
      return `http://localhost:5000${volunteer.imageUrl}`;
    }
    
    // If imageUrl is a full URL
    if (volunteer.imageUrl && (volunteer.imageUrl.startsWith('http://') || volunteer.imageUrl.startsWith('https://'))) {
      return volunteer.imageUrl;
    }
    
    // Default avatar
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=200&bold=true&format=png`;
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Download Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={downloadAsPNG}
          disabled={downloading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-70 shadow-md"
        >
          {downloading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download ID Card
            </>
          )}
        </button>
      </div>

      {/* Minimal ID Card - Using simple CSS colors to avoid oklch */}
      <div 
        ref={cardRef} 
        className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg"
        style={{
          fontFamily: 'Arial, sans-serif',
          color: '#1f2937' // text-gray-800
        }}
      >
        {/* Header */}
        <div 
          className="py-2 px-4 flex items-center gap-10"
          style={{
            backgroundColor: '#f97316', // bg-orange-500
            color: 'white'
          }}
        >
          <div className="h-17 w-17 rounded-full overflow-hidden bg-white">
            <img 
              src='/images/logo.jpg' 
              alt="Logo" 
              className='h-full w-full object-cover rounded-full'
              crossOrigin="anonymous"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="h-17 w-17 flex items-center justify-center bg-gray-200 text-gray-600 text-xs">LOGO</div>';
              }}
            />
          </div>
          <h2 className="font-semibold text-xl" style={{ fontFamily: 'Arial, sans-serif' }}>
            Soorveer Yuva Sangathan Trust
          </h2>
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
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=200&bold=true&format=png`;
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="w-2/3">
              {/* Name */}
              <div className="mb-3">
                <div className="text-sm" style={{ color: '#6b7280' }}>NAME</div>
                <div className="text-xl font-bold" style={{ color: '#111827' }}>{volunteer.name}</div>
              </div>

              {/* AAK Number */}
              <div className="mb-3">
                <div className="text-sm" style={{ color: '#6b7280' }}>AAK NO.</div>
                <div className="text-lg font-semibold" style={{ color: '#111827' }}>{volunteer.aakNo}</div>
              </div>

              {/* Mobile */}
              <div className="mb-3">
                <div className="text-sm" style={{ color: '#6b7280' }}>MOBILE</div>
                <div className="text-lg font-semibold" style={{ color: '#111827' }}>+91 {volunteer.mobileNo}</div>
              </div>

              {/* Address */}
              <div>
                <div className="text-sm" style={{ color: '#6b7280' }}>ADDRESS</div>
                <div className="text-sm font-medium" style={{ color: '#111827' }}>{volunteer.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniVolunteerCard;