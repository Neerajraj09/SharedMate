import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "./navbar";
import { FaInstagram, FaLinkedin, FaSpotify } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Animation variant - smoother transition
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Section = ({ children, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`px-6 mb-12 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const AboutUs = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar back={back} />

      {/* --- Hero Header --- */}
      <div className="pt-10 pb-6 px-6">
        <h1 className="text-slate-900 font-black text-4xl tracking-tighter leading-none">
          About Us
        </h1>
        <div className="w-12 h-1.5 bg-teal-500 rounded-full mt-3" />
      </div>

      <div className="max-w-3xl mx-auto flex flex-col pt-4">
        
        {/* Welcome */}
        <Section>
          <h2 className="text-teal-600 font-black text-xl uppercase tracking-widest mb-3">
            Welcome to SharedMate
          </h2>
          <p className="text-slate-800 font-bold text-2xl leading-tight mb-4 tracking-tight">
            SHARED EXPENSES, <br />SIMPLIFIED TOGETHER.
          </p>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            At SharedMate, we believe that managing group expenses should be simple,
            transparent, and fair. Whether you're on a weekend getaway,
            organizing a team event, or splitting bills for a shared apartment,
            we ensure everyone pays their fair share — no stress, no confusion.
          </p>
        </Section>

        {/* --- Mission & Story Card --- */}
        <Section className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-slate-900 font-black text-xl tracking-tight mb-2">Our Mission</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              To make group expense tracking effortless, accurate, and accessible —
              helping friends and teams focus on the moments that matter, not the money math.
            </p>
          </div>
          <div>
            <h2 className="text-slate-900 font-black text-xl tracking-tight mb-2">Our Story</h2>
            <p className="text-slate-500 font-medium leading-relaxed italic border-l-4 border-teal-500 pl-4">
              "SharedMate was born out of personal frustration. A group of friends went on a trip
              and spent more time figuring out who owed what than enjoying the vacation. We knew 
              there had to be a better way."
            </p>
          </div>
        </Section>

      

        {/* Why SharedMate */}
        <Section className="pb-20">
          <div className="bg-slate-900 rounded-[32px] p-8 text-white">
            <h2 className="text-teal-400 font-black text-xl tracking-tight mb-3">Why SharedMate?</h2>
            <p className="text-slate-300 font-medium leading-relaxed">
              Traditional expense tracking tools can be complicated or cluttered. 
              SharedMate is built with simplicity and fairness at its core — 
              designed for friends who value transparency and want to avoid 
              awkward money talks after a fun trip.
            </p>
          </div>
        </Section>
      </div>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-slate-100 py-10">
        <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">
          <div className="flex gap-8 text-2xl text-slate-400 mb-6">
            <a href="#" className="hover:text-teal-500 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-teal-500 transition-colors"><FaLinkedin /></a>
            <a href="#" className="hover:text-teal-500 transition-colors"><FaSpotify /></a>
            <a href="mailto:team@SharedMate.com" className="hover:text-teal-500 transition-colors"><MdAttachEmail /></a>
          </div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] text-center">
            &copy; {new Date().getFullYear()} SharedMate • Minimalist Split
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;