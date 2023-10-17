import React from 'react';
import RenderComponent from '../customComponents/ComponentRenderer';
import { BLOG_SCREEN } from '../../ScreenJson';

function Blog() {
    return (
        <div className='blog-screen'>
            <RenderComponent jsonToRender={BLOG_SCREEN} />
        </div>
    );
}

export default Blog;