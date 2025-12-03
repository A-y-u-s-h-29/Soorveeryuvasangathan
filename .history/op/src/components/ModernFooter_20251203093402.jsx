import React from "react";
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const ModernFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-[#50C779] mr-3" />
              <div>
                <h2 className="text-2xl font-bold exo">Soorveer Yuva</h2>
                <p className="text-gray-400 text-sm">Sangathan Trust</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering underprivileged children and youth through education, 
              nutrition, and shelter since 2008.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#50C779]">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                <span className="text-sm">New Delhi, India</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-gray-400" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-gray-400" />
                <span className="text-sm">contact@soorveeryuva.org</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#50C779]">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg outline-none text-sm"
              />
              <button className="bg-[#50C779] hover:bg-[#3EAE66] px-4 py-2 rounded-r-lg text-sm font-medium transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="text-gray-400 hover:text-[#50C779] transition">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#50C779] transition">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#50C779] transition">
            <Instagram className="h-5 w-5" />
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Soorveer Yuva Sangathan Trust
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</a>
            <a href="/terms" className="text-gray-400 hover:text-white transition">Terms</a>
            <a href="/contact" className="text-gray-400 hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;