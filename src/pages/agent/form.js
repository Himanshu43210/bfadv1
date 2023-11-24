import GeneralFormPage from '@/components/pages/GeneralFormPage.js';
import React from 'react'
import dynamic from 'next/dynamic'

const page = () => {
    return (
        <GeneralFormPage />
    )
}

const form = dynamic(() => Promise.resolve(page), { ssr: false })

export default form;