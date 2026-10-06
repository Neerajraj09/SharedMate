import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { motion } from 'framer-motion';

const NotificationCard = ({ userInfo, info, getUserInfo }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formattedDate = new Date(info.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const onAdd = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.post(`/api/trips/${info.trip._id}/members`, {
        userId: userInfo._id,
      });
      await axiosInstance.delete(`/api/notifications/${info._id}`);
      getUserInfo(); 
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onReject = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/api/notifications/${info._id}`);
      getUserInfo(); 
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const senderInitial = info.sender.username?.charAt(0).toUpperCase() || "U";

  return (
    <div className="w-full bg-white border border-slate-100 rounded-[22px] p-4 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-24 w-full gap-2">
          <div className="w-6 h-6 border-2 border-slate-200 border-t-teal-500 rounded-full animate-spin" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Processing...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            {/* Sender Avatar */}
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 font-bold">
              {senderInitial}
            </div>

            {/* Notification Text */}
            <div className="flex flex-col min-w-0">
              <p className="text-sm text-slate-600 leading-snug">
                <span className="font-black text-slate-800">@{info.sender.username}</span>
                {" invited you to join "}
                <span className="font-black text-teal-600 italic">"{info.trip.tripname}"</span>
              </p>
              <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase">
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              className="flex-1 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold text-xs transition-all active:scale-95"
              onClick={onReject}
            >
              Decline
            </button>
            <button
              className="flex-1 h-10 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs shadow-lg shadow-teal-100 transition-all active:scale-95"
              onClick={onAdd}
            >
              Accept Invite
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;