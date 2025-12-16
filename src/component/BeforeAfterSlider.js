import React, { useState } from "react";

const BeforeAfterSlider = ({ before, after }) => {

   const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative w-full max-w-xl overflow-hidden">
      <img src={before} alt="Before" className="w-full absolute top-0 left-0" />
      <img
        src={after}
        alt="After"
        className="w-full absolute top-0 left-0"
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(e.target.value)}
        className="w-full relative z-10 mt-2"
      />
    </div>
  );
}
export default BeforeAfterSlider;