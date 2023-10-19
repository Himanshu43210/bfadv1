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
                    <div className='hero_img_container'>
                        <img src="/icons/banner.png" alt="" className='hero_img' />
                    </div>
                    <div className='hero_right_entity'>
                        <div className='hre_left'>
                            <img src="/icons/icon-officer.svg" alt="" className='hre_icon' />
                        </div>
                        <div className='hre_right'>
                            <span className='hre_entity_data'>+5k</span>
                            <p className='hre_entity_label'>Verified Builder Floors Alloted</p>
                        </div>
                    </div>
                    <div className='hero_right_entity'>
                        <div className='hre_left'>
                            <img src="/icons/icon-officer.svg" alt="" className='hre_icon' />
                        </div>
                        <div className='hre_right'>
                            <span className='hre_entity_data'>+30</span>
                            <p className='hre_entity_label'>Verified Channel Partners</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutHero;