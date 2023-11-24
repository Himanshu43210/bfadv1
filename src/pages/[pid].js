import Head from 'next/head'
import DetailedView from '@/components/pages/DetailedView'
import React from 'react'
import { API_ENDPOINTS } from '@/redux/utils/api';

function getStringAfterLastHyphen(inputString) {
    // Split the input string into an array using "-" as the separator
    const parts = inputString.split("-");

    // If there is only one part or the last character of the inputString is "-", return an empty string
    if (parts.length === 1 || inputString.endsWith("-")) {
        return "";
    }

    // Otherwise, return the last part of the array
    return parts[parts.length - 1];
}

const pid = (props) => {
    const { data } = props;
    // console.log('---------- data -------------', data, props);
    return (
        <>
            <Head>
                <title>{data?.title}</title>
                <meta name="description" content={data?.description} />
            </Head>
            <DetailedView />
        </>
    )
}

export async function getServerSideProps(context) {
    const { pid } = context.query;
    // console.log('------------- params ---------------', pid);
    const id = getStringAfterLastHyphen(pid);
    const api = API_ENDPOINTS["getCardData"] + `?id=${id}`;
    const res = await fetch(api, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return { props: { data: data?.data } }
}

export default pid
