// // import { Link } from "lucide-react";
// import { Link } from 'react-router-dom';
// // Header.jsx
//   const Header = () => {
//     return (
//     <>

    
//   {/* <header className="bg-[#FDF3C4] shadow p-4 flex justify-between items-center"> */}
//           <header className="bg-[#FDF3C4] shadow-md sticky top-0 z-50">

//         <div className="bg-[#FDF3C4]  py-2 px-4 flex flex-col md:flex-row md:justify-between items-center">

//     {/* <div className="container mx-auto px-4"> */}
//                 <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center gap-2">

//     <div className="flex items-center gap-4">
//       <img src="../logo.png" alt="Jyothi Dental Clinic" className="max-h-20 w-auto" />
//             <h1 className="text-[#5B1A13] font-serif text-2xl font-extrabold uppercase tracking-wider hidden sm:block drop-shadow">
//         Jyothi Dental Clinic
//       </h1>
//     </div>
//           <nav className="flex flex-wrap justify-center md:justify-end gap-4 mt-2 md:mt-0">
//        <Link
//               to="/"
//               className="text-[#5B1A13] font-serif text-lg font-semibold px-4 py-2 rounded hover:bg-[#f5e3b3] transition"
//             >
//               Home
//             </Link>
//  <Link
//               to="/about"
//               className="text-[#5B1A13] font-serif text-lg font-semibold px-4 py-2 rounded hover:bg-[#f5e3b3] transition"
//             >
//               About
//             </Link>    
//              <Link
//               to="/procedures"
//               className="text-[#5B1A13] font-serif text-lg font-semibold px-4 py-2 rounded hover:bg-[#f5e3b3] transition"
//             >
//               Procedures
//             </Link>
//             <Link
//               to="/gallery"
//               className="text-[#5B1A13] font-serif text-lg font-semibold px-4 py-2 rounded hover:bg-[#f5e3b3] transition"
//             >
//               Gallery
//             </Link>
//             <Link   
//               to="/contact"
//               className="text-[#5B1A13] font-serif text-lg font-semibold px-4 py-2 rounded hover:bg-[#f5e3b3] transition"
//             >
//               Contact
//             </Link>
//     </nav>
//   </div>
//   </div>
//    </header>
//   </>)
//   };


// export default Header;

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="bg-[#FDF3C4] shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Header Top Row - Logo and Menu Button */}
          <div className="py-3 flex justify-between items-center">
            {/* Logo and Title */}
            <Link to="/" className="flex items-center gap-2 sm:gap-4 hover:opacity-80 transition">
              <img src="../logo.png" alt="Jyothi Dental Clinic" className="max-h-16 sm:max-h-20 w-auto" />
              <h1 className="text-[#5B1A13] font-serif text-lg sm:text-2xl font-extrabold uppercase tracking-wider hidden sm:block drop-shadow">
                Jyothi Dental Clinic
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-wrap justify-end gap-2 lg:gap-4">
              <Link
                to="/"
                className="text-[#5B1A13] font-serif text-sm lg:text-lg font-semibold px-3 lg:px-4 py-2 rounded hover:bg-[#f5e3b3] transition"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-[#5B1A13] font-serif text-sm lg:text-lg font-semibold px-3 lg:px-4 py-2 rounded hover:bg-[#f5e3b3] transition"
              >
                About
              </Link>
              <Link
                to="/procedures"
                className="text-[#5B1A13] font-serif text-sm lg:text-lg font-semibold px-3 lg:px-4 py-2 rounded hover:bg-[#f5e3b3] transition"
              >
                Procedures
              </Link>
              <Link
                to="/gallery"
                className="text-[#5B1A13] font-serif text-sm lg:text-lg font-semibold px-3 lg:px-4 py-2 rounded hover:bg-[#f5e3b3] transition"
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className="text-[#5B1A13] font-serif text-sm lg:text-lg font-semibold px-3 lg:px-4 py-2 rounded hover:bg-[#f5e3b3] transition"
              >
                Contact
              </Link>
            </nav>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded hover:bg-[#f5e3b3] transition"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-[#5B1A13]" />
              ) : (
                <Menu className="w-6 h-6 text-[#5B1A13]" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu - Inside Header */}
          {isOpen && (
            <nav className="md:hidden bg-[#fff8f0] border-t-2 border-[#b8860b] pb-4">
              <Link
                to="/"
                className="block text-[#5B1A13] font-serif text-lg font-semibold px-4 py-3 rounded hover:bg-[#f5e3b3] transition"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-[#5B1A13] font-serif text-lg font-semibold px-4 py-3 rounded hover:bg-[#f5e3b3] transition"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/procedures"
                className="block text-[#5B1A13] font-serif text-lg font-semibold px-4 py-3 rounded hover:bg-[#f5e3b3] transition"
                onClick={() => setIsOpen(false)}
              >
                Procedures
              </Link>
              <Link
                to="/gallery"
                className="block text-[#5B1A13] font-serif text-lg font-semibold px-4 py-3 rounded hover:bg-[#f5e3b3] transition"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className="block text-[#5B1A13] font-serif text-lg font-semibold px-4 py-3 rounded hover:bg-[#f5e3b3] transition"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;