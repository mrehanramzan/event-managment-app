import React from 'react'
import { AppContext } from '../context/AppContext.jsx';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import FormInput from '../components/FormInput.jsx';
import CustomButton from "../components/CustomButton.jsx";
import { toast } from 'react-toastify';
import axios from "axios";

export default function Signup() {

    const { backendUrl, loggedIn } = useContext(AppContext);
    const navigate = useNavigate();
    const [signupData, setSignupData ] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const { data } = await axios.post(`${backendUrl}/api/auth/register`,signupData);
            navigate("/login");
        }catch(error){
            if(error.response) toast.error(error.response.data.message); 
            else toast.error("Please try again later")
        }
    }

    const handleChange = (e) => {
        setSignupData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        loggedIn ? <Navigate to="/" />
            :
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            label="Full name"
                            value={signupData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            name="fullname"
                        />
                        <FormInput
                            label="Email"
                            type="email"
                            value={signupData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required={true}
                            name="email"
                        />
                        <FormInput
                            label="Password"
                            type="password"
                            value={signupData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required={true}
                            name="password"
                        />

                        <CustomButton
                            label="Sign up"
                        />

                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
    )
}
