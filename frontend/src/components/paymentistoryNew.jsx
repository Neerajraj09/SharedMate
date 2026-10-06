import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import axiosInstance from "../../utils/axiosInstance";
import IndiPay from "./indiPayNew";
import IndiPaySkeleton from "./indiPaySkeleton"; 
import TripDetailsSkeleton from "./tripDetailsSkeleton";
import { motion } from "framer-motion";

const History = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { tripData } = location.state || {};

  const back = () => navigate(-1);

  const fetchPaymentHistory = async () => {
    if (!tripData?.TripId) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/trips/${tripData.TripId}/expenses`);
      const sortedPaymentHistory = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPaymentHistory(sortedPaymentHistory);
    } catch (err) {
      setError(err.response?.data?.message || "Some unexpected error has occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, [tripData]);

  const formattedDate = new Date(tripData?.CreatedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-nunito flex flex-col">
      <Navbar back={back} />

      {/* --- Sticky Trip Header --- */}
      <div className="fixed top-[64px] left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          {isLoading ? (
            <TripDetailsSkeleton />
          ) : (
            <div className="flex items-center gap-3">
              {/* Avatar Squircle */}
              <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-teal-100">
                {tripData?.Tripname?.substring(0, 2).toUpperCase()}
              </div>
              
              <div className="flex flex-col min-w-0">
                <h1 className="text-lg font-black text-slate-800 leading-tight truncate">
                  {tripData?.Tripname}
                </h1>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Trip History • {formattedDate}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Payment List --- */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 pt-24 pb-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">
            Transaction Logs ({paymentHistory.length})
          </h2>

          {isLoading ? (
            <div className="space-y-4">
              <IndiPaySkeleton />
              <IndiPaySkeleton />
              <IndiPaySkeleton />
            </div>
          ) : paymentHistory.length > 0 ? (
            paymentHistory.map((payment, index) => (
              <motion.div
                key={payment._id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <IndiPay index={index + 1} payment={payment} />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
              <p className="text-slate-400 font-medium tracking-tight">
                {error ? error : "No transaction history found."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;