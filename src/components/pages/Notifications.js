import React from 'react'
import RenderComponent from '../customComponents/ComponentRenderer'
import { NOTIFICATIONS_LIST } from '@/ScreenJson.js'

const Notifications = () => {
    return (
        <>
            <div className={`standalone_page stats_page`}>
                <RenderComponent jsonToRender={NOTIFICATIONS_LIST} />
            </div>
        </>
    )
}

export default Notifications