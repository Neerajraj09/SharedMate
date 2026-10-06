import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import IndiUser from "./indiUserNew";
import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AddMembers = ({ tripData, handleUsers }) => {
  const [allUsers, setAllusers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch users
  const fetchUsers = async (pageNum, query, isNewSearch = false) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/users?page=${pageNum}&limit=10&query=${query}`
      );
      
      const fetchedUsers = response.data.allUsers;
      
      if (isNewSearch) {
        setAllusers(fetchedUsers);
      } else {
        setAllusers((prev) => [...prev, ...fetchedUsers]);
      }
      
      setHasMore(response.data.hasMore);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      fetchUsers(1, searchQuery, true);
    }, 400); // Wait 400ms after typing stops

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(nextPage, searchQuery, false);
  };

  return (
    <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 font-nunito flex flex-col max-h-[85vh]">
      {/* --- Header Section --- */}
      <div className="p-6 pb-4 border-b border-slate-50">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Invite Members</h2>
            <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mt-1">Add to your trip</p>
          </div>
          <button onClick={handleUsers} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <IoClose size={24} />
          </button>
        </div>

        <div className="group relative">
          <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors text-xl font-bold" />
          <input
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-300 text-slate-700 font-bold"
            placeholder="Search all users..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* --- Users List Section --- */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 custom-scrollbar min-h-[350px]">
        {allUsers.length > 0 ? (
          <>
            {allUsers.map((user, index) => (
              <IndiUser
                key={user._id}
                user={user}
                username={user.username}
                fullname={user.fullname}
                email={user.email}
                tripData={tripData}
                index={index + 1}
              />
            ))}
            
            {hasMore && (
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="w-full py-4 text-xs font-black text-teal-600 uppercase tracking-widest hover:bg-teal-50 rounded-2xl transition-all"
              >
                {isLoading ? "Loading..." : "Load More Users"}
              </button>
            )}
          </>
        ) : !isLoading && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-medium">No users found</p>
          </div>
        )}

        {isLoading && allUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
             <div className="w-8 h-8 border-4 border-slate-100 border-t-teal-500 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* --- Footer Actions --- */}
      <div className="p-4 bg-slate-50 flex gap-3">
        <button className="flex-1 h-12 rounded-2xl bg-white border border-slate-200 text-slate-500 font-bold" onClick={handleUsers}>
          Cancel
        </button>
        <button className="flex-1 h-12 rounded-2xl bg-slate-900 text-white font-bold" onClick={handleUsers}>
          Done
        </button>
      </div>
    </div>
  );
};

export default AddMembers;