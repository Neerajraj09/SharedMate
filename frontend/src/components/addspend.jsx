// src/components/AddSpend.js

import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axiosInstance from "../../utils/axiosInstance"; // Ensure correct path

function AddSpend({ handleAddSpend, tripId, refreshTripData }) {
    const [amount, setAmount] = useState('');
    const [where, setWhere] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleCancel = () => {
        handleAddSpend(); // Close the modal
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Input validation
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError('Please enter a valid positive amount.');
            return;
        }

        if (!where.trim()) {
            setError('Please specify where the spend was made.');
            return;
        }

        

        setError('');
        setLoading(true);

        try {
            // Send POST request to backend using axiosInstance
            const response = await axiosInstance.post(`/${tripId}/addSpend`, {
                amount: numericAmount,
                where,
            });

            if (response.status === 200) {
                setSuccess('Spend added successfully!');
                refreshTripData(); // Refresh trip data to reflect the new spend
                // Close the modal after a short delay to show success message
                setTimeout(() => {
                    setSuccess('');
                    handleAddSpend();
                }, 1500);
            } else {
                setError(response.data.message || 'An error occurred while adding the spend.');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'An error occurred while adding the spend.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        console.log(tripId);
    },[]);

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Add Spend</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label className="mb-2">
                    Amount:
                    <input
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Enter amount"
                        required
                        min="0.01"
                    />
                </label>
                <label className="mb-4">
                    Where:
                    <input
                        type="text"
                        value={where}
                        onChange={(e) => setWhere(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Where"
                        required
                    />
                </label>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add'}
                    </button>
                </div>
            </form>
        </div>
    );
}

AddSpend.propTypes = {
    handleAddSpend: PropTypes.func.isRequired,
    tripId: PropTypes.string.isRequired,
    refreshTripData: PropTypes.func.isRequired,
};

export default AddSpend;
