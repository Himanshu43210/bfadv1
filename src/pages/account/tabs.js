import AccountTabs from '@/components/pages/AccountTabs.js'
import React from 'react'
import dynamic from 'next/dynamic'

const page = () => {
  return (
    <AccountTabs />
  )
}

const tabs = dynamic(() => Promise.resolve(page), { ssr: false })

export default tabs