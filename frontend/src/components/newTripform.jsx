import { MdClose } from "react-icons/md"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";


function Newtrip({toggleForm, handleMembers, setbtnVisible, getAllTrips}){

    const [change,setChange] = useState("");
    const navigate = useNavigate();

    function changeEvent(event) {
        const { id, value } = event.target;
        setChange(prevState => ({
          ...prevState,
          [id]: value
        }));  
      }

    const handleClose=()=>{
        toggleForm();
        setbtnVisible(true);
    }

    const handleCreate= async ()=>{
        try{
            const response = await axiosInstance.post('/newTrip',{change});
            console.log(response);
            navigate('/dashboard');
            getAllTrips();
            toggleForm();
            console.log(change);
        }catch(err){
            console.log(err);
        }
       
    }

    return(
        <>
            <div className="h-[185px] w-[240px] bg-gray-200 rounded-xl py-4 px-4 border border-black">
                <h4 className="mb-4 text-xl font-semibold">Create New Trip</h4>
                <p className="pr-[100px] pb-[3px]">Name of trip:</p>
                <div>
                    <input placeholder="Enter Trip Name" className="px-2 py-4 rounded-lg h-[32px] w-[200px] border border-black"
                    id="tripName"
                    onChange={changeEvent} 
                     >
                    </input>
                    <div className="flex justify-around ">
                    <button onClick={handleClose} className="h-[30px] w-2/5 rounded-2xl bg-gray-500 hover:bg-gray-600 my-4 text-white">Close</button>
                    <button onClick={handleCreate} className="h-[30px] w-2/5 rounded-2xl bg-teal-500 hover:bg-teal-600 my-4 text-white"
                    >Create</button>
                    </div>
                </div>
                <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
            >
                <MdClose className="text-xl text-slate-400" />
            </button>
            </div>
        </>
    );
}

export default Newtrip