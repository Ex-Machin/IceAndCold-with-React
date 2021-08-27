import React from 'react'
import './errorMessage.css'
import img from './error.jpg'

const ErrorMessage = () => {
    return (
        <>
            <img src={img} alt="error" />
            <span>Something went wrong. Please try again</span>
        </>
    )
}

export default ErrorMessage