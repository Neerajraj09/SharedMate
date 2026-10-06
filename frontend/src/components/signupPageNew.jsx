import { IoChevronBackOutline } from "react-icons/io5";
import logo from '../assets/onlylogo.png';
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { CiAt } from "react-icons/ci";
import { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../utils/axiosInstance";

const SignupForm = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState({
        Fullname: "",
        Username: "",
        Email: "",
        Password: ""
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(prev => !prev);

    function changeUSers(event) {
        const { id, value } = event.target;
        setUsers(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleBack = () => navigate("/intro");
    const goToLogin = () => navigate("/login");

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const res = await axiosInstance.post("/api/auth/signup", { users });
            if (res.data.error === false) {
                const response = res.data.message;
                localStorage.setItem("token", res.data.accessToken);
                navigate("/dashboard", { state: response });
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error has occured. Try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-nunito flex flex-col items-center">
            {/* --- Minimal Navbar --- */}
            <nav className="w-full h-16 px-4 flex items-center justify-between bg-white/40 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
                <button onClick={handleBack} className="p-2 hover:bg-slate-100 rounded-2xl transition-colors text-slate-600">
                    <IoChevronBackOutline size={28} />
                </button>
                <img src={logo} className="h-10 w-10 object-contain" alt="Logo" />
                <div className="w-10" />
            </nav>

            <main className="flex-1 flex items-center justify-center p-6 w-full max-w-md">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 p-8 border border-white"
                >
                    <div className="text-left mb-8">
                        <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Create Account</h2>
                        <p className="text-slate-400 font-bold text-sm mt-1">Join the SharedMate community</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Fullname Field */}
                        <div className="group space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 group-focus-within:text-teal-600 uppercase tracking-widest ml-1 transition-colors">
                                Full Name
                            </label>
                            <div className="relative">
                                <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                                <input 
                                    type="text"
                                    id="Fullname"
                                    placeholder="John Doe"
                                    required
                                    onChange={changeUSers}
                                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-300 text-slate-700 font-bold shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Username Field */}
                        <div className="group space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 group-focus-within:text-teal-600 uppercase tracking-widest ml-1 transition-colors">
                                Username
                            </label>
                            <div className="relative">
                                <CiAt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-teal-600 transition-colors text-lg" />
                                <input
                                    type="text"
                                    id="Username"
                                    placeholder="johndoe123"
                                    required
                                    onChange={changeUSers}
                                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-300 text-slate-700 font-bold shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="group space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 group-focus-within:text-teal-600 uppercase tracking-widest ml-1 transition-colors">
                                Email Address
                            </label>
                            <div className="relative">
                                <TfiEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                                <input
                                    type="email"
                                    id="Email"
                                    placeholder="name@email.com"
                                    required
                                    onChange={changeUSers}
                                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-300 text-slate-700 font-bold shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="group space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 group-focus-within:text-teal-600 uppercase tracking-widest ml-1 transition-colors">
                                Password
                            </label>
                            <div className="relative">
                                <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={20}/>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="Password"
                                    placeholder="••••••••"
                                    required
                                    onChange={changeUSers}
                                    className="w-full h-14 pl-12 pr-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-300 text-slate-700 font-bold shadow-inner"
                                />
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.p 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-red-500 text-xs font-bold px-1"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <button 
                            disabled={isLoading}
                            className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-3xl font-black text-lg shadow-xl shadow-slate-200 active:scale-95 transition-all mt-4 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-400 font-bold text-sm">Already have an account?</p>
                        <button 
                            onClick={goToLogin}
                            className="text-teal-600 font-black text-sm mt-1 hover:underline underline-offset-4"
                        >
                            Login
                        </button>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

export default SignupForm;