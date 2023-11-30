import React from 'react'

const Badge = ({ value }) => {
    return (
        <div className='badge_wrapper'>
            <span className='badge_value'>{value}</span>
        </div>
    )
}

export default Badge