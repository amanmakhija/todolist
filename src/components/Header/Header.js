import React, { useEffect, useState } from 'react'
import './header.css'

export default function Header() {
    const [search, setSearch] = useState('');

    useEffect(() => {
        const path = window.location.pathname.split('/')[1];
        if (path) {
            setSearch(path.replace(path.charAt(0), path.charAt(0).toUpperCase()));
        }
    }, []);

    const redirect = (e) => {
        e.preventDefault();
        if (search) {
            window.location.href = `/${search}`;
        }
    }

    return (
        <div className='header'>
            <div className='header-logo'>ToDo List</div>
            <div className='header-search-box'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='search-bar' type="text" placeholder="Create or Search a List" />
                <button onClick={(e) => redirect(e)} className='search-btn'><i className='fa fa-search'></i></button>
            </div>
        </div>
    )
}
