import React from 'react'

export default function SaveImage({ name, value, onChange }) {
    return (
        <div>
            <input name={name} value={value} onChange={onchange} type="file" />
        </div>
    )
}
