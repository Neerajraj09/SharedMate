import React from "react";

function Tripmember({member, index}){

    const username = member._id.username;
    const fullname = member._id.fullname;
    const totalSpend = member.totalSpend;

    return(
        <>
            <div className="justify-between h-[48px] md:h-[50px] hover:bg-gray-100 bg-gray-50 border border-black py-[5px] flex px-3 my-2 mx-1 rounded-md min-w-screen">
                <p className="text-lg py-1 md:text-2xl flex mb-1 font-medium">{index}. {username}
                    <p className="mx-[3px] md:mx-2 text-md md:text-xl lg:text-xl xl:text-xl font-normal">({fullname})</p>
                </p>
                <p className="text-xl md:text-2xl lg:text-2xl xl:text-2xl text-green-500 font-semibold">{totalSpend}</p>
            </div>
            
        </>
    );
}

export default Tripmember;