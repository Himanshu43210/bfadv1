import React from 'react'
import SuperMasterTable from "@/components/pages/SuperMasterTable.js";
import dynamic from 'next/dynamic'

function page() {
    return (
        <SuperMasterTable />
    )
}

const masterTable = dynamic(() => Promise.resolve(page), { ssr: false })

export default masterTable