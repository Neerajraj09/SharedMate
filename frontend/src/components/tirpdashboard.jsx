import React, { useEffect, useState, useRef } from "react";
import Navbar from "./navbar";
import Tripmember from "./tripmember";
import { useNavigate, useLocation } from "react-router-dom";
import AddSpend from "./addspend";
import Addmembers from "./addmembers";
import axiosInstance from "../../utils/axiosInstance";
import { MdAdd } from "react-icons/md";

function TripDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { tripData } = location.state || {};

    const [addSpendVisible, setAddSpendVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showEndTripModal, setShowEndTripModal] = useState(false);
    const [membersVisible, setMembersVisible] = useState(false);
    const addMembersFormRef = useRef(null);
    const addSpendFormRef = useRef(null);
    const popupRef = useRef(null);
    const floatingButtonRef = useRef(null);
    const [currTrip, setCurrTrip] = useState(null);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTrip = async () => {
        try {
            const _id = tripData.TripId;
            const response = await axiosInstance.get(`/api/trips/${_id}`);
            setCurrTrip(response.data);
            setMembers(response.data.members);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleMembers = () => {
        setMembersVisible(true);
    };

    const handleAddSpend = () => {
        setAddSpendVisible((prev) => !prev);
        setShowPopup(false);
    };

    const handleEndTrip = () => {
        setShowEndTripModal(true);
    };

    const cancelEndTrip = () => {
        setShowEndTripModal(false);
    };

    const togglePopup = () => {
        setShowPopup((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target) &&
                floatingButtonRef.current &&
                !floatingButtonRef.current.contains(event.target)
            ) {
                setShowPopup(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        getTrip();
    }, [tripData]);

    return (
        <>
            <Navbar />
            {addSpendVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div ref={addSpendFormRef}>
                        <AddSpend
                            handleAddSpend={handleAddSpend}
                            tripId={currTrip?._id}
                            refreshTripData={getTrip}
                        />
                    </div>
                </div>
            )}

            <div className="h-[50px] md:h-[60px] xl:h-[60px] lg:h-[60px] w-full bg-gray-300 px-4 md:px-6 py-3 flex justify-between">
                <p className="flex font-serif text-lg md:text-3xl lg:text-3xl xl:text-3xl">
                    {currTrip ? currTrip.tripname : "Loading..."}
                    {currTrip && (
                        <span className="text-xl mx-1 md:mx-2 lg:mx-2 xl:mx-2 md:my-1">
                            ({currTrip.createdAt})
                        </span>
                    )}
                </p>
                <div>
                    <button
                        className="h-10 w-20 rounded-3xl text-white hover:bg-slate-600 bg-slate-500"
                        onClick={handleMembers}
                    >
                        Add
                    </button>
                    <button
                        onClick={() => navigate("/history", { state: { tripId: currTrip?._id } })}
                        className="h-7 md:h-9 w-[110px] md:w-[150px] hover:bg-teal-600 bg-teal-500 rounded-xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl text-white text-sm"
                    >
                        Payment History
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-[300px]">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                    <p className="ml-4 text-lg">Loading members...</p>
                </div>
            ) : (
                <div>
                    {members.length > 0 ? (
                        members.map((member, index) => (
                            <Tripmember
                                key={member._id._id}
                                member={member}
                                index={index + 1}
                            />
                        ))
                    ) : (
                        <p>No members found.</p>
                    )}
                </div>
            )}

            {membersVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div ref={addMembersFormRef}>
                        <Addmembers setMembersVisible={setMembersVisible} getTrip={getTrip} tripData={tripData} />
                    </div>
                </div>
            )}

            <div className="fixed bottom-5 right-5">
                <button
                    ref={floatingButtonRef}
                    onClick={togglePopup}
                    className="bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 transition duration-300"
                >
                    +
                </button>

                {showPopup && (
                    <div
                        ref={popupRef}
                        className={`absolute bottom-0 right-0 mb-16 mr-4 bg-white p-4 w-64 shadow-lg rounded-lg 
                        transform ${showPopup ? "translate-y-0" : "translate-y-full"} transition-transform duration-500 ease-out`}
                    >
                        <h3 className="text-xl font-semibold mb-4">Trip Options</h3>
                        <button
                            className="w-full bg-green-500 text-white py-2 px-4 mb-2 rounded hover:bg-green-700 transition"
                            onClick={handleAddSpend}
                        >
                            Add Spend
                        </button>
                        <button
                            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                            onClick={handleEndTrip}
                        >
                            End Trip
                        </button>
                    </div>
                )}
            </div>

            {showEndTripModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                        <h2 className="text-xl font-semibold mb-4">Are you sure you want to end the trip?</h2>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                                onClick={confirmEndTrip}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                                onClick={cancelEndTrip}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TripDashboard;
