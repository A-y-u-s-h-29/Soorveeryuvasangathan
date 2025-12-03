// components/MiniVolunteerCard.jsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

const MiniVolunteerCard = ({ volunteer }) => {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  // Download as PNG - FIXED
  const downloadAsPNG = async () => {
    if (!cardRef.current) return;
    
    setDownloading(true);
    try {
      // Get the actual dimensions of the card as it appears on screen
      const cardElement = cardRef.current;
      
      // Calculate actual width (including padding, border)
      const width = cardElement.offsetWidth;
      const height = cardElement.offsetHeight;
      
      // Calculate scale to maintain quality but keep same dimensions
      const devicePixelRatio = window.devicePixelRatio || 1;
      const scale = Math.min(2, devicePixelRatio); // Max scale 2 to avoid huge images
      
      const canvas = await html2canvas(cardElement, {
        scale: scale,
        width: width,
        height: height,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        removeContainer: false,
        windowWidth: width,
        windowHeight: height,
        onclone: (clonedDoc, element) => {
          // Don't remove all classes, only fix specific elements
          const allElements = element.querySelectorAll('*');
          
          // Apply explicit styles to the main element
          element.style.width = `${width}px`;
          element.style.height = `${height}px`;
          element.style.maxWidth = `${width}px`;
          
          // Fix images specifically
          const images = element.querySelectorAll('img');
          images.forEach(img => {
            // For logo
            if (img.src.includes('logo')) {
              img.style.width = '68px';
              img.style.height = '68px';
              img.style.objectFit = 'cover';
              img.style.maxWidth = '68px';
              img.style.maxHeight = '68px';
            } 
            // For profile image
            else {
              img.style.width = '100%';
              img.style.height = '160px';
              img.style.objectFit = 'cover';
              img.style.maxWidth = '100%';
              img.style.maxHeight = '160px';
            }
          });
          
          // Ensure organization name text is visible
          const orgName = element.querySelector('h2');
          if (orgName) {
            orgName.style.cssText = `
              font-family: Arial, sans-serif;
              font-size: 20px;
              font-weight: 600;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              flex: 1;
              color: white;
              margin: 0;
              padding: 0;
              display: block;
            `;
          }
          
          // Ensure all text elements have proper styles
          const textElements = element.querySelectorAll('div');
          textElements.forEach(el => {
            if (el.textContent && !el.querySelector('img')) {
              el.style.display = 'block';
              el.style.visibility = 'visible';
              el.style.opacity = '1';
            }
          });
        }
      });
      
      // Create download link
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

  // Get user image
  const getImageUrl = () => {
    if (volunteer.imageUrl && volunteer.imageUrl.startsWith('data:image')) {
      return volunteer.imageUrl;
    }
    
    if (volunteer.imageUrl && volunteer.imageUrl.includes('uploads')) {
      return `http://localhost:5000${volunteer.imageUrl}`;
    }
    
    if (volunteer.imageUrl && (volunteer.imageUrl.startsWith('http://') || volunteer.imageUrl.startsWith('https://'))) {
      return volunteer.imageUrl;
    }
    
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

      {/* Minimal ID Card - FIXED with explicit dimensions */}
      <div 
        ref={cardRef} 
        className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg"
        style={{
          fontFamily: 'Arial, sans-serif',
          color: '#1f2937',
          width: '400px', // Fixed width
          maxWidth: '400px',
          margin: '0 auto' // Center if needed
        }}
      >
        {/* Header */}
        <div 
          className="py-2 px-4 flex items-center gap-4"
          style={{
            backgroundColor: '#f97316',
            color: 'white',
            height: '80px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {/* Logo - Fixed dimensions */}
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: 'white',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src='/images/logo.jpg' 
              alt="Logo" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              crossOrigin="anonymous"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = 
                  '<div style="width: 68px; height: 68px; display: flex; align-items: center; justify-content: center; background-color: #e5e7eb; color: #4b5563; font-size: 12px; border-radius: 50%;">LOGO</div>';
              }}
            />
          </div>
          
          {/* Organization Name - IMPORTANT: Added explicit inline styles */}
          <h2 
            className="font-semibold"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '20px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: 1,
              color: 'white',
              margin: 0,
              padding: 0,
              lineHeight: '1.2'
            }}
          >
            Soorveer Yuva Sangathan Trust
          </h2>
        </div>

        {/* Content */}
        <div className="p-4" style={{ padding: '16px' }}>
          <div className="flex gap-4" style={{ display: 'flex', gap: '16px' }}>
            {/* Photo - Fixed dimensions */}
            <div style={{ width: '33.333%', flexShrink: 0 }}>
              <div style={{
                border: '2px solid #9ca3af',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: '#f3f4f6',
                height: '160px'
              }}>
                <img 
                  src={getImageUrl()} 
                  alt={volunteer.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=200&bold=true&format=png`;
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div style={{ width: '66.667%' }}>
              {/* Name */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>NAME</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
                  {volunteer.name}
                </div>
              </div>

              {/* AAK Number */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>AAK NO.</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                  {volunteer.aakNo}
                </div>
              </div>

              {/* Mobile */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>MOBILE</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                  +91 {volunteer.mobileNo}
                </div>
              </div>

              {/* Address */}
              <div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>ADDRESS</div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                  {volunteer.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniVolunteerCard;