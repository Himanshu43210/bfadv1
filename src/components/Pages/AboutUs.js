import React from 'react';
import RenderComponent from '../customComponents/ComponentRenderer';
import { ABOUTUS_SCREEN } from '../../ScreenJson';

function AboutUs() {
    return (
        <div className='aboutus-screen'>
            <RenderComponent jsonToRender={ABOUTUS_SCREEN} />
        </div>
    );
}

export default AboutUs;