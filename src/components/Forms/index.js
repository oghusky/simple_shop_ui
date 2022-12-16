import React from 'react'

export default function Form({ formTitle, children }) {
    return (
        <div style={{ padding: "20px" }}>
            <h3 style={{ textAlign: "center" }}>{formTitle}</h3>
            {children}
        </div>
    )
}