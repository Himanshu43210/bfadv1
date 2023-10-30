
    import React from "react";
    import {Card} from "react-bootstrap";
    import { useState } from "react";
    import { useDispatch } from "react-redux";
    import { resetFilterData, storeFilterData } from "../../redux/slice/filterSlice.js";
    import { callApi } from "../../redux/utils/apiActions.js";
    import MenuState from "../customComponents/MenuState.jsx";
import Header from "../customComponents/Header.jsx";
import Heading from "../customComponents/Heading.jsx";
import List from "../customComponents/List.jsx";
import NavigateButton from "../customComponents/NavigateButton.jsx";
import Footer from "../customComponents/Footer.jsx";
import ScrollToTop from "../customComponents/ScrollToTop.jsx";

                export default function BlogScreen() {
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
                        <Card className="blog-screen">
                            
                <div className="component_wrapper homeHeader" key="undefined" id="undefined">
                    
                <div className="component_wrapper menu_comp" key="undefined" id="undefined">
                    <MenuState component={{"type":"HAMBURGER_MENU","items":[{"name":"Home","path":"/","icon":"HOME"},{"name":"Login","path":"/login","icon":"LOGIN"},{"name":"About Us","path":"/about_us","icon":"ORG"},{"name":"Contact Us","path":"/about_us#contact_us","icon":"CONTACT"},{"name":"Our Blog","path":"/blog","icon":"DOC"}],"className":"menu_comp","text":"Menu"}}  />
                </div>
            
                <div className="component_wrapper page_header_comp" key="undefined" id="undefined">
                    <Header component={{"type":"PAGE_HEADER","url":"/","image":"/BUILDER.png","title":"BuilderFloor.com","titleMobile":"BuilderFloor","className":"page_header_comp"}}  />
                </div>
            
                </div>
            
                <div className="component_wrapper our_blog_container" key="undefined" id="undefined">
                    
                <div className="component_wrapper page_content_container" key="undefined" id="undefined">
                    
                <div className="component_wrapper page_title" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","className":"page_title","text":"Our Blog"}}  />
                </div>
            
                <div className="component_wrapper blog_container" key="undefined" id="undefined">
                    
                <div className="component_wrapper section_title" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","tag":"h1","className":"section_title","text":"The Perfect Builder Floor Is An Important And Exciting Journey"}}  />
                </div>
            
                <div className="component_wrapper blog_para" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","tag":"p","className":"blog_para","text":"A builder floor refers to an independent residential unit or apartment that is typically constructed by a builder or developer on a single plot of land. In simple terms, it is a low-rise building that consists of multiple floors, with each floor being a separate dwelling unit."}}  />
                </div>
            
                <div className="component_wrapper blog_para" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","tag":"p","className":"blog_para","text":"Builder Floors are commonly found in urban areas, particularly in cities and towns where land availability is limited. They are often built as a part of a larger housing project or as standalone structures. Each floor of a Builder Floor usually has its own separate entrance, and the building usually has an elevator."}}  />
                </div>
            
                <div className="component_wrapper blog_para" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","tag":"p","className":"blog_para","text":"These residential units are designed to provide more privacy and independence compared to traditional apartment buildings or multi-story complexes. Each floor is typically owned by a different individual or family, and they may have control over the design and layout of their respective units. Builder floors can vary in size and configuration, ranging from small apartments to spacious duplexes or triplexes."}}  />
                </div>
            
                <div className="component_wrapper blog_para" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","tag":"p","className":"blog_para","text":"It's important to note that the term \"Builder Floor\" may have different regional interpretations and can vary in its exact meaning and characteristics depending on the specific location."}}  />
                </div>
            
                <div className="component_wrapper section_title" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","tag":"h1","className":"section_title","text":"Advantages Of Purchasing A Builder Floor:"}}  />
                </div>
            
                <div className="component_wrapper undefined" key="undefined" id="undefined">
                    <List component={{"type":"LIST","subtype":"ul","children":[{"heading":"Privacy:","text":"Each floor is a separate unit, providing more privacy and fewer shared common areas compared to high-rise apartment buildings."},{"heading":"Customization:","text":"Owners have more flexibility in customizing their living spaces according to their preferences and needs."},{"heading":"Lower Density:","text":"As builder floors are usually low-rise buildings, the number of units per floor is typically lower, resulting in a lower population density and potentially a quieter living environment."},{"heading":"Exclusivity:","text":"Builder floors often cater to a niche market and can be associated with a certain level of exclusivity or premium status."},{"heading":"Lower Maintenance Charges:","text":"Builder Floor has lower maintenance charges as compared to high rise Apartment. You have to pay even for those services which you never use."},{"heading":"Unbeatable Edge:","text":"Builder floor owner also gets proportionate land share rights of the plot underneath. Since the prices of land increase considerably over a passage of time, the owner of builder floor gets benefit of the same indirectly."},{"heading":"Peace Of Mind:","text":"Builder floor owner feels much safer in the event of earthquake or fire."}]}}  />
                </div>
            
                <div className="component_wrapper undefined" key="undefined" id="undefined">
                    <NavigateButton component={{"type":"NAVIGATE_BUTTON","btnClass":"home_navigate_btn","navigate":"/","buttonLabel":"Start exploring your dream builder floor now..."}}  />
                </div>
            
                </div>
            
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
            