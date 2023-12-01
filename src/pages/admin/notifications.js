import React from 'react'
import dynamic from 'next/dynamic'
import Notifications from '@/components/pages/Notifications.js'

const page = () => {
    return (
        <Notifications />
    )
}

const notifications = dynamic(() => Promise.resolve(page), { ssr: false })

export default notifications