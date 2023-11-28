import React from 'react';
import dynamic from 'next/dynamic'
import ManageReachOutCustomers from '@/components/pages/ManageReachOutCustomers';

const page = () => {
    return (
        <ManageReachOutCustomers />
    );
};

const reachOutCustomers = dynamic(() => Promise.resolve(page), { ssr: false })

export default reachOutCustomers;