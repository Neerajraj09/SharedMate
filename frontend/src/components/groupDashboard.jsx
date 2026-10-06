import Navbar from "./navbar";
import groupDashBg from "../assets/groupDashBg.jpg";
import { FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const GroupDashboard = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/dashboard");
    }

  return (
    <>
      <Navbar />
      <div 
        className="relative flex flex-col items-center justify-center w-full max-w-[370px] h-[800px] mx-auto mt-20 rounded-lg shadow-lg bg-cover bg-center px-6 text-center"
        style={{ backgroundImage: `url(${groupDashBg})` }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-55"></div>
        <p className="relative z-10 text-black font-inter text-lg sm:text-xl font-semibold leading-relaxed">
          We are still working on this feature, it will be available in the next version.
        </p>
        <FaExclamationCircle className="h-[60px] w-[60px] text-red-700"/>
        <h3 className="relative z-10 text-blue-900 font-bold cursor-pointer hover:underline underline" onClick={onClick}>
          Go back
        </h3>
      </div>
    </>
  );
};

export default GroupDashboard;
