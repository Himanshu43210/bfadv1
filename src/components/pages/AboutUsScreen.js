
    import React from "react";
    import {Card} from "react-bootstrap";
    import { useState } from "react";
    import { useDispatch } from "react-redux";
    import { resetFilterData, storeFilterData } from "../../redux/slice/filterSlice.js";
    import { callApi } from "../../redux/utils/apiActions.js";
    import MenuState from "../customComponents/MenuState.jsx";
import Header from "../customComponents/Header.jsx";
import AboutHero from "../customComponents/AboutHero.jsx";
import Heading from "../customComponents/Heading.jsx";
import List from "../customComponents/List.jsx";
import ContactForm from "../customComponents/ContactForm.jsx";
import Footer from "../customComponents/Footer.jsx";
import ScrollToTop from "../customComponents/ScrollToTop.jsx";

                export default function AboutUsScreen() {
                      const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as per your needs
  const dispatch = useDispatch();
  // const sliceData = useSelector((state) => state[component.sliceName]);
  const [sliceData, setSliceData] = useState({});

  const getData = (payload, component) => {
    console.log('++++++++++ payload : get data ++++++++++', payload, component.paginatioName || component.name);
    const page = (component.paginatioName || component.name) !== "page" ? sliceData.page : 0;
    let reqPayload = {};
    if (payload == null) {
      reqPayload = {
        budget: sliceData?.budget,
        city: sliceData?.city,
        page: page,
      };
    } else {
      reqPayload = {
        ...sliceData,
        [component.paginatioName || component.name]: (typeof payload === "object")
          ? Array.isArray(payload)
            ? payload
            : payload.value
          : payload,
      };
    }
    const markForDeletion = [];
    Object.keys(reqPayload).forEach((key) => {
      if (
        reqPayload[key] === false ||
        (Array.isArray(reqPayload[key]) && reqPayload[key].length === 0)
      ) {
        markForDeletion.push(key);
      }
      if (reqPayload[key] === true) {
        reqPayload[key] = "YES";
      }
    });
    markForDeletion.forEach(key => {
      delete reqPayload[key];
    });
    const options = {
      url: component.onClickApi,
      method: component.onClickApiMethod,
      headers: { "Content-Type": "application/json" },
      data: reqPayload,
    };
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (Object.keys(reqPayload).includes("budget")) {
      dispatch(callApi(options));
    }
  };

  const handleValueChange = (value, component) => {
    console.log('--------------- HANDLE VALUE CHANGE -------------', component.paginatioName || component.name, value, sliceData);
    if ((component.paginatioName || component.name) === "Reset") {
      // reset filters
      dispatch(resetFilterData({
        budget: sliceData?.budget,
        city: sliceData?.city,
        page: 0
      }));
      if (component.onClickApi) {
        getData(null, component);
      }
    } else {
      dispatch(
        storeFilterData({
          key: component.paginatioName || component.name,
          value:
            typeof value === "object"
              ? Array.isArray(value)
                ? value
                : value.value
              : value,
        })
      );
      console.log('============ CALLING THE GET DATA ONLY IF onClickApi ==============', component.onClickApi);
      if (component.onClickApi) {
        getData(value, component);
      }
    }
  };

  const handleLoadMore = (payload, component) => {
    const options = {
      url: component.api,
      method: component.apiType,
      headers: { "Content-Type": "application/json" },
      params: payload,
    };
    if (component.api) {
      dispatch(callApi(options));
    }
  };



                    return (
                        <Card className="aboutus-screen">
                            
                <div className="component_wrapper homeHeader" key="undefined" id="undefined">
                    
                <div className="component_wrapper menu_comp" key="undefined" id="undefined">
                    <MenuState component={{"type":"HAMBURGER_MENU","items":[{"name":"Home","path":"/","icon":"HOME"},{"name":"Login","path":"/login","icon":"LOGIN"},{"name":"About Us","path":"/about_us","icon":"ORG"},{"name":"Contact Us","path":"/about_us#contact_us","icon":"CONTACT"},{"name":"Our Blog","path":"/blog","icon":"DOC"}],"className":"menu_comp","text":"Menu"}}  />
                </div>
            
                <div className="component_wrapper page_header_comp" key="undefined" id="undefined">
                    <Header component={{"type":"PAGE_HEADER","url":"/","image":"/BUILDER.png","title":"BuilderFloor.com","titleMobile":"BuilderFloor","className":"page_header_comp"}}  />
                </div>
            
                </div>
            
                <div className="component_wrapper about_us_container" key="undefined" id="undefined">
                    
                <div className="component_wrapper undefined" key="undefined" id="undefined">
                    <AboutHero component={{"type":"ABOUT_HERO"}}  />
                </div>
            
                <div className="component_wrapper aboutus_section" key="undefined" id="undefined">
                    
                <div className="component_wrapper about_content" key="undefined" id="undefined">
                    
                <div className="component_wrapper section_title aboutus_title" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","tag":"h1","className":"section_title aboutus_title","text":"About Us?"}}  />
                </div>
            
                <div className="component_wrapper blog_para" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","tag":"p","className":"blog_para","text":"At BuilderFloor.com, we are dedicated to helping you find your dream builder floor in the vibrant city of Gurgaon. We understand that finding the perfect builder floor is an important and exciting journey, and we are here to make that process seamless and enjoyable for you."}}  />
                </div>
            
                <div className="component_wrapper blog_para" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","tag":"p","className":"blog_para","text":"Our platform exclusively focuses on new builder floors in Gurgaon, offering a wide range of options at all price points and locations. Whether you're a first-time buyer, a growing family, or an investor looking for a lucrative opportunity, we have the right builder floor to meet your unique requirements."}}  />
                </div>
            
                <div className="component_wrapper blog_para" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","tag":"p","className":"blog_para","text":"We know and very well understand that finding and selecting a Builder Floor for one self is really a tough job. It is our endeavour to help you find the best match for you within your budget and also according to your taste & requirement. We have brought the world of builder floors at your door steps with the help of our verified channel partners."}}  />
                </div>
            
                <div className="component_wrapper section_title aboutus_title" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","tag":"h1","className":"section_title aboutus_title","text":"Why Choose BuilderFloor.Com?"}}  />
                </div>
            
                <div className="component_wrapper undefined" key="undefined" id="undefined">
                    <List component={{"type":"LIST","subtype":"ul","children":[{"heading":"Extensive Selection:","text":"Our comprehensive database showcases a diverse collection of new builder floors in Gurgaon. From affordable options to luxury residences, we have something to suit every taste and budget."},{"heading":"Trusted Channel Partners:","text":"We collaborate with reputed Channel Partners who in turn contact different builders and developers in Gurgaon with a proven track record of delivering quality constructions and enlist the best builder floors on our platform which meet the highest standards of craftsmanship and design."},{"heading":"Location Expertise:","text":"Gurgaon is a dynamic city with numerous neighborhoods and localities, each with its own charm and amenities. Our channel partners are a team of real estate professionals, who have in-depth knowledge of the Gurgaon market and can guide you towards the ideal location that aligns with your lifestyle and preferences."},{"heading":"Personalized Assistance:","text":"Our channel partners will provide a personalized experience to every customer. They, as a team, are dedicatedly ready to assist you throughout your home-buying journey, offering expert advice, answering your queries, and facilitating smooth transactions."},{"heading":"Transparent Information:","text":"We understand the importance of transparency in the real estate industry. On BuilderFloor.com, you will find detailed information, including floor plans, specifications, amenities, and pricing, empowering you to make informed decisions."}]}}  />
                </div>
            
                <div className="component_wrapper blog_para" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","tag":"p","className":"blog_para","text":"At BuilderFloor.com, our mission is to simplify your search for the perfect builder floor and help you embark on a new chapter of your life. We are passionate about real estate and committed to exceeding your expectations."}}  />
                </div>
            
                <div className="component_wrapper blog_para" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","tag":"p","className":"blog_para","text":"Start exploring our listings today and let us be your trusted partner in finding your dream builder floor in Gurgaon."}}  />
                </div>
            
                </div>
            
                </div>
            
                <div className="component_wrapper undefined" key="undefined" id="undefined">
                    <ContactForm component={{"type":"CONTACT_US"}}  />
                </div>
            
                </div>
            
                <div className="component_wrapper default-home-footer-div" key="undefined" id="undefined">
                    <Footer component={{"type":"PAGE_FOOTER","className":"default-home-footer-div","HomeLinks":{"icon":"/BUILDER.png","url":"/"},"social_media":[{"name":"INSTAGRAM_ICON","url":"https://www.instagram.com/"},{"name":"LINKEDIN_ICON","url":"https://www.linkedin.com/"}],"copyright":"© Builder Floor Official 2022"}}  />
                </div>
            
                <div className="component_wrapper undefined" key="ScrollToTop" id="undefined">
                    <ScrollToTop component={{"type":"SCROLL_TO_TOP","name":"ScrollToTop"}}  />
                </div>
            
                        </Card>
                    );
                }
            