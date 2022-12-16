import React from 'react'

export default function Button({ onClick, text, cssClass, disabled }) {
    return (
        <div className="my-3">
            <button className={cssClass} disabled={disabled} onClick={onClick}>{text}</button>
        </div>
    )
}