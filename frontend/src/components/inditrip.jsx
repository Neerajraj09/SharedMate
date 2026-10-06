import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function IndiTrip({ tripId, tripname, createdAt, index }) {
    const navigate = useNavigate();

    const [tripData, setTripData] = useState({
        TripId: tripId,
        Tripname: tripname,
        CreatedAt: createdAt,
    });

    const handleClick = () => {
        navigate("/trip", { state: { tripData } });
    };

    // Convert createdAt to a readable date format (e.g., "10 Aug 2022")
    const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    // Landscape images array (you can replace these with real landscape URLs)
    const landscapeImages = [
        "https://media.istockphoto.com/id/1331955930/photo/beach-sunrise-over-the-tropical-sea-exotic-island.jpg?s=2048x2048&w=is&k=20&c=eUfizKNhoDyQ6EUhIt-kZ4gpKmeqlHP1sYpbOZd_4mQ=",
        "https://media.istockphoto.com/id/179141504/photo/panoramic-view-of-a-fresh-green-field.jpg?s=2048x2048&w=is&k=20&c=UraCjOA_bvJPpt1MCrshaHcs-z1gPDdDlvlucdIqJqU=",
        "https://media.istockphoto.com/id/172699850/photo/climbing-everest.jpg?s=2048x2048&w=is&k=20&c=6dg_j816Qo7Y5IXzHLvctQgUZnTgvcQ6ay7kv_vL06k=",
        "https://images.unsplash.com/photo-1543503484-ba590cb1f903?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    return (
        <div
            className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 my-3 cursor-pointer"
            onClick={handleClick}
        >
            {/* Left Section: Avatar and Trip Name */}
            <div className="flex items-center space-x-4">
                {/* Landscape Image as Avatar */}
                <img
                    src={landscapeImages[index % landscapeImages.length]}
                    alt="landscape"
                    className="w-16 h-16 rounded-full object-cover"
                    loading="lazy"  // Lazy loading for images
                    onError={(e) => e.target.src = "https://via.placeholder.com/200x200?text=No+Image"}  // Fallback image
                />
                <div className="flex flex-col">
                    <p className="text-2xl font-semibold text-gray-800">{tripname}</p>
                    <p className="text-sm text-gray-600 mt-1">{formattedDate}</p>
                </div>
            </div>

            {/* Right Section: Trip Info (e.g., View Details) */}
            <div className="flex items-center space-x-2">
                <p className="text-lg font-medium text-teal-500">View Details</p>
            </div>
        </div>
    );
}

export default IndiTrip;
