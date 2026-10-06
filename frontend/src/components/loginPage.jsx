import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoInt.jpg';
import axiosInstance from '../../utils/axiosInstance';

const LoginForm = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState({
        Email: "",
        Password: ""
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // New loading state

    const gotosignup = () => {
        navigate("/signup");
    };

    function changeUSers(event) {
        const { id, value } = event.target;
        setUsers(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true); // Set loading to true when form is submitted
        setError(null); // Reset error state before new request

        try {
            const res = await axiosInstance.post("/login", { users });
            if (res.data.error === false) {
                const response = res.data;
                localStorage.setItem("token", res.data.accessToken);
                navigate("/dashboard", { state: response });
                console.log("Post request sent successfully");
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error has occurred. Try again later.");
            }
        } finally {
            setIsLoading(false); // Set loading to false after request completes
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="w-72 flex flex-col items-center justify-center bg-white p-8 rounded-3xl shadow-lg" onSubmit={handleSubmit}>
                <img src={logo} alt="Logo" />
                <p className="text-2xl font-bold text-gray-800 mb-5 mt-1">Login</p>

                <div className="w-full relative flex items-center justify-center mb-6 border border-teal-500 rounded-xl">
                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="absolute left-2">
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                    </svg>
                    <input
                        placeholder="email"
                        id="Email"
                        className="w-full h-10 bg-transparent border-none border-b-2 border-gray-400 rounded-full pl-8 focus:outline-none focus:border-purple-400 text-black text-sm font-medium"
                        type="email"
                        onChange={changeUSers}
                    />
                </div>

                <div className="w-full relative flex items-center justify-center mb-4 border border-teal-500 rounded-xl">
                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="absolute left-2">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                    </svg>
                    <input
                        placeholder="Password"
                        id="Password"
                        className="w-full h-10 bg-transparent border-none border-b-2 border-gray-400 rounded-full pl-8 focus:outline-none focus:border-purple-400 text-black text-sm font-medium"
                        type="password"
                        onChange={changeUSers}
                    />
                </div>

                {error && <p className="text-red-500 font-medium text-sm mb-4">{error}</p>}

                {/* Submit Button */}
                <button
                    disabled={isLoading}
                    className="relative w-full border-2 border-teal-500 bg-teal-500 h-10 hover:bg-teal-600 text-white text-sm font-medium tracking-wider rounded-full mb-4 cursor-pointer overflow-hidden"
                    type="submit"
                >
                    {isLoading ? 'Logging in...' : 'Submit'}
                    <span className="absolute bg-white bg-opacity-25 h-full w-40 top-0 left-0 transform -translate-x-64 transition-transform duration-500 hover:translate-x-96 rounded-full blur-lg"></span>
                </button>

                <div className="flex flex-col items-center justify-center gap-5">
                    <p className="text-sm font-medium text-black">Don't have an account?</p>
                    <button
                        onClick={gotosignup}
                        className="text-xs font-medium bg-gray-800 text-white py-2 px-4 rounded-full"
                    >
                        Create new account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
