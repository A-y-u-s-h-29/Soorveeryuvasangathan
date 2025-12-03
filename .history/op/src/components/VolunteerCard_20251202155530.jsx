// components/AAKVolunteerCard.jsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  Download, 
  Printer, 
  Share2, 
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Shield,
  Loader,
  X
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AAKVolunteerCard = ({ volunteer, isPreview = false, onDelete }) => {
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
      link.download = `aak-volunteer-${volunteer.uniqueId}.png`;
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
        format: [90, 55]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 90, 55);
      pdf.save(`aak-volunteer-${volunteer.uniqueId}.pdf`);
      
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
          title: `AAK Volunteer ID - ${volunteer.name}`,
          text: `AAK Foundation Volunteer ID Card for ${volunteer.name}`,
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
    cardClone.style.transform = 'scale(1.3)';
    cardClone.style.margin = 'auto';
    
    printWindow.document.getElementById('print-content').appendChild(cardClone);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Get user image
  const getImageUrl = () => {
    if (volunteer.imageUrl) {
      return volunteer.imageUrl.startsWith('http') 
        ? volunteer.imageUrl 
        : `http://localhost:5000${volunteer.imageUrl}`;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=2563eb&color=fff&size=300`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Card Actions */}
      {!isPreview && (
        <div className="mb-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">AAK Foundation ID Card</h2>
              <p className="text-gray-600 text-sm">
                Volunteer ID: <span className="font-semibold text-blue-600">AAK-{String(volunteer.uniqueId).padStart(4, '0')}</span>
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
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition flex items-center disabled:opacity-70"
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

      {/* AAK Foundation ID Card */}
      <div 
        ref={cardRef} 
        className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden border-8 border-white"
        style={{ 
          maxWidth: '900px',
          margin: '0 auto',
          minHeight: '500px'
        }}
      >
        {/* Top Header with Foundation Name */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-5 px-8 relative">
          {/* AAK Logo on Left */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">AAK</span>
              </div>
            </div>
          </div>
          
          {/* Foundation Name in Middle */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white tracking-wider">
              AAK FOUNDATION
            </h1>
            <p className="text-blue-200 font-medium mt-1">
              Registered Trust for Social Welfare & Community Service
            </p>
          </div>
          
          {/* QR Code on Right */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <div className="bg-white/20 p-2 rounded-lg">
              <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-black text-xs font-bold">QR</div>
                  <div className="text-gray-600 text-xs">CODE</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - AAK Company Logo & Info */}
            <div className="space-y-8">
              {/* AAK Logo Large */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100 shadow-lg">
                <div className="w-full h-40 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-3">
                      <span className="text-blue-600 text-3xl font-bold">AAK</span>
                    </div>
                    <h3 className="text-white text-xl font-bold">AAK FOUNDATION</h3>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-700 font-semibold">Official ID Card</p>
                  <p className="text-gray-500 text-sm mt-1">Trust Registration No: 123456/2023</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-5 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">Foundation Contact</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Helpline</p>
                      <p className="font-semibold">+91 99232 25066</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold">contact@aakfoundation.org</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Head Office</p>
                      <p className="font-semibold">Mumbai, Maharashtra</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validity */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 text-center">
                <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Valid Until</p>
                <p className="font-bold text-green-700">31 DEC 2025</p>
                <p className="text-xs text-gray-500 mt-1">Annual Renewal Required</p>
              </div>
            </div>

            {/* Middle Column - User Photo */}
            <div className="flex flex-col items-center justify-center">
              {/* Photo Frame */}
              <div className="relative">
                <div className="w-64 h-64 border-8 border-white rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                  <img 
                    src={getImageUrl()} 
                    alt={volunteer.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=2563eb&color=fff&size=300`;
                    }}
                  />
                </div>
                
                {/* Photo Label */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-bold shadow-lg">
                  PHOTOGRAPH
                </div>
              </div>

              {/* Signature Area */}
              <div className="mt-16 text-center">
                <div className="border-t-2 border-gray-400 w-48 mx-auto pt-2">
                  <p className="text-sm text-gray-600">Authorized Signature</p>
                  <p className="font-bold text-gray-800">HUA</p>
                  <p className="text-xs text-gray-500">Trustee & Founder</p>
                </div>
              </div>
            </div>

            {/* Right Column - Volunteer Details */}
            <div className="space-y-6">
              {/* Volunteer ID Badge */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-200">VOLUNTEER ID CARD</p>
                    <p className="text-2xl font-bold tracking-widest">
                      AAK-{String(volunteer.uniqueId).padStart(4, '0')}
                    </p>
                  </div>
                  <Shield className="w-10 h-10 text-blue-300" />
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                <h3 className="font-bold text-gray-800 text-xl mb-6 border-b pb-3">PERSONAL DETAILS</h3>
                
                <div className="space-y-5">
                  {/* Name */}
                  <div className="flex items-start">
                    <User className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">FULL NAME</p>
                      <p className="text-2xl font-bold text-gray-900">{volunteer.name}</p>
                      <p className="text-sm text-gray-600 mt-1">Authorized Volunteer Member</p>
                    </div>
                  </div>

                  {/* AAK Number */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">ID</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">AAK MEMBER NUMBER</p>
                        <p className="text-xl font-bold text-gray-900">{volunteer.aakNo}</p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">MOBILE NUMBER</p>
                      <p className="text-xl font-bold text-gray-900">+91 {volunteer.mobileNo}</p>
                      <p className="text-sm text-green-600 mt-1">✓ Verified & Active</p>
                    </div>
                  </div>

                  {/* Join Date */}
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-purple-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">MEMBER SINCE</p>
                      <p className="text-lg font-bold text-gray-900">{formatDate(volunteer.joinDate)}</p>
                      <p className="text-sm text-gray-600 mt-1">Active Volunteer</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">REGISTERED ADDRESS</p>
                      <p className="text-lg font-semibold text-gray-900">{volunteer.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white text-center">
                <div className="flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-bold">ACTIVE VOLUNTEER</p>
                    <p className="text-sm opacity-90">Status: Verified & Approved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-4 px-8">
          <div className="flex justify-between items-center text-white text-sm">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span>This card is property of AAK Foundation</span>
            </div>
            <div className="flex items-center">
              <span className="bg-white/20 px-3 py-1 rounded mr-3 font-bold">EMERGENCY: 9923225066</span>
              <span>www.aakfoundation.org</span>
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-3 right-3 text-gray-400 text-xs opacity-70">
          Generated on {new Date().toLocaleDateString()}
        </div>

        {/* Security Pattern Background */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-0 right-0 text-6xl font-bold text-blue-300 rotate-45">AAK</div>
          <div className="absolute bottom-0 left-0 text-6xl font-bold text-blue-300 -rotate-45">FOUNDATION</div>
        </div>
      </div>

      {/* Instructions */}
      {!isPreview && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="font-bold text-gray-800 mb-6 text-xl flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">i</span>
            </div>
            ID Card Usage Instructions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Printer className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Printing Instructions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Print on A4 size paper</li>
                <li>• Use high-quality settings</li>
                <li>• Laminate for durability</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Verification Process</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Present card at foundation events</li>
                <li>• Required for volunteer activities</li>
                <li>• QR code for digital verification</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Emergency Contact</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Helpline: 99232 25066</li>
                <li>• 24/7 Support Available</li>
                <li>• Report lost cards immediately</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerCard;