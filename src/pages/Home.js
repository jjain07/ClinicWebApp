import { Helmet } from 'react-helmet-async';
const Home = () => {
  return (
    <>
    <Helmet>
        <title>Jyothi Dental Clinic - Expert Facial Surgery & Dental Care</title>
        <meta name="description" content="Jyothi Dental Clinic offers world-class dental care including dental implants, jaw surgery, and clear aligners with state-of-the-art technology." />
        <meta name="keywords" content="dental clinic, dental implants, jaw surgery, clear aligners, facial surgery, dental care" />
        <meta name="author" content="Jyothi Dental Clinic" />
        <meta property="og:title" content="Jyothi Dental Clinic - Expert Facial Surgery & Dental Care" />
        <meta property="og:description" content="Transform your smile with our expert dental professionals. Dental implants, jaw surgery, and clear aligners." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jyothidental.com/" />
      </Helmet>

    <div className="bg-gradient-to-b from-[#FDF3C4] to-[#fff8f0] min-h-screen">
      <div className="h-20 md:h-40" />
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#800000] mb-3 md:mb-4 leading-tight">
            Welcome to <span className="text-[#b8860b]">Jyothi Dental Clinic </span>- Expert Facial Surgery & Dental Care
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-[#5B1A13] font-semibold mb-2">
            Facial Surgery Speciality Clinic
          </p>
          <p className="text-base sm:text-lg text-[#5B1A13] max-w-2xl mx-auto px-2">
            Providing world-class dental care with state-of-the-art technology and compassionate service
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 mb-12 md:mb-16">
          <div className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border-l-4 border-[#b8860b]">
            <div className="mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FDF3C4] rounded-full flex items-center justify-center mx-auto group-hover:bg-[#b8860b] transition">
                <span className="text-2xl sm:text-3xl">🦷</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[#800000] group-hover:text-[#b8860b] transition">
              Dental Implants
            </h3>
            <p className="text-sm sm:text-base text-[#5B1A13] leading-relaxed">
              Permanent solutions for missing teeth with expert precision and care. Restore your smile with our advanced implant technology.
            </p>
          </div>

          <div className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border-l-4 border-[#b8860b]">
            <div className="mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FDF3C4] rounded-full flex items-center justify-center mx-auto group-hover:bg-[#b8860b] transition">
                <span className="text-2xl sm:text-3xl">👄</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[#800000] group-hover:text-[#b8860b] transition">
              Jaw Surgery
            </h3>
            <p className="text-sm sm:text-base text-[#5B1A13] leading-relaxed">
              Expert correction of jaw irregularities to restore function, facial harmony, and boost your confidence with precision care.
            </p>
          </div>

          <div className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border-l-4 border-[#b8860b]">
            <div className="mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FDF3C4] rounded-full flex items-center justify-center mx-auto group-hover:bg-[#b8860b] transition">
                <span className="text-2xl sm:text-3xl">✨</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[#800000] group-hover:text-[#b8860b] transition">
              Clear Aligners
            </h3>
            <p className="text-sm sm:text-base text-[#5B1A13] leading-relaxed">
              Discreet and comfortable teeth straightening using advanced clear aligner technology for all ages and smile goals.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#800000] rounded-3xl p-8 sm:p-12 text-center mb-12 md:mb-16 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 md:mb-4">Ready for Your Smile Transformation?</h2>
          <p className="text-[#FDF3C4] text-base sm:text-lg mb-6 px-2">
            Schedule your consultation with our expert dental professionals today
          </p>
          <button className="bg-[#b8860b] hover:bg-[#a07609] text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 shadow-md text-sm sm:text-base">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;