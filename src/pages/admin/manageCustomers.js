import CustomerManagement from '@/components/pages/CustomerManagement'
import React from 'react'
import dynamic from 'next/dynamic'

function page() {
  return (
    <CustomerManagement />
  )
}

const manageCustomers = dynamic(() => Promise.resolve(page), { ssr: false })

export default manageCustomers