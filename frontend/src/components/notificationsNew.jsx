import { useNotifications } from "../contexts/NotificationContext";
import NotificationCard from "./notificationCard";
import NotificationSkeleton from './notificationSkeleton';
import { IoNotificationsOffOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const Notifications = ({ userInfo, handleBell }) => {
    const { notifications, isLoading, fetchNotifications } = useNotifications();

    return (
        /* 1. Full screen fixed container to handle centering */
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            {/* 2. Backdrop - Dimming the background */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleBell}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* 3. The actual Panel */}
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="relative w-full max-w-md bg-[#F8FAFC] rounded-[32px] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-white"
            >
                {/* Fixed Header */}
                <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                        Notifications
                    </h2>
                    <button 
                        onClick={handleBell}
                        className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {isLoading ? (
                        <div className="space-y-3">
                            <NotificationSkeleton />
                            <NotificationSkeleton />
                            <NotificationSkeleton />
                        </div>
                    ) : notifications && notifications.length > 0 ? (
                        notifications.map((info) => (
                            <NotificationCard 
                                key={info._id} 
                                userInfo={userInfo} 
                                info={info} 
                                getUserInfo={fetchNotifications} 
                                handleBell={handleBell} 
                            />
                        ))
                    ) : (
                        <div className="flex flex-col justify-center items-center py-20 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                                <IoNotificationsOffOutline className="h-8 w-8 text-slate-300" />
                            </div>
                            <p className="text-slate-500 font-bold">No new notifications</p>
                        </div>
                    )}
                </div>

                {/* Fixed Footer */}
                <div className="p-4 bg-white border-t border-slate-100">
                    <button 
                        className="w-full h-[54px] rounded-2xl bg-slate-900 text-white font-bold transition-all active:scale-95 shadow-lg shadow-slate-200"
                        onClick={handleBell}
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default Notifications;