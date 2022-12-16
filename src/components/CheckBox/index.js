import React from 'react'

export default function Checkbox({ id, value, label, onChange }) {
    return (
        <div>
            <input type="checkbox" id={id} name={id} value={value} onChange={onChange} />
            <label htmlFor={id}> {label}</label><br />
        </div>
    )
}