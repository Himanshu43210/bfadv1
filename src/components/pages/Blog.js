import React from 'react';
import HeaderComp from '../newComponents/HeaderComp.jsx';
import Heading from '../customComponents/Heading.jsx';
import List from '../customComponents/List.jsx';
import Footer from '../customComponents/Footer.jsx';
import ScrollToTop from '../customComponents/ScrollToTop.jsx';
import Chatbot from '../customComponents/Chatbot.jsx';

function Blog() {
    return (
        <div className='blog-screen'>
            <HeaderComp />
            <div className={`component_wrapper ${'our_blog_container'}`}>
                <div className={`component_wrapper ${'page_content_container'}`}>
                    <div className={`component_wrapper ${'page_title'}`}>
                        <Heading component={{
                            className: "page_title",
                            text: "Our Blog",
                        }} />
                    </div>
                    <div className={`component_wrapper ${'blog_container'}`}>
                        <div className={`component_wrapper ${'section_title'}`}>
                            <Heading component={{
                                tag: "h1",
                                className: "section_title",
                                text: "The Perfect Builder Floor Is An Important And Exciting Journey"
                            }} />
                        </div>
                        <div className={`component_wrapper ${'blog_para'}`}>
                            <Heading component={{
                                tag: "p",
                                className: "blog_para",
                                text: "A builder floor refers to an independent residential unit or apartment that is typically constructed by a builder or developer on a single plot of land. In simple terms, it is a low-rise building that consists of multiple floors, with each floor being a separate dwelling unit."
                            }} />
                        </div>
                        <div className={`component_wrapper ${'blog_para'}`}>
                            <Heading component={{
                                tag: "p",
                                className: "blog_para",
                                text: "Builder Floors are commonly found in urban areas, particularly in cities and towns where land availability is limited. They are often built as a part of a larger housing project or as standalone structures. Each floor of a Builder Floor usually has its own separate entrance, and the building usually has an elevator."
                            }} />
                        </div>
                        <div className={`component_wrapper ${'blog_para'}`}>
                            <Heading component={{
                                tag: "p",
                                className: "blog_para",
                                text: "These residential units are designed to provide more privacy and independence compared to traditional apartment buildings or multi-story complexes. Each floor is typically owned by a different individual or family, and they may have control over the design and layout of their respective units. Builder floors can vary in size and configuration, ranging from small apartments to spacious duplexes or triplexes."
                            }} />
                        </div>
                        <div className={`component_wrapper ${'blog_para'}`}>
                            <Heading component={{
                                tag: "p",
                                className: "blog_para",
                                text: `It's important to note that the term "Builder Floor" may have different regional interpretations and can vary in its exact meaning and characteristics depending on the specific location.`
                            }} />
                        </div>
                        <div className={`component_wrapper ${'section_title'}`}>
                            <Heading component={{
                                tag: "h1",
                                className: "section_title",
                                text: "Advantages Of Purchasing A Builder Floor:"
                            }} />
                        </div>
                        <div className={`component_wrapper`}>
                            <List component={{
                                subtype: "ul",
                                children: [
                                    {
                                        heading: "Privacy:",
                                        text: "Each floor is a separate unit, providing more privacy and fewer shared common areas compared to high-rise apartment buildings.",
                                    },
                                    {
                                        heading: "Customization:",
                                        text: "Owners have more flexibility in customizing their living spaces according to their preferences and needs.",
                                    },
                                    {
                                        heading: "Lower Density:",
                                        text: "As builder floors are usually low-rise buildings, the number of units per floor is typically lower, resulting in a lower population density and potentially a quieter living environment.",
                                    },
                                    {
                                        heading: "Exclusivity:",
                                        text: "Builder floors often cater to a niche market and can be associated with a certain level of exclusivity or premium status.",
                                    },
                                    {
                                        heading: "Lower Maintenance Charges:",
                                        text: "Builder Floor has lower maintenance charges as compared to high rise Apartment. You have to pay even for those services which you never use.",
                                    },
                                    {
                                        heading: "Unbeatable Edge:",
                                        text: "Builder floor owner also gets proportionate land share rights of the plot underneath. Since the prices of land increase considerably over a passage of time, the owner of builder floor gets benefit of the same indirectly.",
                                    },
                                    {
                                        heading: "Peace Of Mind:",
                                        text: "Builder floor owner feels much safer in the event of earthquake or fire.",
                                    },
                                ]
                            }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`component_wrapper`}>
                <Footer />
            </div>
            <div className={`component_wrapper`}>
                <ScrollToTop />
            </div>
            <div className={`component_wrapper`}>
                <Chatbot />
            </div>
        </div>
    );
}

export default Blog;