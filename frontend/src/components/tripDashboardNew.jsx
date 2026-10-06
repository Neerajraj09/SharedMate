import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Dropdown from "./dropdown";
import Navbar from "./navbar";
import IndiTrip from "./indiTripNew";
import CreateTripForm from "./createTripForm";
import { useTrips } from "../contexts/TripsContext";

const TripsDashboard = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const { trips, getAllTrips, isAllTripsLoading } = useTrips();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      getAllTrips();
      setStarted(true);
    }
  }, [getAllTrips, started]);

  const handleForm = () => setShowForm(true);
  const cancelForm = () => setShowForm(false);

  const filteredTrips = trips.filter((trip) => {
    return statusFilter === 'all' || trip.status?.toLowerCase() === statusFilter.toLowerCase();
  });

  const back = () => navigate("/dashboard");

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-nunito">
      <Navbar back={back} />

      {/* --- Sticky Sub-Header --- */}
      <div className="fixed top-[64px] left-0 right-0 z-20 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 h-16">
          <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
            My Trips
          </h1>
          <Dropdown setStatusFilter={setStatusFilter} statusFilter={statusFilter} />
        </div>
      </div>

      {/* --- Main Content Section --- */}
      <main className="max-w-3xl mx-auto px-4 pt-20 pb-32">
        {isAllTripsLoading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-[90px] rounded-2xl bg-gray-200 animate-pulse border border-gray-100 shadow-sm"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip, index) => (
                <motion.div
                  key={trip._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <IndiTrip
                    index={index + 1}
                    tripId={trip._id}
                    tripname={trip.tripname}
                    createdAt={trip.createdAt}
                    admin={trip.admin}
                  />
                </motion.div>
              ))
            ) : (
              /* --- Integrated Empty State --- */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 px-6 text-center"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-teal-100 rounded-full scale-150 blur-2xl opacity-40"></div>
                  <div className="relative bg-white p-6 rounded-3xl shadow-sm border border-teal-50">
                    <svg className="w-16 h-16 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.485V5.118a2 2 0 011.106-1.789l6-3a2 2 0 011.788 0l6 3a2 2 0 011.106 1.789v10.367a2 2 0 01-1.106 1.789L11 20l-2 1z M9 1v19 M15 5v15" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {statusFilter === 'all' ? "Your map is looking a bit empty!" : "No trips match this filter"}
                </h3>
                <p className="text-slate-500 max-w-[280px] leading-relaxed mb-8">
                  {statusFilter === 'all' 
                    ? "Every great story starts with a single step. Why not plan your next adventure today?"
                    : "Try selecting a different category to find what you're looking for."}
                </p>
                {statusFilter === 'all' && (
                  <button
                    onClick={handleForm}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-teal-100 transition-all active:scale-95"
                  >
                    Start Planning
                  </button>
                )}
              </motion.div>
            )}
          </div>
        )}
      </main>

      {/* --- Modal Overlay & Form --- */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cancelForm}
              className="fixed inset-0 z-[40] bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-[50] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="pointer-events-auto w-full max-w-lg">
                <CreateTripForm cancelForm={cancelForm} getAllTrips={getAllTrips} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Floating Action Button (FAB) --- */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-30 pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleForm}
          className="pointer-events-auto flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-full shadow-2xl shadow-slate-300 transition-all border border-slate-800"
        >
          <IoIosAdd className="text-2xl" />
          <span className="font-bold pr-1">Create New Trip</span>
        </motion.button>
      </div>
    </div>
  );
};

export default TripsDashboard;