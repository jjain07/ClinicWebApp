import React, { useState, useRef } from "react";

/**
 * Before/After image slider.
 * - Shows the BEFORE image by default.
 * - Drag the handle (or move the range slider) to reveal the AFTER image.
 */
const BeforeAfterSlider = ({ before, after, height = 400 }) => {
  // Start at 0 so the user first sees only the "before" image
  const [sliderPos, setSliderPos] = useState(0);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updateFromClientX = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    if (pct < 0) pct = 0;
    if (pct > 100) pct = 100;
    setSliderPos(pct);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    updateFromClientX(e.clientX);
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    updateFromClientX(e.clientX);
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    updateFromClientX(e.touches[0].clientX);
  };
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    updateFromClientX(e.touches[0].clientX);
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none rounded-lg shadow-lg bg-gray-100"
        style={{ height }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Before image (full) */}
        <img
          src={before}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {/* After image (revealed from the left as slider moves right) */}
        <img
          src={after}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
          draggable={false}
        />

        {/* Labels */}
        <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          Before
        </span>
        <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          After
        </span>

        {/* Divider line + handle */}
        <div
          className="absolute top-0 bottom-0"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-0.5 h-full bg-white shadow-md" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border-2 border-[#b8860b] flex items-center justify-center shadow-lg cursor-ew-resize">
            <span className="text-[#800000] font-bold text-sm">⇆</span>
          </div>
        </div>
      </div>

      {/* Range slider fallback / accessibility */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="w-full mt-3 accent-[#b8860b]"
        aria-label="Before after slider"
      />
    </div>
  );
};

export default BeforeAfterSlider;