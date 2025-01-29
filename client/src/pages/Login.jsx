import React from 'react'
import { AppContext } from '../context/AppContext.jsx';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import FormInput from '../components/FormInput.jsx';
import CustomButton from "../components/CustomButton.jsx";
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Login() {


    const { backendUrl, setLoggedIn, fetchUser } = useContext(AppContext);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/login`, loginData, { withCredentials: true });
            await fetchUser();
            setLoggedIn(true);
            navigate("/");
        } catch (error) {
            if (error.response) toast.error(error.response.data.message);
            else toast.error("Please try again later")
        }
    }

    const handleChange = (e) => {
        setLoginData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Email"
                        type="email"
                        value={loginData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required={true}
                        name="email"
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required={true}
                        name="password"
                    />

                    <CustomButton
                        label="Log in"
                    />
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}
