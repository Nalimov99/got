import React from 'react';
import './errorBlock.css';

const ErrorBlock = ({message = "component error", onErrorRefresh}) => {
    return (
        <>
            <div className='error-circle' onClick ={onErrorRefresh}>
                <div>X</div>
            </div>
            <span className='error-message'>Error: {message}</span>
        </>
    )
}

export default ErrorBlock;