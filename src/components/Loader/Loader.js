import React from 'react'
import './loader.css'

export default function Loader({ props }) {
    return (
        <>
            <div className='loader'></div>
            <p>{props.toUpperCase()} is Loading...</p>
        </>
    )
}
