import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { FaExclamationCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const AddSpend = ({ handleShowAddSpend, tripId, refreshTripData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    amount: "",
    where: "", // Consistent lowercase
  });

  const onChange = (event) => {
    const { id, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const numericAmount = parseFloat(data.amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!data.where.trim()) {
      setError("Please specify where you spent.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(`/api/trips/${tripId}/expenses`, {
        amount: numericAmount,
        description: data.where,
      });

      if (response.status === 201) {
        refreshTripData();
        handleShowAddSpend();
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[380px] bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 font-nunito animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-8">
        {/* Left Oriented Header */}
        <h2 className="text-3xl font-black text-slate-800 text-left mb-1 tracking-tight">
          New Spend
        </h2>
        <p className="text-slate-400 text-left mb-8 font-medium italic">What did you buy?</p>

        <div className="space-y-5">
          {/* Amount Input */}
          <div className="relative">
            <label className="text-[11px] font-bold text-teal-600 uppercase tracking-widest ml-1 mb-2 block">
              How much?
            </label>
            <div className="relative group">
              {/* Changed $ to ₹ */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
              <input
                autoFocus
                id="amount"
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                value={data.amount}
                onChange={onChange}
                /* Increased padding-left (pl-10) to accommodate the Rupee symbol width */
                className="w-full h-[56px] pl-10 pr-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all text-slate-700 font-bold shadow-inner"
              />
            </div>
          </div>

          {/* Location Input */}
          <div className="relative">
            <label className="text-[11px] font-bold text-teal-600 uppercase tracking-widest ml-1 mb-2 block">
              Where?
            </label>
            <input
              id="where"
              type="text"
              placeholder="e.g. Starbucks, Taxi, Hotel"
              value={data.where}
              onChange={onChange}
              className="w-full h-[56px] px-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all text-slate-700 font-semibold shadow-inner"
            />
          </div>

          {/* Error Message */}
          <div className="h-6">
            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -5 }} 
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-red-500 text-xs font-bold px-1"
              >
                <FaExclamationCircle /> {error}
              </motion.p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              disabled={isLoading}
              onClick={handleShowAddSpend}
              className="flex-1 h-[54px] rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition-all active:scale-95 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              disabled={isLoading || !data.amount || !data.where}
              onClick={handleSubmit}
              className="flex-[2] h-[54px] rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-bold shadow-lg shadow-teal-100 transition-all active:scale-95 disabled:grayscale disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Adding..</span>
                </div>
              ) : (
                "Add Spend"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSpend;