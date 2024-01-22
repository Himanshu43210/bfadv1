import React from 'react';
import HeaderComp from '../newComponents/HeaderComp.jsx';
import AboutHero from '../customComponents/AboutHero.jsx';
import Heading from '../customComponents/Heading.jsx';
import List from '../customComponents/List.jsx';
import ContactForm from '../customComponents/ContactForm.jsx';
import Footer from '../customComponents/Footer.jsx';
import ScrollToTop from '../customComponents/ScrollToTop.jsx';
import Chatbot from '../customComponents/Chatbot.jsx';

function AboutUs() {
    return (
        <div className='aboutus-screen'>
            <HeaderComp />
            <div className={`component_wrapper ${'about_us_container'}`}>
                <div className={`component_wrapper ${''}`}>
                    <AboutHero />
                </div>
                <div className={`component_wrapper ${'aboutus_section'}`}>
                    <div className={`component_wrapper ${'about_content'}`}>
                        <div className={`component_wrapper ${'section_title aboutus_title'}`}>
                            <Heading component={{
                                tag: "h1",
                                className: "section_title aboutus_title",
                                text: "About Us?"
                            }} />
                        </div>
                        <div className={`component_wrapper ${'blog_para'}`}>
                            <Heading component={{
                                tag: "p",
                                className: "blog_para",
                                text: "At BuilderFloor.com, we are dedicated to helping you find your dream builder floor in the vibrant city of Gurgaon. We understand that finding the perfect builder floor is an important and exciting journey, and we are here to make that process seamless and enjoyable for you."
                            }} />
                        </div>
                        <div className={`component_wrapper ${'blog_para'}`}>
                            <Heading component={{
                                tag: "p",
                                className: "blog_para",
                                text: "Our platform exclusively focuses on new builder floors in Gurgaon, offering a wide range of options at all price points and locations. Whether you're a first-time buyer, a growing family, or an investor looking for a lucrative opportunity, we have the right builder floor to meet your unique requirements."
                            }} />
                        </div>
                        <div className={`component_wrapper ${'blog_para'}`}>
                            <Heading component={{
                                tag: "p",
                                className: "blog_para",
                                text: "We know and very well understand that finding and selecting a Builder Floor for one self is really a tough job. It is our endeavour to help you find the best match for you within your budget and also according to your taste & requirement. We have brought the world of builder floors at your door steps with the help of our verified channel partners."
                            }} />
                        </div>
                        <div className={`component_wrapper ${'blog_para'}`}>
                            <Heading component={{
                                tag: "h1",
                                className: "section_title aboutus_title",
                                text: "Why Choose BuilderFloor.Com?"
                            }} />
                        </div>
                        <div className={`component_wrapper ${''}`}>
                            <List component={{
                                subtype: "ul",
                                children: [
                                    {
                                        heading: "Extensive Selection:",
                                        text: "Our comprehensive database showcases a diverse collection of new builder floors in Gurgaon. From affordable options to luxury residences, we have something to suit every taste and budget.",
                                    },
                                    {
                                        heading: "Trusted Channel Partners:",
                                        text: "We collaborate with reputed Channel Partners who in turn contact different builders and developers in Gurgaon with a proven track record of delivering quality constructions and enlist the best builder floors on our platform which meet the highest standards of craftsmanship and design.",
                                    },
                                    {
                                        heading: "Location Expertise:",
                                        text: "Gurgaon is a dynamic city with numerous neighborhoods and localities, each with its own charm and amenities. Our channel partners are a team of real estate professionals, who have in-depth knowledge of the Gurgaon market and can guide you towards the ideal location that aligns with your lifestyle and preferences.",
                                    },
                                    {
                                        heading: "Personalized Assistance:",
                                        text: "Our channel partners will provide a personalized experience to every customer. They, as a team, are dedicatedly ready to assist you throughout your home-buying journey, offering expert advice, answering your queries, and facilitating smooth transactions.",
                                    },
                                    {
                                        heading: "Transparent Information:",
                                        text: "We understand the importance of transparency in the real estate industry. On BuilderFloor.com, you will find detailed information, including floor plans, specifications, amenities, and pricing, empowering you to make informed decisions.",
                                    },
                                ]
                            }} />
                        </div>
                        <div className={`component_wrapper ${'blog_para'}`}>
                            <Heading component={{
                                tag: "p",
                                className: "blog_para",
                                text: "At BuilderFloor.com, our mission is to simplify your search for the perfect builder floor and help you embark on a new chapter of your life. We are passionate about real estate and committed to exceeding your expectations."
                            }} />
                        </div>
                        <div className={`component_wrapper ${'blog_para'}`}>
                            <Heading component={{
                                tag: "p",
                                className: "blog_para",
                                text: "Start exploring our listings today and let us be your trusted partner in finding your dream builder floor in Gurgaon."
                            }} />
                        </div>
                    </div>
                </div>
                <div className={`component_wrapper ${''}`}>
                    <ContactForm />
                </div>
            </div>
            <div className={`component_wrapper ${''}`}>
                <Footer />
            </div>
            <div className={`component_wrapper ${''}`}>
                <ScrollToTop />
            </div>
            <div className={`component_wrapper ${''}`}>
                <Chatbot />
            </div>
        </div>
    );
}

export default AboutUs;