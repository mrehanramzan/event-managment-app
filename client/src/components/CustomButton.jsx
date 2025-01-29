import React from 'react';

const CustomButton = ({ label, handleClick=()=>{} }) => {
    return (
        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleClick}
        >
            {label}
        </button>
    );
};

export default CustomButton;