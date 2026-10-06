import { SiPhonepe, SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { currUser } from "../contexts/UserContext";

const IndiSuggetion = ({ suggestion, index }) => {
  const { userInfo } = currUser();

  const avatarColors = ["#ccfbf1", "#fef3c7", "#dcfce7", "#e0f2fe", "#f3e8ff", "#ffedd5", "#f1f5f9"];

  const { from, to, amount } = suggestion;
  const isPayer = userInfo?.username === from.username;

  const handlePay = () => {
    if (!to.upiId || amount <= 0) {
      alert("UPI ID or Amount is missing.");
      return;
    }
    // Deep link for UPI
    const url = `upi://pay?pa=${to.upiId}&pn=${encodeURIComponent(to.fullname)}&am=${amount}&cu=INR&tn=SharedMateSettle`;
    window.location.href = url;
  };

  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    return parts.length > 1 
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  };

  return (
    <div className="w-full bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm mb-4">
      <div className="flex items-center justify-between gap-2">
        
        {/* Payer (From) */}
        <div className="flex flex-col items-center gap-2 w-1/3">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-700 font-black text-lg shadow-inner"
            style={{ backgroundColor: avatarColors[index % avatarColors.length] }}
          >
            {getInitials(from.fullname)}
          </div>
          <div className="text-center min-w-0 w-full">
            <p className="text-slate-800 font-black text-sm truncate leading-none">{from.fullname.split(" ")[0]}</p>
            <p className="text-slate-400 font-bold text-[10px] uppercase truncate">@{from.username}</p>
          </div>
        </div>

        {/* Transaction Info (Middle) */}
        <div className="flex flex-col items-center flex-1">
          <span className="text-teal-600 font-black text-lg tracking-tighter">
            ₹{amount.toFixed(2)}
          </span>
          <div className="flex items-center w-full gap-1">
             <div className="h-[2px] flex-1 bg-slate-100 rounded-full"></div>
             <HiArrowLongRight className="text-slate-200" size={20} />
             <div className="h-[2px] flex-1 bg-slate-100 rounded-full"></div>
          </div>
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1">Settle up</span>
        </div>

        {/* Receiver (To) */}
        <div className="flex flex-col items-center gap-2 w-1/3">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-700 font-black text-lg shadow-inner"
            style={{ backgroundColor: avatarColors[(index + 1) % avatarColors.length] }}
          >
            {getInitials(to.fullname)}
          </div>
          <div className="text-center min-w-0 w-full">
            <p className="text-slate-800 font-black text-sm truncate leading-none">{to.fullname.split(" ")[0]}</p>
            <p className="text-slate-400 font-bold text-[10px] uppercase truncate">@{to.username}</p>
          </div>
        </div>
      </div>

      {/* UPI Button Section */}
      <div className="mt-5">
        <button
          onClick={handlePay}
          disabled={!isPayer}
          className={`w-full h-12 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-95
            ${isPayer 
              ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
              : "bg-slate-50 text-slate-300 cursor-not-allowed"}`}
        >
          <span className="font-black text-xs uppercase tracking-widest">
            {isPayer ? "Pay via UPI" : "Only Payer can pay"}
          </span>
          {isPayer && (
            <div className="flex items-center gap-2 border-l border-white/20 pl-3">
              <SiPhonepe size={16} />
              <SiPaytm size={24} />
              <FaGooglePay size={24} />
            </div>
          )}
        </button>
        {isPayer && !to.upiId && (
          <p className="text-[9px] text-red-400 font-bold text-center mt-2 uppercase tracking-tight">
            Receiver has not added a UPI ID yet
          </p>
        )}
      </div>
    </div>
  );
};

export default IndiSuggetion;