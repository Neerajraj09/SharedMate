import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const EndTrip = ({ handleEnd, currTrip }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const confirmEndTrip = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`/api/trips/${currTrip?._id}/end`);
      navigate("/suggestions", { state: { tripId: currTrip?._id } });
    } catch (error) {
      console.error("Error ending trip:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* IMPORTANT: No 'fixed' or 'inset-0' here. 
       We use 'relative' so it stays inside the parent's flex center.
    */
    <div className="relative w-full bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 font-nunito">
      <div className="p-8">
        <h2 className="text-3xl font-black text-slate-800 text-left mb-1 tracking-tight">
          End Trip
        </h2>
        <p className="text-slate-400 text-left mb-8 font-medium italic text-sm">
          Finalize all expenses
        </p>

        <div className="space-y-6">
          {isLoading ? (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 border-4 border-slate-100 border-t-teal-500 rounded-full animate-spin mb-4" />
              <p className="text-slate-600 font-bold">Running final numbers...</p>
            </div>
          ) : (
            <div className="py-2 text-left">
              <p className="text-red-500 font-black text-xl">Are you sure?</p>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed font-medium">
                This will calculate final balances and notify all members. This cannot be undone.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              disabled={isLoading}
              onClick={handleEnd}
              className="flex-1 h-[54px] rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition-all active:scale-95"
            >
              Go Back
            </button>
            <button
              disabled={isLoading}
              onClick={confirmEndTrip}
              className="flex-[1.5] h-[54px] rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-100 transition-all active:scale-95 disabled:grayscale"
            >
              {isLoading ? "Ending..." : "End Trip"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndTrip;