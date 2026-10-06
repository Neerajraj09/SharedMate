import Navbar from "./navbar";
import Dropdown from "./dropdown";
import IndiTrip from "./inditrip";
import SearchBar from "./searchbar";
import { MdAdd } from "react-icons/md";
import Newtrip from "./newTripform";
import { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

// SideNavBar Component (for Desktop)
const SideNavBar = () => {
  const location = useLocation(); // Get the current location
  
  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-gray-800 text-white">
      {/* Navigation Links */}
      <nav className="flex flex-col mt-4">
        <Link
          to="/"
          className={`flex items-center px-4 py-3 hover:bg-gray-700 ${location.pathname === '/' ? 'bg-gray-700' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className={`flex items-center px-4 py-3 hover:bg-gray-700 ${location.pathname === '/dashboard' ? 'bg-gray-700' : ''}`}
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          className={`flex items-center px-4 py-3 hover:bg-gray-700 ${location.pathname === '/profile' ? 'bg-gray-700' : ''}`}
        >
          Profile
        </Link>
        <Link
          to="/about"
          className={`flex items-center px-4 py-3 hover:bg-gray-700 ${location.pathname === '/about' ? 'bg-gray-700' : ''}`}
        >
          About
        </Link>
      </nav>
    </div>
  );
};

// BottomNavBar Component (for Mobile)
import { MdHome, MdDashboard, MdPerson, MdInfo } from "react-icons/md";

const BottomNavBar = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between bg-gray-800 text-white p-4 py-3 md:hidden">
      <Link
        to="/"
        className={`flex flex-col items-center ${location.pathname === '/' ? 'text-teal-500' : 'text-white'}`}
      >
        <MdHome size={24} />
        <span className="text-sm">Home</span>
      </Link>
      <Link
        to="/dashboard"
        className={`flex flex-col items-center ${location.pathname === '/dashboard' ? 'text-teal-500' : 'text-white'}`}
      >
        <MdDashboard size={24} />
        <span className="text-sm">Dashboard</span>
      </Link>
      <Link
        to="/profile"
        className={`flex flex-col items-center ${location.pathname === '/profile' ? 'text-teal-500' : 'text-white'}`}
      >
        <MdPerson size={24} />
        <span className="text-sm">Profile</span>
      </Link>
      <Link
        to="/about"
        className={`flex flex-col items-center ${location.pathname === '/about' ? 'text-teal-500' : 'text-white'}`}
      >
        <MdInfo size={24} />
        <span className="text-sm">About</span>
      </Link>
    </div>
  );
};

function TripsDashboard() {
  const [visible, setVisible] = useState(false);
  const formRef = useRef(null);
  const [trips, setTrips] = useState([]); // State for storing trips
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [statusFilter, setStatusFilter] = useState('all'); // State for filtering by status (default to 'all')

  const toggleForm = () => {
    setVisible(!visible);
  };

  const getAllTrips = async () => {
    try {
      const response = await axiosInstance.get("/getAllTrips");
      setTrips(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleClickOutside = (event) => {
    if (visible && formRef.current && !formRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    getAllTrips();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.tripname.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || trip.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col">
      {/* Fixed Navbar at the top of the page */}
      <Navbar />

      <div className="flex">
        {/* Side Navigation Bar for Desktop */}
        <SideNavBar />

        <div className="flex-1"> {/* Add padding to prevent overlap */}
          <div className="min-h-screen bg-gray-100">
            <div className="flex h-15 justify-between shadow-sm shadow-white min-w-screen bg-gray-200 px-4 py-4">
              <p className="font-serif text-2xl md:text-3xl xl:text-3xl font-medium antialiased text-teal-800">
                Your Trips
              </p>
              <SearchBar setSearchQuery={setSearchQuery} />
              <Dropdown setStatusFilter={setStatusFilter} statusFilter={statusFilter} />
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center min-h-screen">
                <div className="loader"></div>
                <p>Loading your trips...</p>
              </div>
            ) : (
              <div className="trips-container">
                {filteredTrips.length > 0 ? (
                  filteredTrips.map((trip, index) => (
                    <IndiTrip
                      key={trip._id}
                      index={index + 1}
                      tripId={trip._id}
                      tripname={trip.tripname}
                      createdAt={trip.createdAt}
                    />
                  ))
                ) : (
                  <p>No trips found.</p>
                )}
              </div>
            )}
          </div>

          {visible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-0 backdrop-blur-sm">
              <div ref={formRef}>
                <Newtrip toggleForm={toggleForm} getAllTrips={getAllTrips} />
              </div>
            </div>
          )}

          <button
            onClick={toggleForm}
            className="w-16 h-16 flex items-center justify-center rounded-2xl bg-teal-500 hover:bg-teal-600 fixed right-4 bottom-24 md:bottom-10 z-20"
          >
            <MdAdd className="text-[32px] text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation Bar for Mobile */}
      <BottomNavBar />
    </div>
  );
}

export default TripsDashboard;
