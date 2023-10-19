import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function AboutHero() {
    return (
        <div className='about_hero_comp'>
            <div className='about_hero_wrapper'>
                <div className='hero_left'>
                    <h1 className='hero_title'>Find Your Dream Builder Floor Today</h1>
                    <p className='hero_subtitle'>We understand the importance of transparency in the real estate</p>
                    <a href="#contact_us" className='contact_submit hero_action_btn'>
                        <span className='btn_label action_btn_label'>Contact Us</span>
                        <ArrowForwardIcon className='btn_icon' />
                    </a>
                </div>
                <div className='hero_right'>

                </div>
            </div>
        </div>
    )
}

export default AboutHero;