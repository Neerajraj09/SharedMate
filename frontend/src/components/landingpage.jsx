import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../App.css';
import logo from '../assets/logo2.png';
import '../index.css';

function LandingPage() {
  const navigate = useNavigate();

  // Trigger navigation after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/intro'); // Change '/next-route' to the path you want to navigate to
    }, 1300); 

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            className='h-[450px] w-[390px] xl:w-[500px] lg:w-[500px] md:w-[450px] sm:w-[390px]'
            src={logo}
            alt="Logo"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default LandingPage;
