import React from 'react';
import RenderComponent from '../customComponents/ComponentRenderer.jsx';
import { BLOG_SCREEN } from '../../ScreenJson.js';

function Blog() {
    return (
        <div className='blog-screen'>
            <RenderComponent jsonToRender={BLOG_SCREEN} />
        </div>
    );
}

export default Blog;