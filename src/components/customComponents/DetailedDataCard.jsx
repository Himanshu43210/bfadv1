import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { callApi } from "../../redux/utils/apiActions";
import { useDispatch } from "react-redux";
import { GET, HORIZONTAL_LINE, SAMPLE_CARD_DATA } from "../utils/Const";
import { selectApiData } from "../../redux/utils/selectors";
import { API_ENDPOINTS } from "../../redux/utils/api";
import { convertToCr } from "../utils/HelperMethods";
import IframeBuilder from "./IframeBuilder";
import { FaShareAlt, FaRegHeart } from "react-icons/fa";

export default function DetailDataCard({
  component,
  singledata,
  onClickNavigate,
}) {
  // Prioritize singledata if available
  const data = singledata || component;

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
  console.log("cardData", cardData?.title);

  const [ShowNumber, setShowNumber] = useState();
  const [imageLink, setImageLink] = useState(cardData.images?.[0]);
  const image360 = cardData?.images?.length;
  const imageNormal = cardData?.normalImages?.length;
  const price = convertToCr(cardData?.price);

  const handleImageChange = (newImageLink) => {
    setImageLink(newImageLink);
  };

  //... Rest of the code remains the same
  const cardDetailUrl = window.location.href;
  const handleShareClick = () => {
    navigator.share({
      title: "WebShare",
      url: cardDetailUrl,
    });
  };

  return (
    <>
      <div className="detailcomponent">
        <div className="detailed-title-component">
          <p>{cardData?.title}</p>
          <div className="detailicondiv">
            <FaShareAlt size={"23px"} onClick={handleShareClick} />
            <FaRegHeart size={"23px"} />
          </div>
        </div>
        <div className="detail-image-div">
          <div className="main-images">
            <div className="img360">
              <IframeBuilder
                src={imageLink}
                title="Example Website"
                allowFullScreen
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
                    />
                  </div>
                )
              );
            })}
          </div>
          <div variant="outlined" className="detail-button">
            {image360} Images
            {imageNormal > 0 ? `|| ${imageNormal} Normal` : ""}
          </div>
        </div>
        <div className="lowercontainer">
          <div className="detail-info-div">
            {/* Deatils & Button */}
            <div className="infodiv">
              <h3>{cardData?.detailTitle}</h3>
              <br />
              {cardData?.description}
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Button variant="contained" className="detail-button">
                {"₹ " + price + " Cr."}
              </Button>
            </div>
          </div>
          <div className="detail-icon-div">
            <div className="rowicon">
              <div>
                <img src={component?.icons.sectorNumber} alt="" />
                {cardData?.sectorNumber}
              </div>
              <div>
                <img src={component?.icons.size} alt="" />
                {cardData?.size}
              </div>
              <div>
                <img src={component?.icons.accommodation} alt="" />
                {cardData?.accommodation}
              </div>
            </div>

            <div className="rowicon">
              <div>
                <img src={component?.icons.floor} alt="" />
                {cardData?.floor}
              </div>
              <div>
                <img src={component?.icons.facing} alt="" />
                {cardData?.facing}
              </div>
              <div>
                <img src={component?.icons.possession} alt="" />
                {cardData?.possession}
              </div>
            </div>

            <div className="rowicon">
              <div>
                <img src={component?.icons.parkFacing} alt="" />
                {cardData?.parkFacing}
              </div>

              <div>
                <img src={component?.icons.corner} alt="" />
                {cardData?.corner}
              </div>
            </div>

            <div className="rowicon" id="rowicon-btn">
              <Button
                className="detail-button"
                variant="contained"
                onClick={() => {
                  setShowNumber(!ShowNumber);
                }}
              >
                {ShowNumber ? cardData?.channelContact : "Phone"}
              </Button>
              <Button
                className="detail-button"
                variant="contained"
                onClick={() => {
                  window.open(
                    `https://wa.me/${
                      cardData?.channelContact
                    }?text=${component.whatsappText?.replace(
                      "{link}",
                      pathname
                    )}`,
                    "_blank"
                  );
                }}
              >
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
