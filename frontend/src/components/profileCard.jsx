import { PiUserLight } from "react-icons/pi";
import { MdLogout, MdEdit } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";

const ProfileCard = ({ handleProfile, onLogout, userInfo, getUserInfo }) => {
    const cardRef = useRef(null);
    const [upiInput, setUpiInput] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateUpi = async () => {
        if (!upiInput && !isEditing) {
            setIsEditing(true);
            return;
        }
        setIsLoading(true);
        try {
            await axiosInstance.post(`/api/users/${userInfo._id}/set-upi`, { upiId: upiInput });
            await getUserInfo();
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                handleProfile();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleProfile]);

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-20 bg-slate-900/40 backdrop-blur-sm font-nunito">
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100"
                ref={cardRef}
            >
                <div className="p-6">
                    {/* Top Section: Avatar & Identity */}
                    <div className="flex gap-5 items-center">
                        <div className="flex-shrink-0 w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center shadow-inner">
                            <PiUserLight className="w-14 h-14 text-slate-400" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-black text-teal-600 uppercase tracking-widest mb-1">
                                User Account
                            </p>
                            <h2 className="text-2xl font-black text-slate-800 truncate leading-tight">
                                {userInfo.fullname.toLowerCase()}
                            </h2>
                            <p className="text-sm font-bold text-slate-400 truncate">
                                {userInfo.email}
                            </p>
                        </div>
                    </div>

                    {/* Middle Section: Stats/Username */}
                    <div className="mt-6 flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl w-fit">
                        <span className="text-xs font-black text-slate-400">ID:</span>
                        <span className="text-sm font-bold text-slate-700">@{userInfo.username}</span>
                    </div>

                    {/* Bottom Section: UPI & Logout */}
                    <div className="mt-6 pt-6 border-t border-slate-100 flex items-end justify-between">
                        <div className="flex-1 mr-4">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                UPI Settings
                            </p>
                            
                            <div className="flex items-center gap-2">
                                {userInfo.upiId && !isEditing ? (
                                    <div className="flex flex-col">
                                        <span className="text-lg font-black text-slate-800">{userInfo.upiId}</span>
                                        <button 
                                            onClick={() => setIsEditing(true)}
                                            className="text-teal-600 text-xs font-bold hover:underline text-left"
                                        >
                                          Update UPI ID
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 w-full">
                                        <input
                                            autoFocus
                                            className="flex-1 h-11 px-4 rounded-xl bg-slate-100 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all text-sm font-bold text-slate-700 shadow-inner"
                                            type="text"
                                            placeholder="yourname@bank"
                                            value={upiInput}
                                            onChange={(e) => setUpiInput(e.target.value)}
                                        />
                                        <button 
                                            onClick={handleUpdateUpi}
                                            disabled={isLoading}
                                            className="h-11 px-4 bg-teal-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-100 active:scale-95 transition-all"
                                        >
                                            {isLoading ? "..." : "Set"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Logout Section */}
                        <button 
                            onClick={onLogout}
                            className="group flex flex-col items-center gap-1 p-2 rounded-2xl hover:bg-red-50 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-red-500 group-hover:bg-red-100 transition-all">
                                <MdLogout size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-red-600">Logout</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfileCard;