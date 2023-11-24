import ViewListing from '@/components/pages/ViewListing.js'
import React from 'react'
import dynamic from 'next/dynamic'

function page() {
    return (
        <ViewListing />
    )
}

const listingData = dynamic(() => Promise.resolve(page), { ssr: false })

export default listingData