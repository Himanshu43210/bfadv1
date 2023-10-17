import React from 'react';
import RenderComponent from '../customComponents/ComponentRenderer';
import { ABOUTUS_SCREEN } from '../../ScreenJson';

function AboutUs() {
    return (
        <div className='aboutus-screen'>
            <RenderComponent jsonToRender={ABOUTUS_SCREEN} />
            {/* <iframe
                title='About Us'
                className='frame_page'
                src='https://builder-floor-flax.vercel.app/about'
            ></iframe> */}
        </div>
    );
}

export default AboutUs;