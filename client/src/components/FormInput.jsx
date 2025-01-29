import React from 'react';

export default function FormInput ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    name
}){
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={label.toLowerCase()} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                type={type}
                id={label.toLowerCase()}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={placeholder}
                required={required}
                name={name}
            />
        </div>
    );
};