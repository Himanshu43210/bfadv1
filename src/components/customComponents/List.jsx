import React from 'react'

const List = ({ component }) => {
    return (
        <ul className={`list ${component.className}`}>
            {
                component.children?.map((item, index) => (
                    <li className={`li ${component.itemClass}`}>
                        {item.heading && <span className='blog_para li_heading'>{item.heading} </span>}
                        <span className='blog_para'>{item.text}</span>
                    </li>
                ))
            }
        </ul>
    )
}

export default List;