import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoInt.jpg';
import axiosInstance from '../../utils/axiosInstance';

const SignupForm = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [users, setUsers] = useState({
    Fullname: "",
    Username: "",
    Email: "",
    Password: ""
  });

  const navigate = useNavigate();

  const changeUSers = (event) => {
    const { id, value } = event.target;
    setUsers(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading
    console.log(users);
    
    try {
      const res = await axiosInstance.post("/signup", { users });
      if (res.data.error === false) {
        const response = res.data.message;
        console.log(response);
        localStorage.setItem("token", res.data.accessToken);
        navigate("/dashboard", { state: response });
        console.log("Post request sent successfully");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error has occurred, Try again later");
        console.log(err);
      }
    } finally {
      setIsLoading(false); // Stop loading after request completes
    }
  };

  const gotologinpage = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="w-[350px] flex flex-col items-center justify-center bg-white p-8 rounded-3xl shadow-lg" onSubmit={handleRegister}>
        <img src={logo} alt="Logo" />
        <p className="text-2xl font-bold text-gray-800 mb-5 mt-1">Create New Account</p>

        {/* Full Name Input */}
        <div className="w-full relative flex items-center justify-center mb-6 border border-teal-500 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#2e2e2e" viewBox="0 0 24 24" className="absolute left-2" height="16" width="16">
            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
          </svg>
          <input
            placeholder="Full Name"
            id="Fullname"
            onChange={changeUSers}
            className="w-full h-10 bg-transparent border-none border-b-2 border-gray-400 rounded-full pl-8 focus:outline-none focus:border-purple-400 text-black text-sm font-medium"
            type="text"
          />
        </div>

        {/* Username Input */}
        <div className="w-full relative flex items-center justify-center mb-6 border border-teal-500 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#2e2e2e" viewBox="0 0 24 24" className="absolute left-2" height="16" width="16">
            <path d="M16 12H8c-2.21 0-4-1.79-4-4s1.79-4 4-4h8c2.21 0 4 1.79 4 4s-1.79 4-4 4zm-8-6c-1.1 0-2 .9-2 2s.9 2 2 2h8c1.1 0 2-.9 2-2s-.9-2-2-2H8zm12 12h-2v-2c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4v2H2v2h20v-2h-2zm-4 0H8v-2c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2z" />
          </svg>
          <input
            placeholder="Username"
            id="Username"
            onChange={changeUSers}
            className="w-full h-10 bg-transparent border-none border-b-2 border-gray-400 rounded-full pl-8 focus:outline-none focus:border-purple-400 text-black text-sm font-medium"
            type="text"
          />
        </div>

        {/* Email Input */}
        <div className="w-full relative flex items-center justify-center mb-6 border border-teal-500 rounded-xl">
          <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="absolute left-2">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            placeholder="Email"
            id="Email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            onChange={changeUSers}
            className="w-full h-10 bg-transparent border-none border-b-2 border-gray-400 rounded-full pl-8 focus:outline-none focus:border-purple-400 text-black text-sm font-medium"
            type="email"
          />
        </div>

        {/* Password Input */}
        <div className="w-full relative flex items-center justify-center mb-4 border border-teal-500 rounded-xl">
          <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="absolute left-2">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="Password"
            id="Password"
            onChange={changeUSers}
            className="w-full h-10 bg-transparent border-none border-b-2 border-gray-400 rounded-full pl-8 focus:outline-none focus:border-purple-400 text-black text-sm font-medium"
            type="password"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Signup Button */}
        <button
          disabled={isLoading}
          className="bg-teal-500 hover:bg-teal-600 text-white w-full py-2 px-4 rounded-xl font-bold text-sm focus:outline-none mt-4"
          type="submit"
        >
          {isLoading ? 'Signing up...' : 'Create Account'}
        </button>

        <div className="mt-4">
          <span className="text-xs">Already have an account?{" "}</span>
          <button className="text-xs font-bold text-purple-500 hover:underline" onClick={gotologinpage}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
