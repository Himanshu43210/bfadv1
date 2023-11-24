import ApproveAgents from '@/components/pages/ApproveAgents'
import React from 'react'
import dynamic from 'next/dynamic'

function page() {
  return (
    <ApproveAgents />
  )
}

const approveAgents = dynamic(() => Promise.resolve(page), { ssr: false })

export default approveAgents