import { MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const IndiTrip = ({ tripname, tripId, createdAt, index, admin }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    return parts.length > 1 
      ? (parts[0][0] + parts[1][0]).toUpperCase() 
      : name.substring(0, 2).toUpperCase();
  };

  const handleClick = () => {
    navigate("/indiTripDashboard", { 
      state: { tripData: { TripId: tripId, Tripname: tripname, CreatedAt: createdAt, Admin: admin } } 
    });
  };

  return (
    <div
      onClick={handleClick}
      className="group flex w-full max-w-2xl justify-between items-center mx-auto px-5 h-[88px] rounded-[24px] bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-100 transition-all duration-300 cursor-pointer active:scale-[0.98]"
    >
      {/* Icon - Stays left */}
      <div className="flex justify-center items-center shrink-0 w-[54px] h-[54px] bg-slate-100 group-hover:bg-teal-500 rounded-2xl transition-colors duration-300">
        <p className="text-[16px] font-bold text-slate-500 group-hover:text-white transition-colors">
          {getInitials(tripname)}
        </p>
      </div>

      {/* Title & Date - Left Oriented */}
      <div className="flex flex-col justify-center items-start flex-1 ml-4 min-w-0">
        <h3 className="w-full text-lg font-bold font-nunito text-slate-800 leading-snug truncate">
          {tripname}
        </h3>
        <p className="text-[12px] font-bold text-slate-400 mt-0.5 tracking-tight">
          Created on {formattedDate}
        </p>
      </div>

      {/* Arrow - Far right */}
      <div className="ml-2 bg-slate-50 p-2 rounded-xl group-hover:bg-teal-50 transition-colors">
        <MdChevronRight className="h-5 w-5 text-slate-400 group-hover:text-teal-600" />
      </div>
    </div>
  );
};

export default IndiTrip;