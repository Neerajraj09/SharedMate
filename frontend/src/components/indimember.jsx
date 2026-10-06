import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function Indimember({ user, tripData, index }) {
    const [currUser, setCurrUser] = useState(null);
    const [isAdded, setIsAdded] = useState(false);  // New state to track if user is added

    const onAdd = async () => {
        try {
            console.log(tripData);
            // Ensure both currUser and tripData are being sent correctly in the body
            const response = await axiosInstance.put(`/add/${user._id}`, {
                currUser: currUser,    // Include the current user details
                tripData: tripData     // Include the trip data
            });
            console.log(response.data);  // Log the response to confirm
            setIsAdded(true);  // Mark the user as added
        } catch (err) {
            console.log(err);  // Handle any errors
        }
    };

    useEffect(() => {
        setCurrUser(user);  // Set the current user from the passed props
    }, [user]);

    useEffect(() => {
        if (currUser) {
            console.log("Current User: ", currUser);  // Log the current user for debugging
            console.log("Trip Data: ", tripData);  // Log tripData to ensure it's being passed correctly
        }
    }, [currUser, tripData]);

    return (
        <>
            <div className="px-2 md:px-4 flex min-w-screen mx-1 justify-between h-[48px] md:h-[55px] my-1 bg-slate-100 border rounded-lg hover:bg-slate-100 border-black py-[7.5px]">
                {currUser && (
                    <p className="flex text-lg md:text-2xl font-medium ">
                        {index}. {currUser.username}
                        <p className="font-normal text-sm md:text-lg mx-[3px] md:mx-2 my-[3px]">({currUser.fullname})</p>
                    </p>
                )}
                <button
                    className={`w-14 h-8 md:w-16 text-sm lg:w-16 xl:w-16 rounded-2xl text-white ${isAdded ? 'bg-teal-300 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'}`}
                    onClick={onAdd}
                    disabled={isAdded}  // Disable button if added
                >
                    {isAdded ? 'Added' : '+Add'}
                </button>
            </div>
        </>
    );
}

export default Indimember;
