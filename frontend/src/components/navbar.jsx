import React, { useEffect, useState, useRef } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5"; // Cleaner version
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import ProfileInfo from "../cards/profileInfo";
import ProfileCard from "./profileCard";
import Notifications from "./notificationsNew";
import logo from '../assets/onlylogo.png';

import { currUser } from "../contexts/UserContext";
import { useNotifications } from "../contexts/NotificationContext";

const Navbar = ({ back }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { userInfo, isUserLoading, getUser } = currUser();
  const { notificationCount, fetchNotifications } = useNotifications();

  useEffect(() => {
    getUser();
    fetchNotifications();
  }, []);

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleBack = () => back ? back() : navigate(-1);
  const handleLogoClick = () => navigate("/dashboard");

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 z-[100] px-4">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          
          {/* Left: Back & Logo */}
          <div className="flex items-center gap-2">
            {back && (
              <button 
                onClick={handleBack}
                className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
              >
                <IoChevronBackOutline size={28} />
              </button>
            )}
            <motion.img
              whileTap={{ scale: 0.9 }}
              className="h-9 w-9 cursor-pointer object-contain"
              src={logo}
              alt="Logo"
              onClick={handleLogoClick}
            />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {isUserLoading ? (
              <div className="h-10 w-10 rounded-2xl bg-slate-100 animate-pulse" />
            ) : userInfo ? (
              <>
                {/* Notification Bell */}
                <div className="relative cursor-pointer group" onClick={() => setShowNotifications(!showNotifications)}>
                  <div className="p-2 group-hover:bg-slate-50 rounded-2xl transition-colors">
                    <IoNotificationsOutline size={26} className="text-slate-600" />
                  </div>
                  <AnimatePresence>
                    {notificationCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-black h-4 min-w-[16px] flex items-center justify-center px-1 rounded-full border-2 border-white shadow-sm"
                      >
                        {notificationCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Help Button */}
                <button 
                  onClick={() => navigate("/help")}
                  className="p-2 hover:bg-slate-100 rounded-2xl text-slate-600 transition-colors"
                >
                  Help
                </button>

                {/* Profile Toggle */}
                <ProfileInfo 
                  userInfo={userInfo} 
                  onLogout={onLogout} 
                  handleProfile={() => setShowProfile(!showProfile)} 
                />
              </>
            ) : (
              <button 
                onClick={onLogout} 
                className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Spacing div to prevent content from hiding under the fixed navbar */}
      <div className="h-16" />

      {/* Modals/Dropdowns */}
      <AnimatePresence>
        {showProfile && (
          <ProfileCard 
            handleProfile={() => setShowProfile(false)} 
            onLogout={onLogout} 
            userInfo={userInfo} 
            getUserInfo={getUser} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNotifications && (
          <Notifications 
            handleBell={() => setShowNotifications(false)} 
            userInfo={userInfo} 
            getUserInfo={getUser}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;