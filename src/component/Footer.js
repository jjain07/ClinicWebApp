const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#5B1A13] text-[#FDF3C4]">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#b8860b] mb-3 sm:mb-4">Jyothi Dental Clinic</h3>
            <p className="text-xs sm:text-sm leading-relaxed">
              Providing world-class dental care with state-of-the-art technology and compassionate service to our community.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#b8860b] mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="/" className="hover:text-[#b8860b] transition">Home</a></li>
              <li><a href="/about" className="hover:text-[#b8860b] transition">About Us</a></li>
              <li><a href="/procedures" className="hover:text-[#b8860b] transition">Procedures</a></li>
              <li><a href="/contact" className="hover:text-[#b8860b] transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-[#b8860b] mb-3 sm:mb-4">Contact Us</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>📍 Jaipur, Rajasthan</li>
              <li>📞 +91 XXXXXXXXXX</li>
              <li>📧 info@jyothi-dental.com</li>
              <li>🕐 Mon - Sun: 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#b8860b] pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-center md:text-left">
            <p>
              &copy; {currentYear} Jyothi Dental Clinic. All rights reserved.
              {/* Admin access — intentionally low-visibility */}
              <a
                href="/admin"
                tabIndex={-1}
                aria-hidden="true"
                className="ml-2 text-[#5B1A13] hover:text-[#5B1A13] select-none"
                title=""
              >·</a>
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="hover:text-[#b8860b] transition">Privacy Policy</a>
              <a href="#" className="hover:text-[#b8860b] transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;