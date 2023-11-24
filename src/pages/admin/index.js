import AdminHome from '@/components/pages/AdminHome'
import React from 'react'
import dynamic from 'next/dynamic'

const page = () => {
    return (
        <AdminHome />
    )
}

const admin = dynamic(() => Promise.resolve(page), { ssr: false })

export default admin