import UserManagement from '@/components/pages/SuperUserManagement'
import React from 'react'
import dynamic from 'next/dynamic'

function page() {
  return (
    <UserManagement />
  )
}

const user = dynamic(() => Promise.resolve(page), { ssr: false })

export default user