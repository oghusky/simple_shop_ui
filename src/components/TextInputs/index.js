import React from 'react'

export default function TextInput({ label, type, placeholder, name, onChange, value, onBlur, onFocus}) {
    return (
        <div className='mb-3'>
            <label htmlFor={name}>{label}</label><br />
            <input
                style={{width: "100%"}}
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