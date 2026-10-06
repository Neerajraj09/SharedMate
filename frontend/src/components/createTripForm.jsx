import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const CreateTripForm = ({ cancelForm, getAllTrips }) => {
  const [formData, setFormData] = useState({ tripName: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const changeEvent = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCreate = async (e) => {
    if (e) e.preventDefault();
    if (!formData.tripName.trim()) return;

    setIsLoading(true);
    try {
      await axiosInstance.post("/api/trips", formData);
      await getAllTrips();
      cancelForm();
      navigate("/tripsDashboard");
    } catch (err) {
      console.error("Failed to create trip:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[380px] bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 font-nunito animate-in fade-in zoom-in duration-200">
      <div className="p-8">
        {/* Left Oriented Title */}
        <h2 className="text-3xl font-black text-slate-800 text-left mb-2 tracking-tight">
          New Trip
        </h2>
        <p className="text-slate-500 text-left mb-8 font-medium">Where to next?</p>

        <div className="space-y-6">
          <div className="relative">
            <label className="text-[11px] font-bold text-teal-600 uppercase tracking-widest ml-1 mb-2 block">
              Trip Name
            </label>
            <input
              autoFocus
              id="tripName"
              type="text"
              placeholder="e.g. Weekend in Tokyo"
              value={formData.tripName}
              onChange={changeEvent}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              className="w-full h-[56px] px-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all text-slate-700 font-semibold shadow-inner"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              disabled={isLoading}
              onClick={cancelForm}
              className="flex-1 h-[54px] rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition-all active:scale-95 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              disabled={isLoading || !formData.tripName.trim()}
              onClick={handleCreate}
              className="flex-[2] h-[54px] rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-bold shadow-lg shadow-teal-100 transition-all active:scale-95 disabled:grayscale disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Trip"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTripForm;