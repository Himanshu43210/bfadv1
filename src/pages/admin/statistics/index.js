import React from 'react'
import StatsList from "@/components/pages/StatsList.js";
import dynamic from 'next/dynamic'

function page() {
  return (
    <StatsList />
  )
}

const statslist = dynamic(() => Promise.resolve(page), { ssr: false })

export default statslist