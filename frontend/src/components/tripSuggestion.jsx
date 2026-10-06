import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "./navbar"; // Adjust the import based on your structure

function TripSuggestion() {
    const location = useLocation();
    const tripId = location.state?.tripId; // Get tripId from state
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuggestions = async () => {
            //if (!tripId) return; // Prevent fetching if tripId is not available

            try {
                const response = await axiosInstance.get(`/tripSuggestions/${tripId}`);
                console.log(response);
                setSuggestions(response.data.suggestions); // Assuming suggestions are in this format
            } catch (err) {
                console.error("Error fetching suggestions:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, [tripId]);

    return (
        <>
            <Navbar />
            <div className="suggestion-container">
                <h1 className="text-xl font-bold">Trip Suggestions</h1>
                {loading ? (
                    <p>Loading suggestions...</p>
                ) : (
                    <ul>
                        {suggestions.map((suggestion) => (
                            <li key={`${suggestion.fromMemberId}-${suggestion.toMemberId}`}>
                                {suggestion.fromMemberUsername} can give <span className="text-green-500">{suggestion.amount}</span>  to {suggestion.toMemberUsername}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default TripSuggestion;
