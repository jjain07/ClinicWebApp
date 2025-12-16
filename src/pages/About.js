import DoctorCards from "../component/DoctorCards";

const About = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#FDF3C4] to-[#fff8f0] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="h-20 md:h-40" />
          
          {/* About Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#800000] mb-3 md:mb-4">
              About <span className="text-[#b8860b]">Our Clinic</span>
            </h1>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#b8860b] mx-auto mb-6"></div>
            <p className="text-base sm:text-lg text-[#5B1A13] max-w-3xl mx-auto leading-relaxed px-2">
              Welcome to Jyothi Dental Clinic! We are dedicated to providing the highest quality dental care 
              in a comfortable and friendly environment. Our team of experienced professionals is here to ensure 
              your dental health and well-being.
            </p>
          </div>

          {/* About Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#800000] mb-4">Our Mission</h2>
              <p className="text-sm sm:text-base text-[#5B1A13] leading-relaxed">
                At Jyothi Dental Clinic, we offer a wide range of services including general dentistry, 
                cosmetic dentistry, orthodontics, and surgical procedures. Our state-of-the-art facilities 
                and advanced technology allow us to deliver exceptional care tailored to your individual needs.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#800000] mb-4">Our Vision</h2>
              <p className="text-sm sm:text-base text-[#5B1A13] leading-relaxed">
                Establishing a quality dental care facility across the globe, equipped with state-of-the-art 
                digital technology. We believe your smile is one of your most important assets and says a lot 
                about your overall health and confidence.
              </p>
            </div>
          </div>

          {/* Specialists Section */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#800000] mb-3 md:mb-4">
              Meet Our <span className="text-[#b8860b]">Specialists</span>
            </h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#b8860b] mx-auto mb-8 md:mb-12"></div>
            <DoctorCards />
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
            <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
              <div className="text-3xl sm:text-4xl mb-3">🏥</div>
              <h3 className="text-lg sm:text-xl font-bold text-[#800000] mb-2">Modern Facilities</h3>
              <p className="text-sm sm:text-base text-[#5B1A13]">State-of-the-art technology and equipment</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
              <div className="text-3xl sm:text-4xl mb-3">👨‍⚕️</div>
              <h3 className="text-lg sm:text-xl font-bold text-[#800000] mb-2">Expert Team</h3>
              <p className="text-sm sm:text-base text-[#5B1A13]">Highly qualified dental professionals</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition sm:col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl mb-3">💙</div>
              <h3 className="text-lg sm:text-xl font-bold text-[#800000] mb-2">Patient Care</h3>
              <p className="text-sm sm:text-base text-[#5B1A13]">Comfortable and compassionate service</p>
            </div>
          </div>

          <div className="h-20 md:h-32" />
        </div>
      </div>
    </>
  );
};

export default About;