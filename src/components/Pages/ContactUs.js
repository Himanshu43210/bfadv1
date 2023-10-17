import React from 'react';
import RenderComponent from '../customComponents/ComponentRenderer';
import { ABOUTUS_SCREEN } from '../../ScreenJson';

function ContactUs() {
    return (
        <div className='contactus_page'>
            <RenderComponent jsonToRender={ABOUTUS_SCREEN} />
            {/* <iframe
                title='Contact Us'
                className='frame_page'
                src='https://builder-floor-flax.vercel.app/about'
            ></iframe> */}
        </div>
    );
}

export default ContactUs;