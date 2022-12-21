import React from 'react'

export default function Selects({ onChange, children, value, name }) {
    return (
        <select onChange={onChange} value={value} name={name}>{children}</select>
    )
}
