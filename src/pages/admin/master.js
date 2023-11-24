import React from 'react'
import MasterManagement from "@/components/pages/MasterManagement.js";
import dynamic from 'next/dynamic'

function page() {
  return (
    <MasterManagement />
  )
}

const master = dynamic(() => Promise.resolve(page), { ssr: false })

export default master