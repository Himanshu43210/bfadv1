import EditAccount from '@/components/pages/EditAccount'
import React from 'react'
import dynamic from 'next/dynamic'

function page() {
  return (
    <EditAccount />
  )
}

const edit = dynamic(() => Promise.resolve(page), { ssr: false })

export default edit