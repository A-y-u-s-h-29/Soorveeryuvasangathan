// components/VolunteerCard.jsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  Download, 
  Printer, 
  Share2, 
  Loader,
  X
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const VolunteerCard = ({ volunteer, isPreview = false, onDelete }) => {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  // Download as PNG
  const downloadAsPNG = async () => {
    if (!cardRef.current) return;
    
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `sorver-volunteer-${volunteer.uniqueId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('ID Card downloaded as PNG!');
    } catch (error) {
      console.error('Error downloading PNG:', error);
      toast.error('Failed to download ID card');
    } finally {
      setDownloading(false);
    }
  };

  // Download as PDF
  const downloadAsPDF = async () => {
    if (!cardRef.current) return;
    
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85, 54]
      });
      
      const imgWidth = 85;
      const imgHeight = 54;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`sorver-volunteer-${volunteer.uniqueId}.pdf`);
      
      toast.success('ID Card downloaded as PDF!');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download ID card');
    } finally {
      setDownloading(false);
    }
  };

  // Share functionality
  const shareCard = async () => {
    if (navigator.share) {
      setSharing(true);
      try {
        await navigator.share({
          title: `Volunteer ID Card - ${volunteer.name}`,
          text: `SORVER Volunteer ID Card for ${volunteer.name}`,
          url: window.location.href,
        });
        toast.success('ID Card shared successfully!');
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast.error('Failed to share ID card');
        }
      } finally {
        setSharing(false);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      } catch (error) {
        toast.error('Failed to copy link');
      }
    }
  };

  // Print card
  const printCard = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print ID Card - ${volunteer.name}</title>
          <style>
            body { margin: 0; padding: 20px; background: white; }
            @media print {
              @page { margin: 0; }
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          <div id="print-content"></div>
        </body>
      </html>
    `);
    
    const cardClone = cardRef.current.cloneNode(true);
    cardClone.style.transform = 'scale(1.2)';
    cardClone.style.margin = 'auto';
    
    printWindow.document.getElementById('print-content').appendChild(cardClone);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Placeholder image if no image provided
  const getImageUrl = () => {
    if (volunteer.imageUrl) {
      return volunteer.imageUrl.startsWith('http') 
        ? volunteer.imageUrl 
        : `http://localhost:5000${volunteer.imageUrl}`;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=200`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Card Actions */}
      {!isPreview && (
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Volunteer ID Card</h2>
              <p className="text-gray-600 text-sm">
                ID: <span className="font-semibold">SORVER-{String(volunteer.uniqueId).padStart(4, '0')}</span>
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {/* Delete Button */}
              {onDelete && (
                <button
                  onClick={() => onDelete(volunteer._id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-md font-medium hover:bg-red-100 transition flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Delete
                </button>
              )}
              
              {/* Share Button */}
              <button
                onClick={shareCard}
                disabled={sharing}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition flex items-center disabled:opacity-70"
              >
                {sharing ? (
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Share2 className="w-4 h-4 mr-2" />
                )}
                Share
              </button>
              
              {/* Print Button */}
              <button
                onClick={printCard}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition flex items-center"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
              
              {/* Download Button */}
              <button
                onClick={downloadAsPNG}
                disabled={downloading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition flex items-center disabled:opacity-70"
              >
                {downloading ? (
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ID Card Design - EXACT COPY of the image */}
      <div 
        ref={cardRef} 
        className="relative bg-white rounded-none border-4 border-black"
        style={{ 
          maxWidth: '600px',
          margin: '0 auto',
          minHeight: '380px',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        {/* Top Blue Header */}
        <div 
          className="py-1 px-4 relative"
          style={{ 
            background: 'linear-gradient(to right, #000080, #4169e1)',
            borderBottom: '3px solid #000'
          }}
        >
          <h1 
            className="text-center text-xl font-bold tracking-wider"
            style={{ 
              color: '#fff',
              textShadow: '1px 1px 2px #000',
              letterSpacing: '2px'
            }}
          >
            SORVER VOLUNTEER ID CARD
          </h1>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Photo */}
            <div className="space-y-6">
              {/* Photo Box */}
              <div className="relative">
                <div 
                  className="w-36 h-36 mx-auto border-2 border-gray-800 overflow-hidden"
                  style={{ background: '#f0f0f0' }}
                >
                  <img 
                    src={getImageUrl()} 
                    alt={volunteer.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=200`;
                    }}
                  />
                </div>
                {/* Photo Label */}
                <div 
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-3 py-1 font-bold text-xs"
                  style={{ 
                    background: '#ff0000',
                    color: '#fff',
                    borderRadius: '0'
                  }}
                >
                  PHOTO
                </div>
              </div>

              {/* ID Number - EXACT as in image */}
              <div className="text-center">
                <div 
                  className="py-2 px-3"
                  style={{ 
                    background: '#000',
                    color: '#fff',
                    borderRadius: '0',
                    border: '2px solid #666'
                  }}
                >
                  <p 
                    className="text-xs mb-1"
                    style={{ 
                      color: '#ccc',
                      letterSpacing: '1px'
                    }}
                  >
                    VOLUNTEER ID
                  </p>
                  <p 
                    className="text-lg font-bold tracking-widest"
                    style={{ letterSpacing: '3px' }}
                  >
                    0015
                  </p>
                </div>
              </div>

              {/* Bottom Left Info */}
              <div 
                className="text-center mt-4 p-2"
                style={{ 
                  background: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '0'
                }}
              >
                <p 
                  className="text-xs font-bold mb-1"
                  style={{ color: '#333' }}
                >
                  HUA
                </p>
                <p 
                  className="text-xs"
                  style={{ color: '#666' }}
                >
                  Authorized Signatory
                </p>
              </div>
            </div>

            {/* Middle Column - Details */}
            <div className="col-span-2">
              {/* Name Section */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div 
                    className="w-10 h-10 flex items-center justify-center mr-3"
                    style={{ 
                      background: '#ff0000',
                      color: '#fff',
                      borderRadius: '5px'
                    }}
                  >
                    <span className="font-bold text-lg">✓</span>
                  </div>
                  <div>
                    <h2 
                      className="text-3xl font-bold"
                      style={{ 
                        color: '#000',
                        textShadow: 'none'
                      }}
                    >
                      {volunteer.name}
                    </h2>
                    <div 
                      className="mt-1 px-3 py-1 inline-block"
                      style={{ 
                        background: '#f0f8ff',
                        border: '1px solid #87ceeb',
                        borderRadius: '0'
                      }}
                    >
                      <p 
                        className="text-sm font-semibold"
                        style={{ color: '#000080' }}
                      >
                        Registered Volunteer Member
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details Table */}
                <div 
                  className="space-y-4"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {/* Mobile Number */}
                  <div>
                    <div className="flex items-center mb-1">
                      <div 
                        className="w-6 h-6 flex items-center justify-center mr-2"
                        style={{ 
                          background: '#000080',
                          color: '#fff',
                          borderRadius: '3px',
                          fontSize: '12px'
                        }}
                      >
                        P
                      </div>
                      <p 
                        className="text-sm font-bold"
                        style={{ color: '#000' }}
                      >
                        MOBILE NUMBER
                      </p>
                    </div>
                    <div 
                      className="pl-8 py-2"
                      style={{ 
                        background: '#e6f2ff',
                        borderLeft: '3px solid #000080',
                        borderRadius: '0'
                      }}
                    >
                      <p 
                        className="text-xl font-bold"
                        style={{ color: '#000' }}
                      >
                        +91 99232 25066
                      </p>
                      <p 
                        className="text-xs mt-1"
                        style={{ color: '#666' }}
                      >
                        Emergency Contact Number
                      </p>
                    </div>
                  </div>

                  {/* AAK Number */}
                  <div>
                    <div className="flex items-center mb-1">
                      <div 
                        className="w-6 h-6 flex items-center justify-center mr-2"
                        style={{ 
                          background: '#008000',
                          color: '#fff',
                          borderRadius: '3px',
                          fontSize: '12px'
                        }}
                      >
                        ID
                      </div>
                      <p 
                        className="text-sm font-bold"
                        style={{ color: '#000' }}
                      >
                        AAK NUMBER
                      </p>
                    </div>
                    <div 
                      className="pl-8 py-2"
                      style={{ 
                        background: '#f0fff0',
                        borderLeft: '3px solid #008000',
                        borderRadius: '0'
                      }}
                    >
                      <p 
                        className="text-xl font-bold"
                        style={{ color: '#000' }}
                      >
                        {volunteer.aakNo || 'A-123456'}
                      </p>
                      <p 
                        className="text-xs mt-1"
                        style={{ color: '#666' }}
                      >
                        Unique Identification Number
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <div className="flex items-center mb-1">
                      <div 
                        className="w-6 h-6 flex items-center justify-center mr-2"
                        style={{ 
                          background: '#ff8c00',
                          color: '#fff',
                          borderRadius: '3px',
                          fontSize: '12px'
                        }}
                      >
                        🏠
                      </div>
                      <p 
                        className="text-sm font-bold"
                        style={{ color: '#000' }}
                      >
                        ADDRESS
                      </p>
                    </div>
                    <div 
                      className="pl-8 py-2"
                      style={{ 
                        background: '#fff8e1',
                        borderLeft: '3px solid #ff8c00',
                        borderRadius: '0'
                      }}
                    >
                      <p 
                        className="text-md font-semibold"
                        style={{ color: '#000' }}
                      >
                        {volunteer.address}
                      </p>
                      <p 
                        className="text-xs mt-1"
                        style={{ color: '#666' }}
                      >
                        Registered Residential Address
                      </p>
                    </div>
                  </div>
                </div>

                {/* Join Date */}
                <div className="mt-6">
                  <div 
                    className="inline-flex items-center px-4 py-2"
                    style={{ 
                      background: '#333',
                      color: '#fff',
                      borderRadius: '0'
                    }}
                  >
                    <span className="text-sm mr-2">Member Since:</span>
                    <span className="font-bold">15 JAN 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          className="mt-4 pt-4 border-t-2 border-gray-300 px-6"
          style={{ borderStyle: 'dashed' }}
        >
          <div className="flex justify-between items-center">
            {/* Left Side - Contact Info */}
            <div>
              <div className="flex items-center">
                <div 
                  className="px-3 py-1 mr-3 font-bold"
                  style={{ 
                    background: '#ff0000',
                    color: '#fff',
                    borderRadius: '0',
                    fontSize: '14px'
                  }}
                >
                  +919923225066
                </div>
                <div>
                  <p 
                    className="text-xs font-bold"
                    style={{ color: '#000' }}
                  >
                    SORVER HELPLINE
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: '#666' }}
                  >
                    24/7 Emergency Support
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - QR Code */}
            <div className="text-center">
              <div 
                className="p-2 inline-block"
                style={{ 
                  background: '#fff',
                  border: '2px solid #000',
                  borderRadius: '0'
                }}
              >
                {/* QR Code Placeholder */}
                <div 
                  className="w-20 h-20 flex items-center justify-center"
                  style={{ 
                    background: '#f0f0f0',
                    border: '1px dashed #999'
                  }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-1">■</div>
                    <p className="text-xs">QR CODE</p>
                  </div>
                </div>
              </div>
              <p 
                className="text-xs mt-1"
                style={{ color: '#666' }}
              >
                Scan for Verification
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="py-2 px-6 mt-4"
          style={{ 
            background: '#000',
            borderTop: '2px solid #666'
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span 
                className="px-2 py-1 mr-2 font-bold"
                style={{ 
                  background: '#ff0000',
                  color: '#fff',
                  fontSize: '12px'
                }}
              >
                SORVER
              </span>
              <span 
                className="text-xs"
                style={{ color: '#fff' }}
              >
                Official Volunteer Identity Card
              </span>
            </div>
            <div>
              <span 
                className="text-xs"
                style={{ color: '#ccc' }}
              >
                © 2024 SORVER TRUST
              </span>
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div 
          className="absolute bottom-2 right-2 text-xs"
          style={{ 
            color: '#ccc',
            opacity: '0.7'
          }}
        >
          ID: SORVER-0015
        </div>
      </div>

      {/* Instructions */}
      {!isPreview && (
        <div 
          className="mt-8 p-6"
          style={{ 
            background: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '0'
          }}
        >
          <h3 
            className="font-bold mb-4 flex items-center text-lg"
            style={{ color: '#000' }}
          >
            <div 
              className="w-8 h-8 flex items-center justify-center mr-3"
              style={{ 
                background: '#ff0000',
                color: '#fff',
                borderRadius: '0'
              }}
            >
              !
            </div>
            ID Card Instructions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="p-4"
              style={{ 
                background: '#fff',
                border: '1px solid #ddd'
              }}
            >
              <div 
                className="w-10 h-10 flex items-center justify-center mb-3"
                style={{ 
                  background: '#e3f2fd',
                  borderRadius: '0'
                }}
              >
                <span style={{ color: '#1976d2', fontWeight: 'bold' }}>P</span>
              </div>
              <h4 className="font-semibold mb-1" style={{ color: '#000' }}>Print Instructions</h4>
              <p className="text-sm" style={{ color: '#666' }}>Print on A4 paper, cut along edges</p>
            </div>
            <div 
              className="p-4"
              style={{ 
                background: '#fff',
                border: '1px solid #ddd'
              }}
            >
              <div 
                className="w-10 h-10 flex items-center justify-center mb-3"
                style={{ 
                  background: '#e8f5e9',
                  borderRadius: '0'
                }}
              >
                <span style={{ color: '#388e3c', fontWeight: 'bold' }}>✓</span>
              </div>
              <h4 className="font-semibold mb-1" style={{ color: '#000' }}>Verification</h4>
              <p className="text-sm" style={{ color: '#666' }}>Present card for identity verification</p>
            </div>
            <div 
              className="p-4"
              style={{ 
                background: '#fff',
                border: '1px solid #ddd'
              }}
            >
              <div 
                className="w-10 h-10 flex items-center justify-center mb-3"
                style={{ 
                  background: '#fff3e0',
                  borderRadius: '0'
                }}
              >
                <span style={{ color: '#f57c00', fontWeight: 'bold' }}>📞</span>
              </div>
              <h4 className="font-semibold mb-1" style={{ color: '#000' }}>Emergency</h4>
              <p className="text-sm" style={{ color: '#666' }}>Contact helpline for assistance</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerCard;