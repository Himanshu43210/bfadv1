import React from 'react';
import RenderComponent from '../customComponents/ComponentRenderer';
import { BLOG_SCREEN } from '../../ScreenJson';

function Blog() {
    return (
        <div className='blog-screen'>
            <RenderComponent jsonToRender={BLOG_SCREEN} />
            {/* <iframe
                title='Our Blog'
                className='frame_page'
                src='https://builder-floor-flax.vercel.app/blog'
            ></iframe> */}
        </div>
    );
}

export default Blog;