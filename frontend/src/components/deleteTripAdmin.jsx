import React from "react";

const DeleteTripAdmin = ({ handleDeleteAdmin, setShowDelete, isLoading }) => {
  return (
    /* IMPORTANT: No 'fixed' or 'inset-0' here. 
       This component is now a clean 'Card' that sits inside the 
       Dashboard's central anchor.
    */
    <div className="relative w-full bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 font-nunito animate-in fade-in zoom-in duration-200">
      <div className="p-8">
        {/* Header Section */}
        <h2 className="text-3xl font-black text-slate-800 text-left mb-1 tracking-tight">
          Delete Trip
        </h2>
        <p className="text-slate-400 text-left mb-8 font-medium italic text-sm">
          Administrative Action
        </p>

        <div className="space-y-6">
          {isLoading ? (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 border-4 border-slate-100 border-t-red-500 rounded-full animate-spin mb-4" />
              <p className="text-slate-600 font-bold leading-tight">
                Removing trip data...
              </p>
            </div>
          ) : (
            <div className="py-2 text-left">
              <p className="text-red-500 font-black text-xl leading-snug">
                This is permanent!
              </p>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed font-medium">
                As the Admin, deleting this trip will remove all expenses and data for <span className="font-bold text-slate-700">every member</span> involved.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              disabled={isLoading}
              onClick={() => setShowDelete(false)}
              className="flex-1 h-[54px] rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition-all active:scale-95"
            >
              Cancel
            </button>

            <button
              disabled={isLoading}
              onClick={handleDeleteAdmin}
              className="flex-[1.5] h-[54px] rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-100 transition-all active:scale-95 disabled:grayscale"
            >
              {isLoading ? "Deleting..." : "Delete Trip"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTripAdmin;