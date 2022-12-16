import React from 'react'

export default function TextInput({ label, type, placeholder, name, onChange, value, onBlur, onFocus}) {
    return (
        <div>
            <label htmlFor={name}>{label}</label><br />
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                onFocus={onFocus}
            />
        </div>
    )
}