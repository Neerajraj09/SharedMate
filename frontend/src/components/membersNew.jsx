import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoPersonAddSharp } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";

import Navbar from "./navbar";
import IndiMember from "./indiMemberNew";
import AddMembers from "./addMembersNew";
import axiosInstance from "../../utils/axiosInstance";
import TripDetailsSkeleton from "./tripDetailsSkeleton";
import IndiMemberSkeleton from "./indiMemberSkeleton";
import { currUser } from "../contexts/UserContext";

const Members = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = currUser();

  const [isLoading, setIsLoading] = useState(false);
  const [tripDetails, setTripDetails] = useState(null);
  const [showUserModal, setShowUsersModal] = useState(false);

  const { tripData } = location.state || {};

  const back = () => navigate(-1);
  const handleUsers = () => setShowUsersModal(!showUserModal);

  const getTripDetails = async () => {
    if (!tripData?.TripId) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/trips/${tripData.TripId}`);
      setTripDetails(response.data);
    } catch (err) {
      console.error("Failed to fetch members:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTripDetails();
  }, [tripData]);

  const formattedDate = new Date(tripDetails?.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-nunito flex flex-col">
      <Navbar back={back} />

      {/* --- Sticky Header --- */}
      <header className="fixed top-[64px] left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="w-12 h-12 bg-slate-200 animate-pulse rounded-2xl" />
            ) : (
              <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-teal-100">
                {tripDetails?.tripname?.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <h1 className="text-lg font-black text-slate-800 leading-tight truncate">
                {isLoading ? "Loading..." : tripDetails?.tripname}
              </h1>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Members • {formattedDate}
              </p>
            </div>
          </div>

          <button 
            onClick={() => navigate("/aboutUs")}
            className="flex flex-col items-center gap-1 p-2 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <FcAbout size={22} />
            <span className="text-[10px] font-black text-slate-400 uppercase">About</span>
          </button>
        </div>
      </header>

      {/* --- Members List --- */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 pt-24 pb-32">
        <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">
          In this trip ({tripDetails?.members.length || 0})
        </h2>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => <IndiMemberSkeleton key={i} />)}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {tripDetails?.members.length > 0 ? (
              tripDetails.members.map((member, index) => (
                <motion.div
                  key={member._id._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <IndiMember
                    index={index + 1}
                    member={member}
                    tripData={tripData}
                    user={userInfo}
                    getTripDetails={getTripDetails}
                  />
                </motion.div>
              ))
            ) : (
              <p className="text-center text-slate-400 mt-20 font-medium italic">
                Wait, no members here?
              </p>
            )}
          </div>
        )}
      </main>

      {/* --- Bottom Action Bar --- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 pt-3 pb-8 z-30 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
        <div className="max-w-2xl mx-auto flex justify-center items-center">
          <div className="flex flex-col items-center">
            <button 
              onClick={handleUsers}
              className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform border-4 border-white"
            >
              <IoPersonAddSharp size={28} />
            </button>
            <span className="text-[10px] font-black text-slate-900 mt-1.5 uppercase tracking-tighter">Add Member</span>
          </div>
        </div>
      </nav>

      {/* --- Unified Modal Container --- */}
      <AnimatePresence>
        {showUserModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={handleUsers} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 50, opacity: 0 }} 
              className="relative w-full max-w-lg"
            >
              <AddMembers handleUsers={handleUsers} tripData={tripData} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Members;