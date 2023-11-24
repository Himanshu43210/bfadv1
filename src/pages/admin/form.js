import FormPage from '@/components/pages/FormPage'
import React from 'react'
import dynamic from 'next/dynamic'

function page() {
  return (
    <FormPage />
  )
}

const form = dynamic(() => Promise.resolve(page), { ssr: false })

export default form