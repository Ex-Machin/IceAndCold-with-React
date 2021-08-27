import React from 'react'
import './errorMessage.css'
import gif from './giphy.gif'

const ErrorMessage = () => {
    return (
        <>
            <img src={gif} alt="error" />
            <span>Something went wrong. Please try again</span>
        </>
    )
}

export default ErrorMessage