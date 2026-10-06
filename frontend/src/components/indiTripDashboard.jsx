import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GrGroup } from "react-icons/gr";
import { GoHistory } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineTipsAndUpdates, MdDeleteOutline } from "react-icons/md";
import { FcAbout } from "react-icons/fc";

import Navbar from "./navbar";
import IndiSpend from "./indiSpendNew";
import axiosInstance from "../../utils/axiosInstance";
import AddSpend from "./addSpendNew";
import EndTrip from "./endTripNew";
import DeleteTripAdmin from "./deleteTripAdmin";
import { currUser } from "../contexts/UserContext";

const IndiTripDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [currTrip, setCurrTrip] = useState(null);
  const [members, setMembers] = useState([]);
  const [showAddSpend, setShowAddSpend] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [adminDelete, setAdminDelete] = useState(false);
  
  const { userInfo } = currUser();
  const { tripData } = location.state || {};

  // Fetch Trip Data
  const getTrip = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/trips/${tripData.TripId}`);
      setCurrTrip(response.data);
      setMembers(response.data.members || []);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Restored: Delete Trip Function
  const handleDeleteAdmin = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/api/trips/${currTrip._id}`);
      navigate("/tripsDashboard");
      // Optional: if you use a global context for trips, call refresh here
    } catch (err) {
      console.error(err);
      alert("Failed to delete trip!");
    } finally {
      setIsLoading(false);
      setAdminDelete(false);
    }
  };

  useEffect(() => {
    if (tripData?.TripId) getTrip();
  }, [tripData?.TripId]);

  const formattedDate = new Date(currTrip?.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-nunito flex flex-col">
      <Navbar back={() => navigate(-1)} />

      {/* --- Header --- */}
      <header className="fixed top-[64px] left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-100">
              {currTrip?.tripname?.charAt(0).toUpperCase() || "T"}
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-black text-slate-800 leading-tight truncate max-w-[150px]">
                {currTrip?.tripname || "Loading..."}
              </h1>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {currTrip?.admin === userInfo?._id && (
              <button onClick={() => setAdminDelete(true)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                <MdDeleteOutline size={22} />
              </button>
            )}
            <button 
              onClick={() => navigate("/suggestions", { state: { tripId: currTrip?._id } })}
              disabled={currTrip?.status !== 'completed'}
              className={`p-2 rounded-xl transition-all ${currTrip?.status === 'completed' ? 'bg-amber-50 text-amber-600 shadow-sm' : 'text-slate-200'}`}
            >
              <MdOutlineTipsAndUpdates size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* --- Content --- */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 pt-24 pb-48">
        <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">
          Member Spends ({members.length})
        </h2>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-full h-20 bg-slate-200 animate-pulse rounded-[22px]" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {members.length > 0 ? (
              members.map((member, index) => (
                <motion.div
                  key={member._id?._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full relative"
                >
                  <IndiSpend index={index} member={member} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-100">
                <p className="text-slate-400 font-medium">No spends recorded yet.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- Bottom Nav --- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 pt-3 pb-8 z-30 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
        <div className="max-w-2xl mx-auto flex justify-between items-center relative">
          <NavButton icon={<FcAbout size={24}/>} label="About" onClick={() => navigate("/aboutUs")} />
          <NavButton 
            icon={<RxCrossCircled size={24}/>} 
            label="End" 
            onClick={() => setShowEnd(true)} 
            disabled={currTrip?.admin !== userInfo?._id}
            activeColor={currTrip?.admin === userInfo?._id ? "text-red-500" : "text-slate-200"}
          />

          <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <button 
              onClick={() => setShowAddSpend(true)}
              className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform border-4 border-white"
            >
              <IoIosAdd size={38} />
            </button>
            <span className="text-[10px] font-black text-slate-900 mt-1.5 uppercase tracking-tighter">Add Spend</span>
          </div>

          <div className="w-16" />

          <NavButton icon={<GoHistory size={24}/>} label="History" onClick={() => navigate("/payHistory", { state: { tripData }})} />
          <NavButton icon={<GrGroup size={24}/>} label="Members" onClick={() => navigate("/members", { state: { tripData }})} />
        </div>
      </nav>

      {/* --- Modals Overlay --- */}
      <AnimatePresence>
        {(showAddSpend || showEnd || adminDelete) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => { setShowAddSpend(false); setShowEnd(false); setAdminDelete(false); }} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative w-full max-w-lg pointer-events-auto">
              {showAddSpend && <AddSpend handleShowAddSpend={() => setShowAddSpend(false)} tripId={currTrip?._id} refreshTripData={getTrip} />}
              {showEnd && <EndTrip handleEnd={() => setShowEnd(false)} currTrip={currTrip} />}
              {adminDelete && <DeleteTripAdmin handleDeleteAdmin={handleDeleteAdmin} setShowDelete={setAdminDelete} userId={userInfo._id} isLoading={isLoading} />}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavButton = ({ icon, label, onClick, disabled = false, activeColor = "text-slate-600" }) => (
  <button onClick={onClick} disabled={disabled} className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${disabled ? 'opacity-20' : 'opacity-100 hover:text-teal-600'}`}>
    <span className={activeColor}>{icon}</span>
    <span className="text-[9px] font-black uppercase text-slate-500 tracking-tight">{label}</span>
  </button>
);

export default IndiTripDashboard;