import CustomerEngagement from '@/components/pages/CustomerEngagement'
import React from 'react'
import dynamic from 'next/dynamic'

function page() {
  return (
    <CustomerEngagement />
  )
}

const customers = dynamic(() => Promise.resolve(page), { ssr: false })

export default customers