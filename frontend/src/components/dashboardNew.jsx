import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowForwardCircleOutline, IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineAnalytics, MdOutlineModeOfTravel } from "react-icons/md";
import Navbar from "./navbar";

// Assets
import tripBg from '../assets/tripBg.jpg';
import groupBg from '../assets/groupBG.jpg';

const Dashboard = () => {
    const navigate = useNavigate();

    const onTripsClick = () => navigate("/tripsDashboard");

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-nunito flex flex-col">
            <Navbar />

            <main className="flex-1 w-full max-w-xl mx-auto px-6 pb-12">
                {/* Header */}
                <header className="mb-8">
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter">
                        Select Category
                    </h2>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                        Choose your tracking mode
                    </p>
                </header>

                <div className="flex flex-col gap-6">
                    
                    {/* Active Option: Group Trips */}
                    <div 
                        className="relative group w-full h-[220px] rounded-[32px] overflow-hidden shadow-xl shadow-slate-200 cursor-pointer transition-all active:scale-[0.98]"
                        onClick={onTripsClick}
                    >
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${tripBg})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                        
                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30">
                                <MdOutlineModeOfTravel size={24} />
                            </div>
                            
                            <div className="flex items-end justify-between gap-4">
                                <div className="flex flex-col">
                                    <h3 className="text-white font-black text-xl tracking-tight">Group Trips</h3>
                                    <p className="text-slate-200 text-xs font-bold leading-tight max-w-[200px] mt-1">
                                        Going on a trip with friends? Keep track of every expense effortlessly.
                                    </p>
                                </div>
                                <IoArrowForwardCircleOutline className="text-white shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" size={56} />
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Option: Individual Tracking */}
                    <div className="relative w-full h-[220px] rounded-[32px] overflow-hidden shadow-lg shadow-slate-100 grayscale-[0.5] opacity-80">
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${groupBg})` }}
                        />
                        {/* Darker overlay for 'Disabled' feel */}
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
                        
                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-white/50 border border-white/10">
                                    <MdOutlineAnalytics size={24} />
                                </div>
                                <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 flex items-center gap-2">
                                    <IoLockClosedOutline size={12} />
                                    Upcoming
                                </div>
                            </div>
                            
                            <div className="flex items-end justify-between gap-4">
                                <div className="flex flex-col">
                                    <h3 className="text-white/70 font-black text-xl tracking-tight">Personal Tracking</h3>
                                    <p className="text-white/50 text-xs font-bold leading-tight max-w-[200px] mt-1">
                                        Track and analyze individual expenses to manage your budget better.
                                    </p>
                                </div>
                                <div className="text-white/20">
                                    <IoArrowForwardCircleOutline size={56} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default Dashboard;