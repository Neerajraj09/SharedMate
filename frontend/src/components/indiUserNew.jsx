import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { currUser } from "../contexts/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import { MdCheck, MdAdd } from "react-icons/md";

const IndiUser = ({ index, user, fullname, tripData, username }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [invited, setInvited] = useState(false);
  const { userInfo } = currUser();

  const avatarColors = [
    "#ccfbf1", // teal-100
    "#fef3c7", // amber-100
    "#dcfce7", // green-100
    "#e0f2fe", // sky-100
    "#f3e8ff", // purple-100
    "#ffedd5", // orange-100
    "#f1f5f9", // slate-100
  ];

  const avatarBgColor = avatarColors[index % avatarColors.length];
  const nameParts = fullname?.trim().split(" ") || ["U"];
  const initials = nameParts.length > 1 
    ? `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`
    : nameParts[0].charAt(0);

  const handleInvite = async () => {
    if (invited || isLoading) return;
    
    setIsLoading(true);
    try {
      await axiosInstance.post(`/api/notifications/invite`, {
        recipientId: user._id,
        tripId: tripData.TripId,
      });
      setInvited(true);
    } catch (err) {
      console.error("Invite failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-20 bg-white border border-slate-100 rounded-[24px] px-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 min-w-0">
        {/* User Avatar Squircle */}
        <div 
          className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-slate-700 font-black text-lg shadow-inner"
          style={{ backgroundColor: avatarBgColor }}
        >
          {initials.toUpperCase()}
        </div>

        {/* User Details */}
        <div className="flex flex-col min-w-0">
          <p className="text-slate-800 font-black text-[16px] leading-tight truncate">
            {fullname}
          </p>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-tight truncate">
            @{username}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="shrink-0 ml-4">
        <button
          onClick={handleInvite}
          disabled={invited || isLoading}
          className={`h-9 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-1.5 active:scale-95
            ${invited 
              ? "bg-teal-50 text-teal-600 border border-teal-100" 
              : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
            } ${isLoading ? "opacity-70" : ""}`}
        >
          {isLoading ? (
            <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
          ) : invited ? (
            <>
              <MdCheck size={14} />
              Sent
            </>
          ) : (
            <>
              <MdAdd size={14} />
              Invite
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default IndiUser;