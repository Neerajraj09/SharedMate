import React from 'react';

const IndiSpend = ({ index, member }) => {
  const avatarColors = ["#A7D2CB", "#F2B5D4", "#F7D9C4", "#C3FBD8", "#B5C0D0", "#FFF4B1", "#D7E3FC", "#FFDDD2", "#E0BBE4", "#BEE1E6"];
  const avatarBgColor = avatarColors[index % avatarColors.length];

  const fullname = member._id?.fullname || "Unknown User";
  const username = member._id?.username || "user";
  const totalSpend = member.totalSpend || 0;
  
  const initials = fullname.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    /* Ensure this is a relative/flex block. NO absolute or fixed classes here. */
    <div className="flex w-full min-h-[82px] px-4 items-center justify-between rounded-[24px] bg-white border border-slate-100 shadow-sm transition-all hover:border-teal-100 active:scale-[0.98]">
      
      <div className="flex items-center gap-3 min-w-0"> 
        <div 
          className="flex-shrink-0 flex items-center justify-center w-[54px] h-[54px] rounded-2xl"
          style={{ backgroundColor: avatarBgColor }}
        >
          <span className="text-[18px] font-black text-slate-700 font-nunito">
            {initials}
          </span>
        </div>

        <div className="flex flex-col min-w-0 text-left"> 
          <h3 className="text-[17px] font-black font-nunito text-slate-800 leading-tight truncate">
            {fullname}
          </h3>
          <p className="text-[13px] font-bold font-nunito text-slate-400 mt-0.5">
            @{username}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end flex-shrink-0 ml-4">
        <div className="flex items-center gap-0.5 text-teal-600">
          <span className="text-[13px] font-black">₹</span>
          <span className="text-[20px] font-black font-nunito leading-none">
            {totalSpend}
          </span>
        </div>
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">
          Total Spent
        </span>
      </div>
    </div>
  );
};

export default IndiSpend;