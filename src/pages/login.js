import Login from '../components/pages/Login';
import React from 'react'
import dynamic from 'next/dynamic'

const page = () => {
    return (
        <Login />
    )
}

const login = dynamic(() => Promise.resolve(page), { ssr: false })

export default login;