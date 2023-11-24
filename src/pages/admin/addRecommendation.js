import AddRecommendations from '@/components/pages/AddRecommendations'
import React from 'react'
import dynamic from 'next/dynamic'

function page() {
  return (
    <AddRecommendations />
  )
}

const addRecommendation = dynamic(() => Promise.resolve(page), { ssr: false })

export default addRecommendation