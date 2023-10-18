import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ContactForm() {
    return (
        <div className='contact_us_comp' id='contact_us'>
            <div className='contact_us_wrapper'>
                <div className='contact_sec_top'>
                    <div className='contact_top_left'>
                        <span className='contact_title'>Contact Us</span>
                        <h1 className='contact_heading'>The right move to choose your new home.</h1>
                    </div>
                </div>
                <div className='contact_sec_bottom'>
                    <div className='contact_details'>
                        <h4 className='address_title'>
                            <HomeRoundedIcon />
                            <span>Builder Floor</span>
                        </h4>
                        <div className='contact_address addr_item'>C1069, SUSHANT LOK-1, GURGAON ( HARAYANA)</div>
                        <div className='contact_number addr_item'>+91 88045 04504</div>
                        <div className='contact_email addr_item'>contact@BuilderFloor.com</div>
                    </div>
                    <form className='contact_form'>
                        <input type="text" placeholder='Enter your name' className='contact_input oneline_input' />
                        <input type="text" placeholder='Company (optional)' className='contact_input oneline_input' />
                        <input type="email" placeholder='Your email' className='contact_input oneline_input' />
                        <input type="text" placeholder='Phone number' className='contact_input oneline_input' />
                        <textarea id="" rows="10" placeholder='Tell us about yourself' className='contact_input multiline_input'></textarea>
                        <div className='form_controls'>
                            <button type='submit' className='contact_submit'>
                                <span className='btn_label'>Send Message</span>
                                <ArrowForwardIcon className='btn_icon' />
                            </button>
                            <p className='contact_note'>By clicking Send Message button, you agree our terms and policy.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;