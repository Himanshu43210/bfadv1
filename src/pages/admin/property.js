import PropertyManagement from '@/components/pages/PropertyManagement'
import React from 'react'
import dynamic from 'next/dynamic'

function page() {
    return (
        <PropertyManagement />
    )
}

const property = dynamic(() => Promise.resolve(page), { ssr: false })

export default property