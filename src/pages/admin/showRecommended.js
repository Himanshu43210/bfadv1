import ShowRecommended from '@/components/pages/ShowRecommended'
import React from 'react'
import dynamic from 'next/dynamic'

function page() {
  return (
    <ShowRecommended />
  )
}

const showRecommended = dynamic(() => Promise.resolve(page), { ssr: false })

export default showRecommended