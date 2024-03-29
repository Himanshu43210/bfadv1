import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { callApi } from "../../redux/utils/apiActions.js";
import { useDispatch } from "react-redux";
import { DETAILED_VIEW, GET, HORIZONTAL_LINE, POST } from "../utils/Const.js";
import { selectApiData } from "../../redux/utils/selectors.js";
import { API_ENDPOINTS } from "../../redux/utils/api.js";
import { convertToCr, formatData } from "../utils/HelperMethods.js";
import IframeBuilder from "./IframeBuilder.jsx";
import { FaShareAlt, FaRegHeart } from "react-icons/fa";
import * as _ from "lodash";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos.js";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos.js";
import Tooltip from "@mui/material/Tooltip";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone.js";
import WhatsAppIcon from "@mui/icons-material/WhatsApp.js";
import CloseIcon from "@mui/icons-material/Close.js";
import FullscreenIcon from "@mui/icons-material/Fullscreen.js";
import { Helmet } from "react-helmet";
import { Typography } from "@mui/material";
import dynamic from "next/dynamic.js";
import { CARD_DETAILS_SCREEN } from "../pages/DetailedView.js";
import { USER_ROLE } from "@/ScreenJson.js";
import { useRouter } from "next/router.js";

function page({ component, singledata, onClickNavigate }) {
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
  let pathname = window.location.href;
  let cardDetailUrl = window.location.href;
  let id = getStringAfterLastHyphen(pathname);
  let getApiEndpoint = "";
  let apiEndpoint = "";
  const dispatch = useDispatch();

  useEffect(() => {
    if (window !== "undefined") {
      pathname = window.location.href;
      cardDetailUrl = window.location.href;
      id = getStringAfterLastHyphen(pathname);
      getApiEndpoint = data.apiSliceName;
      apiEndpoint = API_ENDPOINTS[getApiEndpoint] + `?id=${id}`;
    }
    if (!singledata) {
      dispatch(
        callApi({
          url: apiEndpoint,
          method: GET,
          headers: { "Content-Type": "application/json" },
        })
      );
    }
  }, []);

  const apiData = useSelector(
    (state) => selectApiData(state, data.apiSliceName)?.data
  );
  const customerProfile = useSelector((state) => state.customer);
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
    thumbnails: 0,
  };
  const allImages = [];

  Object.keys(cardData).forEach((prop) => {
    if (imageTypes.includes(prop)) {
      cardData[prop].forEach((link) => {
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
    }
  }, [mediaPrepared]);

  useEffect(() => {
    // id & customer signedin
    // console.log('=============== SAVE TO VISITED ==============', customerProfile, id);
    if (id && customerProfile && Object.keys(customerProfile).length !== 0) {
      // saved to visited property list
      const options = {
        url: API_ENDPOINTS["addPropertyViewed"],
        method: POST,
        headers: { "Content-Type": "application/json" },
        data: { userId: customerProfile._id, propertyId: id },
      };
      dispatch(callApi(options));
    }
  }, [cardData]);

  const handleImageChange = (index, payload, dir) => {
    let newIndex;
    if (index) {
      newIndex = index % allImages.length;
      setCurrMedia({ ...payload, index: index % allImages.length });
    } else {
      newIndex =
        dir === "PREV"
          ? (currMedia?.index || 0) - 1
          : (currMedia?.index || 0) + 1;
      newIndex = newIndex % allImages.length;
      setCurrMedia({ ...allImages[newIndex], index: newIndex });
    }
  };

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
    const payload = `https://wa.me/+91${
      cardData?.parentId?.phoneNumber || cardData.cpPhoneNumber
    }?text=${encodeURIComponent(text)}`;
    window.open(payload, "_blank");
  };

  const handlePropertyContacted = () => {
    // console.log('=============== HANDLE PROPERTY CONTACTED ==============', customerProfile, id);
    // if id & customer logged in, save to contacted property list
    if (id && customerProfile && Object.keys(customerProfile).length !== 0) {
      const options = {
        url: API_ENDPOINTS["addPropertyContacted"],
        method: POST,
        headers: { "Content-Type": "application/json" },
        data: { userId: customerProfile._id, propertyId: cardData._id },
      };
      dispatch(callApi(options))
        .then((res) => {
          // console.log('=============== add property contacted res ============', res);
        })
        .catch((error) => {
          // console.log('=============== add property contacted error ============', error);
        });
    }
  };

  const getTotalImgsExcept = (type = null) => {
    let total = 0;
    Object.keys(typeCounts).forEach((key) => {
      if (!type.includes(key)) {
        total += typeCounts[key];
      }
    });
    return total;
  };

  const keyNavigation = (e) => {
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

  const getMediaCounts = () => {
    let str = "";
    const ct = getTotalImgsExcept(["videos"]);
    if (ct > 0) {
      str = str + `${ct} Images`;
    }
    if (typeCounts.normalImages > 0) {
      if (str !== "") str += " | ";
      str = str + `${typeCounts.normalImages} Normal`;
    }
    if (typeCounts.videos > 0) {
      if (str !== "") str += " | ";
      str = str + `${typeCounts.videos} Videos`;
    }
    return str;
  };

  const [isMobile, setIsMobile] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      setIsMobile(window.innerWidth <= 768);
    }
    if (typeof localStorage !== "undefined") {
      setUserRole(localStorage.getItem("role"));
    }
  }, []);

  const getContactNumber = () => {
    return userRole == USER_ROLE.channelPartner || userRole == USER_ROLE.bfAdmin
      ? cardData?.ownerContact
      : cardData?.builderContact;
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
        {currMedia.type === "videos" ? (
          <video
            src={currMedia?.link}
            controls
            width={320}
            height={260}
            className="media_video"
          ></video>
        ) : (
          <img
            src={currMedia?.link}
            alt={cardData?.title}
            width={300}
            height={300}
            className="media_img"
          />
        )}
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
  useEffect(() => {
    const url = window.location.href;
    const searchParamsIndex = url.indexOf("?");

    if (searchParamsIndex !== -1) {
      const searchParamsString = url.substring(searchParamsIndex + 1);
      const params = new URLSearchParams(searchParamsString);

      const floorPossibilities = [
        "1ST_FLOOR",
        "2ND_FLOOR",
        "3RD_FLOOR",
        "4TH_FLOOR",
      ];
      let floorFound = null;

      for (const floor of floorPossibilities) {
        if (params.has(floor)) {
          floorFound = params.get(floor);
          break;
        }
      }

      console.log(floorFound); // Output: 1ST_FLOOR
    } else {
      console.log("No query parameters found in the URL.");
    }
  }, []);

  const router = useRouter();
  const { query } = router;
  const urlArray = query?.pid?.split("-");

  var floor = urlArray?.[3];
  var floorPossession = urlArray?.[urlArray.length - 3];
  var floorPrice = urlArray?.[urlArray.length - 2];
  console.log(urlArray);
  return (
    <>
      <Helmet>
        <title>{cardData?.title}</title>
        <meta name="description" content={cardData?.description} />
      </Helmet>
      <div className="detailcomponent">
        <div className="detailed-title-component">
          <h1 className="card_title">{cardData?.title}</h1>
          <div className="detailicondiv">
            {cardData?.createdAt && (
              <Typography variant="body2" color="text.tertiary">
                {formatData(cardData?.createdAt)}
              </Typography>
            )}
            <Tooltip title="Share" arrow classes="tooltip">
              <Button
                variant="outlined"
                onClick={handleShareClick}
                className="btn sc_btn sc_share_btn"
              >
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
        <div
          className={`detail-image-div ${
            fullscreen ? "fullscreen_img_slider" : ""
          }`}
        >
          <div
            className="main-images"
            onClick={() => {
              setFullscreen(true);
            }}
          >
            {renderMainMedia()}
            {currMedia?.index > 0 && (
              <Tooltip title="Previous" arrow classes="tooltip">
                <Button
                  className="slider_ctrl_btn slide_back"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageChange(null, null, "PREV");
                  }}
                >
                  <ArrowBackIosIcon className="slider_icon" />
                </Button>
              </Tooltip>
            )}
            {currMedia?.index < allImages.length - 1 && (
              <Tooltip title="Next" arrow classes="tooltip">
                <Button
                  className="slider_ctrl_btn slide_next"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageChange(null, null, "NEXT");
                  }}
                >
                  <ArrowForwardIosIcon className="slider_icon" />
                </Button>
              </Tooltip>
            )}
            <Tooltip
              title={`${fullscreen ? "Exit Fullscreen" : "Fullscreen"}`}
              arrow
              classes="tooltip"
            >
              <Button
                className="slider_ctrl_btn fullscreen_btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreen(!fullscreen);
                }}
              >
                {fullscreen ? (
                  <CloseIcon className="fullscreen_close_icon" />
                ) : (
                  <FullscreenIcon className="fullscreen_icon" />
                )}
              </Button>
            </Tooltip>
          </div>
          <div className="side-images">
            {allImages?.map((image, index) => {
              return (
                currMedia?.link !== image.link && (
                  <div className="other-images">
                    {image.type === "videos" ? (
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
                    )}
                  </div>
                )
              );
            })}
          </div>
          <div variant="outlined" className="detail-button imgs_info">
            {getMediaCounts()}
          </div>
        </div>
        <div className="lowercontainer">
          <div className="detail-info-div">
            <h3 className="detail_title">{cardData?.detailTitle}</h3>
            <pre className="detail_desc">{cardData?.description}</pre>
            <Button
              variant="contained"
              className="detail-button detail_price_btn"
            >
              {"₹ " + convertToCr(floorPrice) + " Cr."}
            </Button>
          </div>
          <div className="detail-icon-div">
            <div className="icons_wrapper">
              <div className="detail_icon_wrapper">
                <img
                  src={iconList?.sectorNumber}
                  alt="location"
                  className="location_icon"
                />
                {cardData?.sectorNumber}
              </div>
              <div className="detail_icon_wrapper">
                <img src={iconList?.size} alt="area" className="size_icon" />
                {cardData?.size} Sq. Yd.
              </div>
              <div className="detail_icon_wrapper">
                <img
                  src={iconList?.accommodation}
                  alt="accommodation"
                  className="acc_icon"
                />
                {cardData?.accommodation}
              </div>
              <div className="detail_icon_wrapper">
                <img src={iconList?.floor} alt="floor" className="floor_icon" />
                {floor?.replace("_", " ")}
              </div>
              <div className="detail_icon_wrapper">
                <img
                  src={iconList?.facing}
                  alt="facing"
                  className="facing_icon"
                />
                {cardData?.facing}
              </div>
              <div className="detail_icon_wrapper">
                <img
                  src={iconList?.possession}
                  alt="possession"
                  className="poss_icon"
                />
                {floorPossession}
              </div>
              <div className="detail_icon_wrapper">
                <img
                  src={iconList?.parkFacing}
                  alt="park facing"
                  className="park_icon"
                />
                {cardData?.parkFacing}
              </div>
              <div className="detail_icon_wrapper">
                <img
                  src={iconList?.corner}
                  alt="corner"
                  className="corner_icon"
                />
                {cardData?.corner}
              </div>
            </div>

            <div className="rowicon contacts-wrapper" id="rowicon-btn">
              <a href={`tel:${getContactNumber()}`}>
                <Button
                  className="detail-button contact-btn"
                  variant="contained"
                  onClick={() => {
                    handlePropertyContacted();
                    setShowNumber(!ShowNumber);
                  }}
                >
                  {/* <img src={component?.icons?.phone} alt="" /> */}
                  <LocalPhoneIcon className="detail_btn_icon" />
                  <span className="detail_btn_label">
                    {ShowNumber ? getContactNumber() : "Call"}
                  </span>
                </Button>
              </a>
              <Button
                className="detail-button"
                variant="contained"
                onClick={() => {
                  handlePropertyContacted();
                  handleWhatsappContact();
                }}
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

const DetailDataCard = dynamic(() => Promise.resolve(page), { ssr: false });

export default DetailDataCard;
