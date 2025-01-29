import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Header = () => {

    const { loggedIn, setLoggedIn, setUser, backendUrl } = useContext(AppContext);
    
    const handleLogout = async () => {
        try {     
            await axios.get(`${backendUrl}/api/users/logout`, { withCredentials: true });
            setUser(null);
            setLoggedIn(false);
            navigate("/login");
        } catch (error) {
            console.log(error)
            toast.error("Logout failed. Please try again.");
        }
    }


    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-semibold">
                    <Link to="/" className="hover:text-gray-300">Events App</Link>
                </div>

                <nav className="space-x-6">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    {
                        loggedIn ?
                            <>
                                <Link to="/event" className="hover:text-gray-300">Event</Link>
                                <Link onClick={handleLogout} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300 ease-in-out">
                                    Logout
                                </Link>
                            </>
                            :
                            <Link to="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300 ease-in-out">
                                Login
                            </Link>
                    }
                </nav>
            </div>
        </header>
    );
}

export default Header;