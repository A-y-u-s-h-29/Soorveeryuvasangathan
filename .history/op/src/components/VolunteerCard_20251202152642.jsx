// components/VolunteerCard.jsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  Download, 
  Printer, 
  Share2, 
  User, 
  Phone, 
  Home, 
  IdCard, 
  Calendar,
  QrCode,
  Mail,
  MapPin,
  Shield,
  CheckCircle,
  Loader
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

  // Generate QR code URL (can be implemented with a QR code library)
  const generateQRCode = (text) => {
    // For now, using a placeholder QR code
    // In production, use a library like qrcode.react
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
  };

  // Download as PNG
  const downloadAsPNG = async () => {
    if (!cardRef.current) return;
    
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `shoorveer-volunteer-${volunteer.uniqueId}-${volunteer.name.replace(/\s+/g, '-').toLowerCase()}.png`;
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
        backgroundColor: null,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85, 54] // Standard ID card size
      });
      
      // Calculate dimensions to fit card in PDF
      const imgWidth = 85;
      const imgHeight = 54;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`shoorveer-volunteer-${volunteer.uniqueId}.pdf`);
      
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
          text: `Shoorveer Yuva Trust Volunteer ID Card for ${volunteer.name}`,
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
      // Fallback: Copy to clipboard
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
            body { margin: 0; padding: 20px; }
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
    
    // Clone the card for printing
    const cardClone = cardRef.current.cloneNode(true);
    cardClone.style.transform = 'scale(1.5)';
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
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=random&color=fff&size=200&bold=true`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Card Actions */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Volunteer ID Card</h2>
            <p className="text-gray-600 text-sm">
              ID: <span className="font-semibold text-blue-600">SYT-{String(volunteer.uniqueId).padStart(4, '0')}</span>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Delete Button (only in admin view) */}
            {!isPreview && onDelete && (
              <button
                onClick={() => onDelete(volunteer._id)}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition flex items-center"
              >
                <i className="fas fa-trash mr-2"></i>
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
            
            {/* Download Dropdown */}
            <div className="relative group">
              <button
                disabled={downloading}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition flex items-center disabled:opacity-70"
              >
                {downloading ? (
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Download
              </button>
              
              {/* Download Options */}
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <button
                  onClick={downloadAsPNG}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-t-lg flex items-center"
                >
                  <i className="fas fa-image mr-3 text-blue-500"></i>
                  <div>
                    <p className="font-medium">Download as PNG</p>
                    <p className="text-xs text-gray-500">High quality image</p>
                  </div>
                </button>
                <button
                  onClick={downloadAsPDF}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-b-lg flex items-center border-t"
                >
                  <i className="fas fa-file-pdf mr-3 text-red-500"></i>
                  <div>
                    <p className="font-medium">Download as PDF</p>
                    <p className="text-xs text-gray-500">Print ready</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ID Card Design */}
      <div 
        ref={cardRef} 
        className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl shadow-2xl overflow-hidden border-8 border-white"
        style={{ 
          maxWidth: '800px',
          margin: '0 auto',
          minHeight: '500px'
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-200 rounded-full translate-y-32 -translate-x-32"></div>
        </div>
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-green-600 py-6 px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                शूरवीर युवा ट्रस्ट
              </h1>
              <p className="text-blue-100 font-medium">Shoorveer Yuva Trust</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Photo & Basic Info */}
            <div className="space-y-6">
              {/* Photo */}
              <div className="relative">
                <div className="w-48 h-48 mx-auto border-4 border-white rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-blue-100 to-green-100">
                  <img 
                    src={getImageUrl()} 
                    alt={volunteer.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=random&color=fff&size=200&bold=true`;
                    }}
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-1 rounded-full font-semibold text-sm">
                  ACTIVE MEMBER
                </div>
              </div>

              {/* Basic Info */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">Volunteer Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <IdCard className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Volunteer ID</p>
                      <p className="font-bold text-lg">SYT-{String(volunteer.uniqueId).padStart(4, '0')}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Join Date</p>
                      <p className="font-semibold">{formatDate(volunteer.joinDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-semibold text-green-600">Verified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Personal Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-lg h-full">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{volunteer.name}</h2>
                  <div className="flex items-center text-gray-600">
                    <User className="w-5 h-5 mr-2" />
                    <span className="font-medium">Registered Volunteer</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* AAK Number */}
                  <div className="bg-blue-50 rounded-xl p-5">
                    <div className="flex items-center mb-2">
                      <IdCard className="w-6 h-6 text-blue-700 mr-3" />
                      <h4 className="font-bold text-blue-900">AAK Number</h4>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{volunteer.aakNo}</p>
                    <p className="text-sm text-gray-600 mt-1">Unique Identification</p>
                  </div>

                  {/* Mobile Number */}
                  <div className="bg-green-50 rounded-xl p-5">
                    <div className="flex items-center mb-2">
                      <Phone className="w-6 h-6 text-green-700 mr-3" />
                      <h4 className="font-bold text-green-900">Contact</h4>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">+91 {volunteer.mobileNo}</p>
                    <p className="text-sm text-gray-600 mt-1">Primary Contact</p>
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2 bg-orange-50 rounded-xl p-5">
                    <div className="flex items-center mb-2">
                      <Home className="w-6 h-6 text-orange-700 mr-3" />
                      <h4 className="font-bold text-orange-900">Address</h4>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{volunteer.address}</p>
                    <p className="text-sm text-gray-600 mt-1">Registered Address</p>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Digital Verification</h4>
                      <p className="text-sm text-gray-600">Scan QR code to verify volunteer details</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border-2 border-dashed border-gray-300">
                      <img 
                        src={generateQRCode(`https://shoorveeryuva.org/verify/${volunteer._id}`)}
                        alt="QR Code"
                        className="w-24 h-24"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 py-4 px-8">
          <div className="flex justify-between items-center text-white text-sm">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Registered with Shoorveer Yuva Trust</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-phone mr-2"></i>
              <span>+91 99232 25066</span>
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-4 right-4 text-gray-300 text-xs opacity-50">
          ID: SYT-{String(volunteer.uniqueId).padStart(4, '0')} • Generated on {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Instructions */}
      {!isPreview && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-info-circle mr-2 text-blue-600"></i>
            ID Card Instructions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-1">Download & Print</h4>
              <p className="text-sm text-gray-600">Download as PNG or PDF for printing</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-semibold mb-1">Verification</h4>
              <p className="text-sm text-gray-600">Scan QR code to verify volunteer details</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-1">Official Use</h4>
              <p className="text-sm text-gray-600">Present this card for trust activities</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerCard;