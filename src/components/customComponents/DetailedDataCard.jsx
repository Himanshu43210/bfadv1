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

  useEffect(() => {
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
    (state) => selectApiData(state, getApiEndpoint)?.data
  );
  const cardData = singledata || apiData || {};
  // ("cardData", cardData?.title);

  const [ShowNumber, setShowNumber] = useState();
  const [imageLink, setImageLink] = useState(cardData.images?.[0]);
  const image360 = cardData?.images?.length;
  const imageNormal = cardData?.normalImages?.length;
  const otherImages = [];
  const imageTypes = [
    "virtualFiles",
    "layouts",
    "thumbnails",
  ];
  const price = convertToCr(cardData?.price);

  const handleImageChange = (newImageLink) => {
    setImageLink(newImageLink);
  };

  const extractAllImages = () => {
    Object.keys(cardData).forEach(prop => {
      if (imageTypes.includes(prop)) {
        cardData[prop].forEach(link => {
          otherImages.push(link);
        });
      }
    });
  };

  //... Rest of the code remains the same
  const cardDetailUrl = window.location.href;
  const handleShareClick = () => {
    navigator.share({
      title: "WebShare",
      url: cardDetailUrl,
    });
  };

  extractAllImages();

  return (
    <>
      <div className="detailcomponent">
        <div className="detailed-title-component">
          <p className="card_title">{cardData?.title}</p>
          <div className="detailicondiv">
            <Button variant="outlined" onClick={handleShareClick} className="btn sc_btn sc_share_btn">
              <FaShareAlt size={"23px"} onClick={handleShareClick} className="share_icon" />
            </Button>
            <Button className="btn sc_btn sc_fav_btn">
              <FaRegHeart size={"23px"} className="fav_icon" />
            </Button>
          </div>
        </div>
        <div className="detail-image-div">
          <div className="main-images">
            <div className="img360">
              <IframeBuilder
                src={imageLink}
                title="Example Website"
                allowFullScreen
                iframeClass="img360_iframe"
              />
            </div>
          </div>
          <div className="side-images">
            {cardData.images?.map((imglink) => {
              return (
                imageLink !== imglink && (
                  <div className="other-images">
                    <img
                      src={imglink}
                      alt={component ? component.title : singledata.title}
                      onClick={() => handleImageChange(imglink)}
                      className="other_images_item"
                    />
                  </div>
                )
              );
            })}
            {otherImages?.map((imglink) => {
              return (
                imageLink !== imglink && (
                  <div className="other-images">
                    <img
                      src={imglink}
                      alt={component ? component.title : singledata.title}
                      onClick={() => handleImageChange(imglink)}
                      className="other_images_item"
                    />
                  </div>
                )
              );
            })}
          </div>
          <div variant="outlined" className="detail-button imgs_info">
            {image360 + otherImages.length} Images
            {imageNormal > 0 ? ` || ${imageNormal} Normal` : ""}
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
            <div className="rowicon">
              <div>
                <img src={iconList?.sectorNumber} alt="" />
                {cardData?.sectorNumber}
              </div>
              <div>
                <img src={iconList?.size} alt="" />
                {cardData?.size}
              </div>
              <div>
                <img src={iconList?.accommodation} alt="" />
                {cardData?.accommodation}
              </div>
            </div>

            <div className="rowicon">
              <div>
                <img src={iconList?.floor} alt="" />
                {cardData?.floor}
              </div>
              <div>
                <img src={iconList?.facing} alt="" />
                {cardData?.facing}
              </div>
              <div>
                <img src={iconList?.possession} alt="" />
                {cardData?.possession}
              </div>
            </div>

            <div className="rowicon">
              <div>
                <img src={iconList?.parkFacing} alt="" />
                {cardData?.parkFacing}
              </div>

              <div>
                <img src={iconList?.corner} alt="" />
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
                {ShowNumber ? cardData?.channelContact : "Call"}
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
      <div>
        <div></div>
      </div>
    </>
  );
}
