import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/onlylogo.png';

const IntroPage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1200); 
    return () => clearTimeout(timer);
  }, []);

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F8FAFC] font-nunito overflow-x-hidden">
      
      {/* --- Animated Header/Logo Section --- */}
      <motion.div
        layout
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className={`flex flex-col items-center z-20 ${
          showContent ? 'mt-12 mb-8' : 'mt-[40vh]'
        }`}
      >
        <motion.div
          animate={{ scale: showContent ? 0.8 : 1 }}
          className="bg-white p-4 rounded-[2rem] shadow-xl shadow-teal-100/50 mb-4"
        >
          <img src={logo} alt="SharedMate Logo" className="w-16 h-16 object-contain" />
        </motion.div>
        
        <h1 className="text-4xl font-black text-slate-800 tracking-tighter">
          Shared<span className="text-teal-500">Mate</span>
        </h1>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
          SHARED EXPENSES •SIMPLIFIED TOGETHER
        </p>
      </motion.div>

      {/* --- Features Grid --- */}
      <div className="w-full max-w-xl px-6 pb-32">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4"
            >
              <FeatureCard 
                delay={0.2}
                title="Track Expenses"
                desc="Keep a detailed record of all your trip expenses effortlessly."
                icon="📊"
              />
              <FeatureCard 
                delay={0.3}
                title="Balance Payments"
                desc="Automatically calculate who owes what for a fair split."
                icon="⚖️"
              />
              <FeatureCard 
                delay={0.4}
                title="Real-Time Updates"
                desc="Synced expenses across all devices for everyone in the trip."
                icon="⚡"
              />
              <FeatureCard 
                delay={0.5}
                title="Secure Data"
                desc="Your financial data is encrypted and managed with care."
                icon="🛡️"
              />

              {/* --- Action Buttons --- */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col gap-3 mt-8"
              >
                <Link
                  to="/signup"
                  className="w-full h-14 bg-teal-500 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg shadow-teal-100 active:scale-95 transition-transform"
                >
                  Create Account
                </Link>
                <Link
                  to="/login"
                  className="w-full h-14 bg-white text-slate-600 border border-slate-200 rounded-2xl flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"
                >
                  Log In
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper Component for Feature Cards
const FeatureCard = ({ title, desc, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="group p-5 bg-white rounded-[24px] border border-slate-100 shadow-sm flex gap-4 items-start hover:border-teal-200 transition-colors"
  >
    <div className="w-12 h-12 shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-teal-50 transition-colors">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-black text-slate-800 leading-tight">{title}</h3>
      <p className="text-sm text-slate-500 mt-1 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

export default IntroPage;