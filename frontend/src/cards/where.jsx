import React from "react";

function Where({where}){
    return(
        <>
        <div className="h-16 w-40 md:h-20 md:w-60 bg-gray-50 border border-teal-700 rounded-2xl">
            
                <p className="text-sm mx-2 md:text-xl flex md:mx-4">{where}</p>
            
        </div>
        </>
    );
}

export default Where;