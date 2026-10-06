import React, { useEffect, useState, useRef } from "react";
import Indimember from "./indimember";
import SearchBar from "./searchbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./Addmembers.css"; // Ensure you have the loader CSS

function Addmembers({ tripData, setMembersVisible, setbtnVisible, getTrip }) {
  const navigate = useNavigate();
  const [Allusers, setAllusers] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const modalRef = useRef(null); // Reference for modal

  const handleDone = async () => {
    try {
      // Implement the logic to add selected members to the trip here
      await getTrip(); // Ensure getTrip is awaited if it's asynchronous
      setMembersVisible(false);
      setbtnVisible(true);
    } catch (err) {
      console.error("Error in handleDone:", err);
      setError("Failed to add members. Please try again.");
    }
  };

  const handleCancel = () => {
    setMembersVisible(false);
    setbtnVisible(true);
  };

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/getAllUsers");
      setAllusers(response.data.allUsers);
      setLoading(false); // Stop loader once data is fetched
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false); // Stop loader even in case of error
      setError("Failed to fetch users. Please try again later.");
    }
  };

  // Close modal if click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setMembersVisible(false); // Close modal
        setbtnVisible(true);
      }
    };

    // Bind the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setMembersVisible, setbtnVisible]);

  useEffect(() => {
    getAllUsers();
  }, [tripData]);

  // Filtered users based on search query
  // Filtered users based on search query
const filteredUsers = searchQuery
? Allusers.filter((user) =>
    user?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user?.fullname?.toLowerCase().includes(searchQuery.toLowerCase())
  ) 
: Allusers; // Show all users if searchQuery is empty

  return (
    <div className="add-members-overlay">
      <div
        ref={modalRef}
        className="add-members-container w-[340px] h-[690px] shadow-xl shadow-black sm:w-[500px] xl:w-[700px] md:w-[700px] bg-slate-300 border rounded-xl flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between px-4 h-[70px] w-full bg-slate-400 rounded-t-xl py-[15px]">
          <p className="text-2xl md:text-3xl font-serif font-medium">
            Add Members
          </p>
          <SearchBar setSearchQuery={setSearchQuery} />
        </div>

        {/* Content Area */}
        <div className="p-4 flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">
              <p>{error}</p>
            </div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <Indimember
                key={user._id}
                user={user}
                
                tripData={tripData}
                index={index + 1}
              />
            ))
          ) : (
            <p className="text-center">No users available</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around h-[100px] py-4">
          <button
            onClick={handleCancel}
            className="h-10 w-20 rounded-3xl text-white hover:bg-slate-600 bg-slate-500 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDone}
            className="h-10 w-20 rounded-3xl text-white hover:bg-teal-600 bg-teal-500 transition-colors duration-300"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addmembers;
