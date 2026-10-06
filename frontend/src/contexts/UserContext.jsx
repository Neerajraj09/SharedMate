import { createContext, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";

const UserContext = createContext();

export const UserProvider = ({ children })=>{
    const[userInfo,setUserInfo]=useState(null);
    const[isUserLoading, setIsUserLoading]=useState(false);

    const getUser = async ()=>{
        setIsUserLoading(true);
        try{
            const res = await axiosInstance.get("/api/users/me");
            setUserInfo(res.data.user);
        }catch(err){
            console.log(err);
        }finally{
            setIsUserLoading(false);
        }
    };

    return(
        <UserContext.Provider value={{ userInfo, isUserLoading, getUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const currUser = ()=>{
    const context  = useContext(UserContext);
    if(!context){
        throw new Error("Error fetching current logged in user");
    }
    return context;
}