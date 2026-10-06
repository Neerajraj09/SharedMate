import React from "react";

const NetworkMap = () => {
  return (
    <div className="relative w-full h-[75vh] bg-[#f6fff8] overflow-hidden flex items-center justify-center">
      {/* SVG Paths */}
      <svg className="absolute w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        {/* Top Curves */}
        <path d="M150 100 Q400 150 400 300" stroke="#aaa" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M275 60 Q400 130 400 300" stroke="#aaa" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M400 40 Q400 120 400 300" stroke="#aaa" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M525 60 Q400 130 400 300" stroke="#aaa" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M650 100 Q400 150 400 300" stroke="#aaa" strokeWidth="1.2" fill="none" opacity="0.5" />

        {/* Side Lines */}
        <path d="M100 300 Q250 300 400 300" stroke="#aaa" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M700 300 Q550 300 400 300" stroke="#aaa" strokeWidth="1.2" fill="none" opacity="0.5" />

        {/* Bottom Curves */}
        <path d="M150 500 Q400 450 400 300" stroke="#aaa" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M275 540 Q400 470 400 300" stroke="#aaa" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M400 560 Q400 480 400 300" stroke="#aaa" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M525 540 Q400 470 400 300" stroke="#aaa" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M650 500 Q400 450 400 300" stroke="#aaa" strokeWidth="1.2" fill="none" opacity="0.5" />
      </svg>

      {/* Center Node */}
      <div className="absolute w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center z-10">
        <img src="/your-logo.svg" alt="Center" className="w-12 h-12" />
      </div>

      {/* User Icons (Top Side) */}
      <img src="/person.svg" className="absolute top-[85px] left-[120px] w-8 h-8" alt="user" />
      <img src="/person.svg" className="absolute top-[45px] left-[265px] w-8 h-8" alt="user" />
      <img src="/person.svg" className="absolute top-[25px] left-[calc(50%-16px)] w-8 h-8" alt="user" />
      <img src="/person.svg" className="absolute top-[45px] right-[265px] w-8 h-8" alt="user" />
      <img src="/person.svg" className="absolute top-[85px] right-[120px] w-8 h-8" alt="user" />

      {/* User Icons (Middle Left & Right) */}
      <img src="/person.svg" className="absolute top-[calc(50%-16px)] left-[55px] w-8 h-8" alt="user" />
      <img src="/person.svg" className="absolute top-[calc(50%-16px)] right-[55px] w-8 h-8" alt="user" />

      {/* User Icons (Bottom Side) */}
      <img src="/person.svg" className="absolute bottom-[85px] left-[120px] w-8 h-8" alt="user" />
      <img src="/person.svg" className="absolute bottom-[45px] left-[265px] w-8 h-8" alt="user" />
      <img src="/person.svg" className="absolute bottom-[25px] left-[calc(50%-16px)] w-8 h-8" alt="user" />
      <img src="/person.svg" className="absolute bottom-[45px] right-[265px] w-8 h-8" alt="user" />
      <img src="/person.svg" className="absolute bottom-[85px] right-[120px] w-8 h-8" alt="user" />
    </div>
  );
};

export default NetworkMap;
