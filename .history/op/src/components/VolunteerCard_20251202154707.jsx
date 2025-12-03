// components/VolunteerCard.jsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  Download, 
  Printer, 
  Share2, 
  Phone,
  Loader,
  X
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const VolunteerCard = ({ volunteer, isPreview = false, onDelete }) => {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Generate QR code URL
  const generateQRCode = (text) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
  };

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
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=200&bold=true`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Card Actions */}
      {!isPreview && (
        <div className="mb-6 bg-white rounded-xl shadow-md p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Volunteer ID Card</h2>
              <p className="text-gray-600 text-sm">
                ID: <span className="font-semibold text-blue-600">SORVER-{String(volunteer.uniqueId).padStart(4, '0')}</span>
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {/* Delete Button */}
              {onDelete && (
                <button
                  onClick={() => onDelete(volunteer._id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Delete
                </button>
              )}
              
              {/* Share Button */}
              <button
                onClick={shareCard}
                disabled={sharing}
                className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition flex items-center disabled:opacity-70"
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
                className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition flex items-center"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
              
              {/* Download Button */}
              <button
                onClick={downloadAsPNG}
                disabled={downloading}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition flex items-center disabled:opacity-70"
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

      {/* ID Card Design - Matching the image style */}
      <div 
        ref={cardRef} 
        className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-800"
        style={{ 
          maxWidth: '700px',
          margin: '0 auto',
          minHeight: '400px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)'
        }}
      >
        {/* Top Header - Red Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 py-3 px-6 relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <div className="bg-white/20 p-1 rounded">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">SV</span>
              </div>
            </div>
          </div>
          <h1 className="text-center text-2xl font-bold text-white tracking-wider">
            SORVER VOLUNTEER ID
          </h1>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Photo and Basic Info */}
            <div className="space-y-4">
              {/* Photo Section */}
              <div className="relative">
                <div className="w-40 h-40 mx-auto border-4 border-gray-800 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100">
                  <img 
                    src={getImageUrl()} 
                    alt={volunteer.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=200&bold=true`;
                    }}
                  />
                </div>
                {/* Photo Frame Decoration */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-md font-bold text-xs">
                  PHOTO
                </div>
              </div>

              {/* ID Number */}
              <div className="text-center">
                <div className="bg-gray-800 rounded-lg py-2 px-4">
                  <p className="text-xs text-gray-300 mb-1">VOLUNTEER ID</p>
                  <p className="text-xl font-bold text-white">
                    SORVER-{String(volunteer.uniqueId).padStart(4, '0')}
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Column - Personal Details */}
            <div className="md:col-span-2">
              {/* Name Section */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-red-600 font-bold">✓</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{volunteer.name}</h2>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 font-medium">Authorized Volunteer Member</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mobile Number */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center mb-2">
                    <Phone className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="font-bold text-blue-900">MOBILE</h4>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">+91 {volunteer.mobileNo}</p>
                  <p className="text-xs text-gray-600 mt-1">Emergency Contact</p>
                </div>

                {/* AAK Number */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center mb-2">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">ID</span>
                    </div>
                    <h4 className="font-bold text-green-900">AAK NO.</h4>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{volunteer.aakNo}</p>
                  <p className="text-xs text-gray-600 mt-1">Unique Identification</p>
                </div>

                {/* Address */}
                <div className="md:col-span-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-center mb-2">
                    <div className="w-5 h-5 bg-orange-600 rounded-lg flex items-center justify-center mr-2">
                      <span className="text-white text-xs">📍</span>
                    </div>
                    <h4 className="font-bold text-orange-900">ADDRESS</h4>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{volunteer.address}</p>
                  <p className="text-xs text-gray-600 mt-1">Registered Residential Address</p>
                </div>
              </div>

              {/* Join Date */}
              <div className="mt-4">
                <div className="inline-flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg">
                  <span className="text-sm mr-2">Member Since:</span>
                  <span className="font-bold">{formatDate(volunteer.joinDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - QR Code and Contact */}
          <div className="mt-6 pt-6 border-t border-gray-300">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Contact Info */}
              <div className="mb-4 md:mb-0">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-md font-bold">
                    +919923225066
                  </div>
                  <div className="text-gray-700">
                    <p className="text-sm font-semibold">SORVER HELPLINE</p>
                    <p className="text-xs text-gray-600">24/7 Support Available</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center">
                <div className="bg-white p-3 rounded-lg border-2 border-gray-300 inline-block">
                  <img 
                    src={generateQRCode(`https://sorver.org/verify/${volunteer._id}`)}
                    alt="QR Code"
                    className="w-20 h-20"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">Scan to Verify</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-gray-900 py-3 px-6">
          <div className="flex justify-between items-center text-white text-xs">
            <div className="flex items-center">
              <span className="bg-red-600 px-2 py-1 rounded mr-2 font-bold">SORVER</span>
              <span>Official Volunteer Identity Card</span>
            </div>
            <div className="text-gray-400">
              Valid Until: {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Watermark Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-1/4 left-1/4 text-6xl font-bold text-gray-400 rotate-12">SORVER</div>
          <div className="absolute bottom-1/4 right-1/4 text-6xl font-bold text-gray-400 -rotate-12">VOLUNTEER</div>
        </div>
      </div>

      {/* Instructions */}
      {!isPreview && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">!</span>
            </div>
            ID Card Instructions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-red-600 font-bold">P</span>
              </div>
              <h4 className="font-semibold mb-1">Print & Laminate</h4>
              <p className="text-sm text-gray-600">Print on A4 paper and laminate for durability</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <h4 className="font-semibold mb-1">Verification</h4>
              <p className="text-sm text-gray-600">Always carry for identity verification</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-1">Emergency</h4>
              <p className="text-sm text-gray-600">Show card for emergency assistance</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerCard;