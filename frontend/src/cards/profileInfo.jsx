// src/cards/ProfileInfo.js
import React from "react";

// Utility function to get initials from the user's name
const getInitials = (name) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    return names.length > 1
        ? (names[0].charAt(0) + names[1].charAt(0)).toUpperCase()
        : names[0].charAt(0).toUpperCase();
};

const ProfileInfo = ({ userInfo, onLogout, handleProfile }) => {
    return (
        userInfo && (
            <div className="flex items-center gap-2 p-2 sm:p-4">
                <div className="w-12 h-12 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-slate-900 bg-slate-100 font-medium"
                    onClick={handleProfile}
                >
                    {getInitials(userInfo.fullname)}
                </div>
                    {/* <div>
                        <p className="text-md sm:text-md font-medium">{userInfo.username}</p>
                        <button
                            className="text-md sm:text-sm text-slate-700 underline"
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </div> */}
            </div>
        )
    );
};

export default ProfileInfo;
