import { useContext } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const fetchUser = async()=>{
        try{
            const { data } = await axios.get(`${backendUrl}/api/user/`,{withCredentials:true});
            console.log(data);
            setUser(data.user);
        }catch(error){
            if(error.response) toast.error(error.response.data.message); 
            else toast.error("Error fetching user");
        }
    }


    const value = {
        backendUrl,
        loggedIn, setLoggedIn,
        user, setUser,
        fetchUser
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}