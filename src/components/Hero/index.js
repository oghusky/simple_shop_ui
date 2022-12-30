import React from 'react'
import './Hero.css'
export default function Hero({name,urlName}) {
  return (
    <div className='Hero d-flex flex-column justify-content-center align-items-center mb-3'>
      <h1 id="hero-h1">{name}</h1>
      <p>/{urlName}</p>
    </div>
  )
}
