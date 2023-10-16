import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { callApi } from "../../redux/utils/apiActions";
import { useDispatch } from "react-redux";
import { DETAILED_VIEW, GET, HORIZONTAL_LINE, SAMPLE_CARD_DATA } from "../utils/Const";
import { selectApiData } from "../../redux/utils/selectors";
import { API_ENDPOINTS } from "../../redux/utils/api";
import { convertToCr } from "../utils/HelperMethods";
import IframeBuilder from "./IframeBuilder";
import { FaShareAlt, FaRegHeart } from "react-icons/fa";
import { CARD_DETAILS_SCREEN } from "../../ScreenJson";
import { useLocation } from "react-router-dom";
import * as _ from "lodash";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Tooltip from '@mui/material/Tooltip';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

export default function DetailDataCard({
  component,
  singledata,
  onClickNavigate,
}) {
  // Prioritize singledata if available
  const data = singledata || component;
  let iconList = data?.icons;
  if (!iconList) {
    CARD_DETAILS_SCREEN?.children?.map((child) => {
      if (child?.type == DETAILED_VIEW) {
        iconList = child?.icons;
      }
    });
  }
  function getStringAfterLastHyphen(inputString) {
    // Split the input string into an array using "-" as the separator
    const parts = inputString.split("-");

    // If there is only one part or the last character of the inputString is "-", return an empty string
    if (parts.length === 1 || inputString.endsWith("-")) {
      return "";
    }

    // Otherwise, return the last part of the array
    return parts[parts.length - 1];
  }
  // If using component prop, fetch additional data from API
  const pathname = window.location.href;
  const id = getStringAfterLastHyphen(pathname);
  const getApiEndpoint = data.apiSliceName;
  const apiEndpoint = API_ENDPOINTS[getApiEndpoint] + `?id=${id}`;
  const dispatch = useDispatch();
  const { search } = useLocation();

  useEffect(() => {
    console.log('************* useEffect : DetailedDataCard **************', singledata);
    if (!singledata) {
      console.log('+++++++ useEffect : single data is undefined ++++++');
      dispatch(
        callApi({
          url: apiEndpoint,
          method: GET,
          headers: { "Content-Type": "application/json" },
        })
      );
    }
  }, []);

  // useEffect(() => {
  //   const parsedParams = search.split("&").map(param => param.split("="));
  //   const newId = parsedParams?.[1]?.[1];
  //   dispatch(
  //     callApi({
  //       url: API_ENDPOINTS[getApiEndpoint] + `?id=${newId}`,
  //       method: GET,
  //       headers: { "Content-Type": "application/json" },
  //     })
  //   );
  //   window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  // }, [search]);

  const apiData = useSelector(
    (state) => selectApiData(state, getApiEndpoint)?.data
  );
  const [mediaPrepared, setMediaPrepared] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const cardData = singledata || apiData || {};
  const imageTypes = [
    "thumbnails",
    "images",
    "normalImages",
    "virtualFiles",
    "layouts",
    "videos",
  ];
  const typeCounts = {
    images: 0,
    normalImages: 0,
    virtualFiles: 0,
    layouts: 0,
    videos: 0,
    thumbnails: 0
  };
  const allImages = [];
  Object.keys(cardData).forEach(prop => {
    if (imageTypes.includes(prop)) {
      cardData[prop].forEach(link => {
        console.log(link);
        if (link !== "") {
          typeCounts[prop] = typeCounts[prop] + 1;
          allImages.push({ type: prop, link: link });
          if (!mediaPrepared) {
            setMediaPrepared(true);
          }
        }
      });
    }
  });
  const price = convertToCr(cardData?.price);

  const [ShowNumber, setShowNumber] = useState(false);
  const [currMedia, setCurrMedia] = useState({ ...allImages?.[0], index: 0 });

  useEffect(() => {
    if (mediaPrepared) {
      setCurrMedia({ ...allImages?.[0], index: 0 });
      // window.addEventListener("keydown", keyNavigation);
    }
    // return () => {
    //   window.removeEventListener("keydown", keyNavigation);
    // };
  }, [mediaPrepared]);

  const handleImageChange = (index, payload, dir) => {
    let newIndex;
    if (index) {
      newIndex = index % allImages.length;
      // console.log('-------- NEW INDEX ---------', newIndex);
      setCurrMedia({ ...payload, index: (index % allImages.length) });
    } else {
      newIndex = dir === "PREV"
        ? ((currMedia?.index || 0) - 1) : ((currMedia?.index || 0) + 1);
      console.log('-------- NEW INDEX 1 ---------', newIndex, allImages.length);
      newIndex = newIndex % allImages.length;
      console.log('-------- NEW INDEX 2 ---------', newIndex);
      setCurrMedia({ ...allImages[newIndex], index: newIndex });
    }
  };

  //... Rest of the code remains the same
  const cardDetailUrl = window.location.href;
  const handleShareClick = () => {
    if (navigator.share !== undefined) {
      navigator.share({
        title: "WebShare",
        url: cardDetailUrl,
      });
    }
  };

  const handleWhatsappContact = () => {
    const text = component.whatsappText?.replace("{link}", cardDetailUrl);
    console.log('------ text -----', text);
    const payload = `https://wa.me/+91${cardData?.parentId?.phoneNumber
      }?text=${encodeURIComponent(text)}`;
    window.open(
      payload,
      "_blank"
    );
  };

  const getTotalImgsExcept = (type = null) => {
    let total = 0;
    Object.keys(typeCounts).forEach(key => {
      if (key != type) {
        total += typeCounts[key];
      }
    });
    return total;
  };

  const keyNavigation = (e) => {
    console.log('============== KEY DOWN ==============', e.key);
    switch (e.key) {
      case "ArrowLeft":
        handleImageChange(null, null, "PREV");
        break;
      case "ArrowRight":
        handleImageChange(null, null, "NEXT");
        break;
      default:
        break;
    }
  };

  const render360Media = () => {
    return (
      <div className="img360" onClick={() => setFullscreen(true)}>
        <IframeBuilder
          src={currMedia?.link}
          title={cardData?.title}
          allowFullScreen
          iframeClass="img360_iframe"
        />
      </div>
    );
  };

  const renderGeneralMedia = () => {
    return (
      <div className="general_media_wrapper">
        {
          currMedia.type === "videos" ? (
            <video src={currMedia?.link} controls width={320} height={260} className="media_video"></video>
          ) : (
            <img src={currMedia?.link} alt={cardData?.title} width={300} height={300} className="media_img" />
          )
        }
      </div>
    );
  };

  const renderMainMedia = () => {
    switch (currMedia?.type) {
      case "images":
        return render360Media();
      case "thumbnails":
      case "normalImages":
      case "virtualFiles":
      case "layouts":
      case "videos":
        return renderGeneralMedia();
      default:
        return null;
    }
  };

  return (
    <>
      <div className="detailcomponent">
        <div className="detailed-title-component">
          <p className="card_title">{cardData?.title}</p>
          <div className="detailicondiv">
            <Tooltip title="Share" arrow classes="tooltip">
              <Button variant="outlined" onClick={handleShareClick} className="btn sc_btn sc_share_btn">
                <FaShareAlt size={"23px"} className="share_icon" />
              </Button>
            </Tooltip>
            <Tooltip title="Save" arrow classes="tooltip">
              <Button className="btn sc_btn sc_fav_btn">
                <FaRegHeart size={"23px"} className="fav_icon" />
              </Button>
            </Tooltip>
          </div>
        </div>
        {/* {fullscreen && (
          <div className="slider_overlay">

          </div>
        )} */}
        <div className={`detail-image-div ${fullscreen ? "fullscreen_img_slider" : ""}`}>
          <div className="main-images" onClick={() => {
            console.log('============ UPDATE FULL SCREEN STATE ==============', fullscreen);
            setFullscreen(true);
          }}>
            {renderMainMedia()}
            {
              currMedia?.index > 0 && (
                <Tooltip title="Previous" arrow classes="tooltip">
                  <Button className="slider_ctrl_btn slide_back" onClick={(e) => {
                    e.stopPropagation();
                    handleImageChange(null, null, "PREV");
                  }}>
                    <ArrowBackIosIcon className="slider_icon" />
                  </Button>
                </Tooltip>
              )
            }
            {
              currMedia?.index < (allImages.length - 1) && (
                <Tooltip title="Next" arrow classes="tooltip">
                  <Button className="slider_ctrl_btn slide_next" onClick={(e) => {
                    e.stopPropagation();
                    handleImageChange(null, null, "NEXT");
                  }}>
                    <ArrowForwardIosIcon className="slider_icon" />
                  </Button>
                </Tooltip>
              )
            }
            <Tooltip title={`${fullscreen ? "Exit Fullscreen" : "Fullscreen"}`} arrow classes="tooltip">
              <Button className="slider_ctrl_btn fullscreen_btn" onClick={(e) => {
                e.stopPropagation();
                setFullscreen(!fullscreen);
              }}>
                {
                  fullscreen ? (
                    <CloseIcon className="fullscreen_close_icon" />
                  ) : (
                    <FullscreenIcon className="fullscreen_icon" />
                  )
                }
              </Button>
            </Tooltip>
          </div>
          <div className="side-images">
            {allImages?.map((image, index) => {
              return (
                currMedia?.link !== image.link && (
                  <div className="other-images">
                    {
                      image.type === "videos" ? (
                        <video
                          src={image.link}
                          alt={component ? component.title : singledata.title}
                          onClick={() => handleImageChange(index, image)}
                          className="other_images_item"
                        ></video>
                      ) : (
                        <img
                          src={image.link}
                          alt={component ? component.title : singledata.title}
                          onClick={() => handleImageChange(index, image)}
                          className="other_images_item"
                        />
                      )
                    }
                  </div>
                )
              );
            })}
          </div>
          <div variant="outlined" className="detail-button imgs_info">
            {getTotalImgsExcept()} Images
            {typeCounts.normalImages > 0 ? ` || ${typeCounts.normalImages} Normal` : ""}
          </div>
        </div>
        <div className="lowercontainer">
          <div className="detail-info-div">
            <h3 className="detail_title">{cardData?.detailTitle}</h3>
            {cardData?.description}
            <Button variant="contained" className="detail-button detail_price_btn">
              {"₹ " + price + " Cr."}
            </Button>
          </div>
          <div className="detail-icon-div">
            <div className="icons_wrapper">
              <div className="detail_icon_wrapper">
                <img src={iconList?.sectorNumber} alt="location" className="location_icon" />
                {cardData?.sectorNumber}
              </div>
              <div className="detail_icon_wrapper">
                <img src={iconList?.size} alt="area" className="size_icon" />
                {cardData?.size} Sq. Yd.
              </div>
              <div className="detail_icon_wrapper">
                <img src={iconList?.accommodation} alt="accommodation" className="acc_icon" />
                {cardData?.accommodation}
              </div>
              <div className="detail_icon_wrapper">
                <img src={iconList?.floor} alt="floor" className="floor_icon" />
                {cardData?.floor}
              </div>
              <div className="detail_icon_wrapper">
                <img src={iconList?.facing} alt="facing" className="facing_icon" />
                {cardData?.facing}
              </div>
              <div className="detail_icon_wrapper">
                <img src={iconList?.possession} alt="possession" className="poss_icon" />
                {cardData?.possession}
              </div>
              <div className="detail_icon_wrapper">
                <img src={iconList?.parkFacing} alt="park facing" className="park_icon" />
                {cardData?.parkFacing}
              </div>
              <div className="detail_icon_wrapper">
                <img src={iconList?.corner} alt="corner" className="corner_icon" />
                {cardData?.corner}
              </div>
            </div>

            <div className="rowicon contacts-wrapper" id="rowicon-btn">
              <Button
                className="detail-button"
                variant="contained"
                onClick={() => {
                  setShowNumber(!ShowNumber);
                }}
              >
                {/* <img src={component?.icons?.phone} alt="" /> */}
                <LocalPhoneIcon className="detail_btn_icon" />
                <span className="detail_btn_label">{ShowNumber ? cardData?.parentId?.phoneNumber : "Call"}</span>
              </Button>
              <Button
                className="detail-button"
                variant="contained"
                onClick={handleWhatsappContact}
              >
                {/* <img src={component?.icons?.whatsapp} alt="" /> */}
                <WhatsAppIcon className="detail_btn_icon" />
                <span className="detail_btn_label">WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="similar-option-title">
        {component ? component.moreOptionText : singledata.moreOptionText}
      </div>
      <HORIZONTAL_LINE />
    </>
  );
}
