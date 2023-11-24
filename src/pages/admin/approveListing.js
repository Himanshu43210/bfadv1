import ApproveListing from '@/components/pages/ApproveListings'
import React from 'react'
import dynamic from 'next/dynamic'

function page() {
  return (
    <ApproveListing />
  )
}

const approveListing = dynamic(() => Promise.resolve(page), { ssr: false })

export default approveListing