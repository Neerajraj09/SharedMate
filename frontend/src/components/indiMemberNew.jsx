import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MdPersonRemove, MdClose, MdCheck } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

const IndiMember = ({ index, member, tripData, user, getTripDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const avatarColors = ["#ccfbf1", "#fef3c7", "#dcfce7", "#e0f2fe", "#f3e8ff", "#ffedd5", "#f1f5f9"];
  const avatarBgColor = avatarColors[index % avatarColors.length];
  
  const nameParts = member._id.fullname.trim().split(" ");
  const initials = nameParts.length > 1 
    ? `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`
    : nameParts[0].charAt(0);

  const isSelf = member._id.email === user.email;
  const isAdmin = tripData.Admin === user._id;

  const handleRemove = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/api/trips/${tripData.TripId}/members/${member._id._id}`);
      getTripDetails();
    } catch (err) {
      console.error("Error removing member:", err);
    } finally {
      setIsLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden h-20 bg-white border border-slate-100 rounded-[24px] px-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* --- Main Content Section --- */}
      <div className="flex items-center gap-3 min-w-0">
        <div 
          className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-slate-700 font-black text-lg shadow-inner"
          style={{ backgroundColor: avatarBgColor }}
        >
          {initials.toUpperCase()}
        </div>

        <div className="flex flex-col min-w-0">
          <p className="text-slate-800 font-black text-[17px] leading-tight truncate">
            {member._id.fullname}
          </p>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-tight truncate">
            @{member._id.username}
          </p>
        </div>
      </div>

      {/* --- Action Section --- */}
      <div className="flex items-center gap-2">
        {isSelf && (
          <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-100">
            You
          </span>
        )}

        {!isSelf && isAdmin && (
          <button
            onClick={() => setShowConfirm(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95"
          >
            <MdPersonRemove size={20} />
          </button>
        )}
      </div>

      {/* --- Inline Confirmation Overlay --- */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="absolute inset-0 bg-slate-900 flex items-center justify-between px-6 z-10"
          >
            <div className="flex flex-col">
                <p className="text-white font-black text-sm tracking-tight leading-none">Remove Member?</p>
                <p className="text-slate-400 text-[10px] font-bold uppercase mt-1 tracking-widest">This cannot be undone</p>
            </div>
            
            <div className="flex gap-2">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center hover:text-white"
                >
                    <MdClose size={20} />
                </button>
                <button 
                  onClick={handleRemove}
                  disabled={isLoading}
                  className="h-10 px-4 rounded-xl bg-red-500 text-white font-black text-xs uppercase flex items-center gap-2 shadow-lg shadow-red-900/20 active:scale-95 disabled:opacity-50"
                >
                    {isLoading ? "..." : <><MdCheck size={18} /> Confirm</>}
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IndiMember;