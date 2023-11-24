import SearchResult from '@/components/pages/SearchResult.js'
import dynamic from 'next/dynamic'
import React from 'react'

const sr = () => {
  return (
    <SearchResult />
  )
}

const searchResult = dynamic(() => Promise.resolve(sr), { ssr: false })

export default searchResult