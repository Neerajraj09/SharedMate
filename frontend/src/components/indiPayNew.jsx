import { useEffect } from "react";

const IndiPay = ({ index, payment }) => {
  const avatarColors = [
    "#ccfbf1", // teal-100
    "#fef3c7", // amber-100
    "#dcfce7", // green-100
    "#e0f2fe", // sky-100
    "#f3e8ff", // purple-100
    "#ffedd5", // orange-100
    "#fae8ff", // fuchsia-100
    "#f1f5f9", // slate-100
  ];

  const avatarBgColor = avatarColors[index % avatarColors.length];
  const nameParts = payment?.paidBy?.fullname?.trim().split(" ") || ["U"];
  
  const initials = nameParts.length > 1 
    ? `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`
    : nameParts[0].charAt(0);

  const formattedDate = new Date(payment?.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="w-full bg-white border border-slate-100 rounded-[24px] p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between">
        
        {/* Left Section: User and Info */}
        <div className="flex items-center gap-3 min-w-0">
          {/* User Avatar */}
          <div 
            className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-slate-700 font-black text-lg shadow-inner"
            style={{ backgroundColor: avatarBgColor }}
          >
            {initials.toUpperCase()}
          </div>

          <div className="flex flex-col min-w-0">
            <p className="text-slate-800 font-black text-[17px] leading-tight truncate">
              {payment?.description || "Expense"}
            </p>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-tight mt-0.5">
              Paid by {payment?.paidBy?.fullname?.split(" ")[0]} • @{payment?.paidBy?.username}
            </p>
          </div>
        </div>

        {/* Right Section: Amount */}
        <div className="flex flex-col items-end shrink-0 ml-2">
          <span className="text-teal-600 font-black text-xl tracking-tighter">
            ₹{payment?.amount}
          </span>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">
            Success
          </span>
        </div>
      </div>

      {/* Bottom Section: Meta Data */}
      <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">
            Settled
          </p>
        </div>
        <p className="text-[11px] font-bold text-slate-300">
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default IndiPay;