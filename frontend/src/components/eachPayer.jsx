import React, { useState, useRef } from "react";
import { format } from "date-fns";

// List of more compatible avatar background colors
const avatarColors = [
    "#A0DFF7", "#A8D08D", "#FFD28B", "#FFABAB", "#D1A7F1", 
    "#FFEB88", "#F9A6C1", "#C7F1B1", "#FF9F91", "#B4E0FF"
];

function EachPayer({ index, payer }) {
    const [whereVisible, setWhereVisible] = useState(false);
    const formRef = useRef(null);

    const handleWhere = () => {
        setWhereVisible((prevState) => !prevState); // Toggle visibility when button clicked
    };

    // Format createdAt date and time
    const formattedDate = format(new Date(payer.createdAt), "dd MMM yyyy");
    const formattedTime = format(new Date(payer.createdAt), "hh:mm a 'on' dd MMM yyyy");

    // Get the background color for the avatar based on the index of the payer
    const avatarBgColor = avatarColors[index % avatarColors.length];

    return (
<div className={`flex flex-col items-start justify-between ${whereVisible ? 'h-auto' : 'h-[100px] sm:h-[120px] md:h-[130px]'} hover:bg-gray-100 bg-gray-100 py-3 px-4 my-2 mx-1 rounded-md min-w-screen transition-all`}>
            {/* Avatar, Name, and Spend */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <div
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-[10px] text-white flex items-center justify-center text-lg font-semibold"
                        style={{ backgroundColor: avatarBgColor }}
                    >
                        {payer.paidBy.fullname.split(" ").map((name) => name.charAt(0)).join("")}
                    </div>
                </div>

                <div className="flex flex-col ml-4 w-full">
                    <div className="flex mb-1">
                        <p className="text-xs sm:text-sm md:text-base lg:text-base font-medium text-gray-400">
                            Spend by
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-gray-700 truncate">
                            {payer.paidBy.fullname}
                        </p>
                        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-green-500 font-semibold">
                            ₹{payer.amount}/-
                        </p>
                    </div>
                </div>
            </div>

            {/* Date and More button */}
            <div className="flex items-center justify-between w-full">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 mt-1">
                    {formattedDate}
                </p>
                <button
                    onClick={handleWhere}  // Toggle expansion on click
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-400 font-medium border-0 rounded-full px-1 py-1 bg-transparent hover:text-blue-600 transition-all"
                >
                    {whereVisible ? 'view less..' : 'view more...'}
                </button>
            </div>

            {/* Expanded Block (when More is clicked) */}
            {whereVisible && (
                <div className="mt-4 w-full">
                    <div className="flex flex-col items-start">
                        <div ref={formRef} className="bg-gray-50 p-4 rounded-md">
                            <div className="flex">
                                <p className="text-sm sm:text-md md:text-lg lg:text-xl font-medium text-gray-400">
                                    Where:
                                </p>
                                <p className="text-sm sm:text-md md:text-lg lg:text-xl font-medium text-gray-600 ml-2">
                                    {payer.description}
                                </p>
                            </div>
                            <div className="flex">
                                <p className="text-sm sm:text-md md:text-lg lg:text-xl font-medium text-gray-400">
                                    Spend at:
                                </p>
                                <p className="text-sm sm:text-md md:text-lg lg:text-xl font-medium text-gray-600 ml-2">
                                    {formattedTime}
                                </p>
                            </div>
                            <div className="flex">
                                <p className="text-sm sm:text-md md:text-lg lg:text-xl font-medium text-gray-400">
                                    Spend by:
                                </p>
                                <p className="text-sm sm:text-md md:text-lg lg:text-xl font-medium text-gray-600 ml-2">
                                    {payer.paidBy.username}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EachPayer;
