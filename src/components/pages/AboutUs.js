import React from 'react';
import RenderComponent from '../customComponents/ComponentRenderer.jsx';
import { ABOUTUS_SCREEN } from '../../ScreenJson.js';

function AboutUs() {
    return (
        <div className='aboutus-screen'>
            <RenderComponent jsonToRender={ABOUTUS_SCREEN} />
        </div>
    );
}

export default AboutUs;