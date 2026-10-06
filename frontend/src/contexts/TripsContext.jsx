import { createContext, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";

const TripsContext = createContext();

export const TripsProvider = ({ children })=>{
    const[trips,setTrips] = useState([]);
    const[isAllTripsLoading,setIsAllTripsLoading]=useState(false);

    const getAllTrips = async()=>{
        setIsAllTripsLoading(true);
        try{
            const res = await axiosInstance.get("/api/trips");
            setTrips(res.data);
        }catch(err){
            console.log(err);
        }finally{
            setIsAllTripsLoading(false);
        }
    };

    return(
        <TripsContext.Provider value={{ trips, getAllTrips, isAllTripsLoading }}>
            {children}
        </TripsContext.Provider>
    );
};

export const useTrips = () => {
    const context = useContext(TripsContext);
    if(!context){
        throw new Error("Some error");
    }
    return context;
}