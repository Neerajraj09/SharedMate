import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom"; 
import EachPayer from "./eachPayer";
import axiosInstance from "../../utils/axiosInstance"; // Ensure correct path
import '../index.css';
import { useLocation } from "react-router-dom";

function PayHistory() {
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [tripDetails, setTripDetails] = useState(null); // State for trip details
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const location = useLocation();
    const { tripId } = location.state || {};

    const handleBack = () => {
        navigate(-1);
    };

        

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                // Fetch payment history
                const response = await axiosInstance.get(`/${tripId}/expenses`); // Adjust the API endpoint as needed
                
                // Sort the payment history by createdAt in descending order
                const sortedPaymentHistory = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                
                setPaymentHistory(sortedPaymentHistory);
                
                // Fetch trip details
                const tripResponse = await axiosInstance.get(`/getTrip/${tripId}`); // Adjust the endpoint for trip details
                setTripDetails(tripResponse.data);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching payment history");
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, [tripId]);

    return (
        <>
            <Navbar />
            <div className="h-[50px] md:h-[60px] xl:h-[60px] lg:h-[60px] w-full bg-gray-300 px-4 md:px-6 py-3 flex justify-between">
                <p className="flex font-serif text-lg md:text-3xl lg:text-3xl xl:text-3xl">
                    {tripDetails ? tripDetails.tripname : "Loading..."}
                    {tripDetails && (
                        <span className="text-xl mx-1 md:mx-2 lg:mx-2 xl:mx-2 md:my-1">
                            (Created at: {tripDetails.createdAt})
                        </span>
                    )}
                </p>
                <button 
                    onClick={handleBack}
                    className="h-7 md:h-9 w-[55px] md:w-[80px] hover:bg-teal-600 bg-teal-500 rounded-xl md:rounded-3xl text-white text-sm">Back</button>
            </div>
            <div className="p-4">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <p>Loading payment history...</p>
                        {/* Add a spinner or any loader component here */}
                        <div className="loader"></div> {/* Replace with your loader */}
                    </div>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    paymentHistory.length > 0 ? (
                        paymentHistory.map((payer, index) => (
                            <EachPayer index={index+1} payer={payer} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No payment history available.</p>
                    )
                )}
            </div>
        </>
    );
}

export default PayHistory;
