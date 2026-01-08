import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Loader, Award, MapPin, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

const MiniVolunteerCard = ({ volunteer }) => {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const downloadAsPNG = async () => {
    if (!cardRef.current) return;

    setDownloading(true);
    try {
      const cardElement = cardRef.current;
      const width = cardElement.offsetWidth;
      const height = cardElement.offsetHeight;
      const scale = Math.min(2, window.devicePixelRatio || 1);

      const canvas = await html2canvas(cardElement, {
        scale,
        width,
        height,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        removeContainer: false,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `id-card-${volunteer.aakNo || 'volunteer'}.png`;
      link.click();
      toast.success("ID Card downloaded successfully!");
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Failed to Download. Try Again!");
    } finally {
      setDownloading(false);
    }
  };

  const getImageUrl = () => {
    if (volunteer.imageUrl?.startsWith("data:image")) return volunteer.imageUrl;
    if (volunteer.imageUrl?.startsWith("http")) return volunteer.imageUrl;
    if (volunteer.imageUrl?.includes("uploads"))
      return `http://localhost:5000${volunteer.imageUrl}`;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff`;
  };

  // Format role for display
  const formatRole = (role) => {
    switch(role) {
      case 'president': return 'President';
      case 'vice-president': return 'Vice President';
      case 'member': return 'Member';
      default: return 'Member';
    }
  };

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'president': return '#DC2626'; // Red
      case 'vice-president': return '#2563EB'; // Blue
      default: return '#059669'; // Green
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <div>
          {volunteer.role && volunteer.role !== 'member' && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-white font-semibold text-sm mb-2"
              style={{ backgroundColor: getRoleBadgeColor(volunteer.role) }}>
              <Award className="w-3 h-3 mr-1" />
              {formatRole(volunteer.role)}
              {volunteer.area && (
                <span className="ml-2 text-xs opacity-90">• {volunteer.area}</span>
              )}
            </div>
          )}
        </div>
        <button
          onClick={downloadAsPNG}
          disabled={downloading}
          className="px-4 py-2 bg-[#2563EB] text-white font-semibold rounded-lg flex items-center gap-2 disabled:opacity-60 shadow-md hover:bg-[#1D4ED8]"
        >
          {downloading ? <Loader className="animate-spin" /> : <Download />}
          {downloading ? "Downloading..." : "Download ID Card"}
        </button>
      </div>

      {/* CARD */}
      <div
        ref={cardRef}
        style={{
          width: "400px",
          backgroundColor: "#ffffff",
          fontFamily: "Arial, sans-serif",
          border: "2px solid #D1D5DB",
          borderRadius: "8px",
          overflow: "hidden",
          color: "#111827",
          margin: "0 auto",
          position: "relative"
        }}
      >
        {/* Role Badge on Card */}
        {volunteer.role && volunteer.role !== 'member' && (
          <div style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: getRoleBadgeColor(volunteer.role),
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            zIndex: "10",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}>
            <Award style={{ width: "10px", height: "10px" }} />
            {formatRole(volunteer.role)}
          </div>
        )}

        {/* 🔶 HEADER */}
        <div
          style={{
            backgroundColor: "#F97316",
            color: "#ffffff",
            height: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 16px"
          }}
        >
          {/* LOGO */}
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <img
              src="/images/logo.jpg"
              crossOrigin="anonymous"
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML =
                  `<div style="font-size:10px;color:#4B5563;text-align:center;">LOGO</div>`;
              }}
            />
          </div>

          {/* ORGANIZATION NAME */}
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              whiteSpace: "normal",
              overflow: "visible",
              textOverflow: "clip",
              flex: 1,
              display: "flex",
              alignItems: "center",
              lineHeight: "1.1"
            }}
          >
            Soorveer Yuva Sangathan Trust
          </h2>
        </div>

        {/* DETAILS */}
        <div style={{ padding: "16px" }}>
          <div style={{ display: "flex", gap: "16px" }}>
            {/* PHOTO */}
            <div style={{ width: "33%" }}>
              <div
                style={{
                  border: "2px solid #9CA3AF",
                  borderRadius: "4px",
                  height: "160px",
                  overflow: "hidden"
                }}
              >
                <img
                  src={getImageUrl()}
                  alt={volunteer.name}
                  crossOrigin="anonymous"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            <div style={{ width: "67%" }}>
              {/* NAME */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ color: "#6B7280", fontSize: "14px" }}>NAME</div>
                <div style={{ fontSize: "20px", fontWeight: "700" }}>
                  {volunteer.name}
                </div>
              </div>

              {/* AAK NUMBER */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ color: "#6B7280", fontSize: "14px" }}>AAK NO.</div>
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
                  {volunteer.aakNo}
                </div>
              </div>

              {/* AREA */}
              {volunteer.area && (
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ color: "#6B7280", fontSize: "14px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin style={{ width: "12px", height: "12px" }} />
                    AREA
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "600", color: "#059669" }}>
                    {volunteer.area}
                  </div>
                </div>
              )}

              {/* MOBILE */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ color: "#6B7280", fontSize: "14px" }}>MOBILE</div>
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
                  +91 {volunteer.mobileNo}
                </div>
              </div>

              {/* ADDRESS */}
              <div>
                <div style={{ color: "#6B7280", fontSize: "14px" }}>ADDRESS</div>
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  {volunteer.address}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Section - Role and Join Date */}
          <div style={{ 
            marginTop: "16px", 
            paddingTop: "12px", 
            borderTop: "1px solid #E5E7EB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <div style={{ color: "#6B7280", fontSize: "12px" }}>JOIN DATE</div>
              <div style={{ fontSize: "14px", fontWeight: "600" }}>
                {new Date(volunteer.joinDate || volunteer.createdAt).toLocaleDateString('en-IN')}
              </div>
            </div>
            
            {volunteer.role && (
              <div>
                <div style={{ color: "#6B7280", fontSize: "12px", textAlign: "right" }}>POSITION</div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: getRoleBadgeColor(volunteer.role) }}>
                  {formatRole(volunteer.role)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default MiniVolunteerCard;