import React, { useState, useEffect, useRef } from "react";

const heroItems = [
  {
    icon: (
      <span className="text-3xl mb-2 inline-block">
        {/* Example: Medical Cross Icon */}
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M13 11V7h-2v4H7v2h4v4h2v-4h4v-2h-4Z"/></svg>
      </span>
    ),
    title: "VISION",
    desc: "Establishing a quality dental care facility across the globe, equipped with state of the art digital technology",
  },
  {
    icon: (
      <span className="text-3xl mb-2 inline-block">
        {/* Example: Mission Icon */}
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff"/><path d="M12 8v4l3 2" stroke="#5B1A13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    ),
    title: "MISSION",
    desc: "We believe your smile is one of your most important assets and says a lot about your overall health.",
  },
  {
    icon: (
      <span className="text-3xl mb-2 inline-block">
        {/* Example: Technology Icon */}
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="#fff"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="#5B1A13" strokeWidth="2" strokeLinecap="round"/></svg>
      </span>
    ),
    title: "TECHNOLOGY",
    desc: "Equipped with modern machinery to provide our patients with best solutions under best care.",
  },
  {
    icon: (
      <span className="text-3xl mb-2 inline-block">
        {/* Example: Handshake Icon */}
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M8 12l-4 4m0 0l4 4m-4-4h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    ),
    title: "OUR FORTE",
    desc: "We provide a warm environment to ensure our patients have painless and comfortable treatment.",
  },
];
// Add your banner images here (update the paths as needed)
const bannerImages = [
  "/images/banner-1.jpg",
  "/images/banner-2.jpg",
  "/images/banner-3.jpg",
  "/images/banner-4.jpg",
];
const HeroSection = () => {
     const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  // Auto-slide every 5 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  // Manual navigation
  const goTo = (idx) => {
    setCurrent(idx);
    clearTimeout(timeoutRef.current);
  };


   return (
     <section className="relative bg-[#b8860b] pt-6 md:pt-0">
    {/* Banner */}
    <div className="relative w-full flex items-center justify-center overflow-hidden" style={{height: "340px"}}>
      {/* <img
        src={bannerUrl}
        alt="Clinic Banner"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{objectFit: "cover", objectPosition: "center"}}
      /> */}
      {bannerImages.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt={`Clinic Banner ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${idx === current ? "opacity-100 z-0" : "opacity-0 z-0"}`}
            draggable={false}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        ))}
      <div className="relative z-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold uppercase text-white drop-shadow-lg tracking-wide">
          WORLD OF DENTISTRY
        </h1>
        <p className="text-white mt-2 text-lg drop-shadow">
          Establishing a quality dental care facility equipped with state-of-the-art digital technology
        </p>
      </div>
      <div className="absolute inset-0 bg-[#b8860b]/20" />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4 z-20">
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border border-white ${current === idx ? "bg-white" : "bg-transparent"}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
    </div>
    {/* Overlapping Hero Items */}
    <div className="absolute left-1/2 -bottom-40 -translate-x-1/2 w-full max-w-6xl px-4 z-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {heroItems.map((item, idx) => (
          <div
            key={idx}
              className="flex flex-col items-center text-center bg-[#800000] text-[#fff8f0] p-6 rounded-lg shadow-xl border-4 border-white"
          >
            {item.icon}
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
    {/* Spacer for overlap */}
    <div className="h-0" />
  </section>
 
)
};

export default HeroSection;