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
  // If using component prop, fetch additional data from API
  const pathname = window.location.href;
  const id = pathname.split("id=").pop();
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

  useEffect(() => {
    const parsedParams = search.split("&").map(param => param.split("="));
    const newId = parsedParams?.[1]?.[1];
    dispatch(
      callApi({
        url: API_ENDPOINTS[getApiEndpoint] + `?id=${newId}`,
        method: GET,
        headers: { "Content-Type": "application/json" },
      })
    );
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, [search]);

  const apiData = useSelector(
    (state) => selectApiData(state, getApiEndpoint)?.data
  );
  const cardData = singledata || apiData || {};
  const imageTypes = [
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
    videos: 0
  };
  const allImages = [];
  Object.keys(cardData).forEach(prop => {
    if (imageTypes.includes(prop)) {
      console.log('======= IMAGE TYPE INCLUDES PROP =======', prop);
      cardData[prop].forEach(link => {
        console.log(link);
        if (link !== "") {
          typeCounts[prop] = typeCounts[prop] + 1;
          allImages.push({ type: prop, link: link });
        }
      });
    }
  });
  const price = convertToCr(cardData?.price);

  const [ShowNumber, setShowNumber] = useState(false);
  const [currMedia, setCurrMedia] = useState({ ...allImages?.[0], index: 0 });
  console.log('======== INITIAL CURR MEDIA ==========', currMedia);
  const [isInitial, setIsInitial] = useState(true);

  const handleImageChange = (index, payload, dir) => {
    console.log('+++++++++++ HANDLE IMAGE CHANGE ++++++++++++', index, payload)
    let newIndex;
    if (index) {
      newIndex = index % allImages.length;
      setCurrMedia({ ...payload, index: (index % allImages.length) });
    } else {
      newIndex = dir === "PREV"
        ? ((currMedia?.index || 0) - 1) : ((currMedia?.index || 0) + 1);
      newIndex = newIndex % allImages.length;
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

  const getTotalImgsExcept = (type = null) => {
    let total = 0;
    Object.keys(typeCounts).forEach(key => {
      if (key != type) {
        total += typeCounts[key];
      }
    });
    return total;
  };

  const render360Media = () => {
    console.log('-------------- RENDER 360 MEDIA -----------', currMedia);
    return (
      <div className="img360">
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
    console.log('-------------- RENDER GENERAL MEDIA -----------', currMedia);
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
    console.log('-------------- RENDER MAIN MEDIA -----------', currMedia);
    switch (currMedia?.type) {
      case "images":
        return render360Media();
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
                <FaShareAlt size={"23px"} onClick={handleShareClick} className="share_icon" />
              </Button>
            </Tooltip>
            <Tooltip title="Save" arrow classes="tooltip">
              <Button className="btn sc_btn sc_fav_btn">
                <FaRegHeart size={"23px"} className="fav_icon" />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="detail-image-div">
          <div className="main-images">
            {renderMainMedia()}
            {
              currMedia?.index > 0 && (
                <Tooltip title="Previous" arrow classes="tooltip">
                  <Button className="slider_ctrl_btn slide_back" onClick={() => handleImageChange(null, null, "PREV")}>
                    <ArrowBackIosIcon className="slider_icon" />
                  </Button>
                </Tooltip>
              )
            }{
              currMedia?.index < (allImages.length - 1) && (
                <Tooltip title="Next" arrow classes="tooltip">
                  <Button className="slider_ctrl_btn slide_next" onClick={() => handleImageChange(null, null, "NEXT")}>
                    <ArrowForwardIosIcon className="slider_icon" />
                  </Button>
                </Tooltip>
              )
            }
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
                <img src={component?.icons?.phone} alt="" />
                {ShowNumber ? cardData?.parentId?.phoneNumber : "Call"}
              </Button>
              <Button
                className="detail-button"
                variant="contained"
                onClick={() => {
                  window.open(
                    `https://wa.me/${cardData?.channelContact
                    }?text=${component.whatsappText?.replace(
                      "{link}",
                      pathname
                    )}`,
                    "_blank"
                  );
                }}
              >
                <img src={component?.icons?.whatsapp} alt="" />
                WhatsApp
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
