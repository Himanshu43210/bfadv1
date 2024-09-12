import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ApiButton from "./ApiButton.jsx";
import { FaShareAlt, FaRegHeart } from "react-icons/fa/index.js";
import { GET } from "../utils/Const.js";
import Tooltip from "@mui/material/Tooltip";
import { generatePropertyUrl } from "../utils/propertyUtils.js";
import { useState } from "react";
import { formatData } from "../utils/HelperMethods.js";
import { GiStairs } from "react-icons/gi";

export default function SameBuilderCard({
  element = {},
  apiType = GET,
  onClickApi,
  onClickNavigate,
  classname,
  disableOnClickNavigate = false,
  showOptions = false,
  handleValueChange,
  optVal,
  floors,
}) {
  const [opt, setOpt] = useState(optVal);
  const [selectedFloor, setSelectedFloor] = useState("");

  const handleFloorClick = (selectedFloor, possession, price) => {
    setSelectedFloor(selectedFloor);
    if (!disableOnClickNavigate) {
      const cardDetailUrl = generatePropertyUrl(
        element,
        selectedFloor,
        possession,
        price
      );
      window.open(cardDetailUrl, "_blank");
    }
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share !== undefined) {
      navigator.share({
        title: "WebShare",
        url: cardDetailUrl,
      });
    }
    if (window.AndroidShareHandler) {
      window.AndroidShareHandler.share(cardDetailUrl);
    }
  };
  const options = [
    { key: "Yes, I have finalized" },
    { key: "Not visited yet" },
    { key: "Property sold out" },
    { key: "Asked brokerage" },
    { key: "Rejected/Didn't like" },
  ];

  const handleOptionSelect = (optIdx) => {
    setOpt(options?.[optIdx]?.key);
    if (handleValueChange) {
      console.log(
        "----------- handle option select -----------",
        optIdx,
        options?.[optIdx]?.key
      );
      handleValueChange(element._id, options?.[optIdx]?.key);
    }
  };
  const renderOptions = () => {
    return (
      <div className="sc_options_wrapper">
        <ul className="options_list">
          {options?.map((option, index) => (
            <li className="option_item">
              <input
                type="radio"
                id={`${element._id}-${index}`}
                className="radio_input"
                name={element._id}
                onChange={() => handleOptionSelect(index)}
                checked={opt === option.key}
              />
              <label
                htmlFor={`${element._id}-${index}`}
                className="radio_label"
              >
                {option.key}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <Card className={`search_card ${classname}`}>
      <CardActionArea className="searchcardiv">
        <CardMedia
          component="img"
          height="100"
          // image={element.thumbnails?.[0]}
          src={
            Array.isArray(element.thumbnails)
              ? element.thumbnails[0]
              : element.thumbnails
          }
          alt={element.title}
          className="thumbnail"
        />
        <div>
          <CardContent className="card_details">
            <div className="detailcardheadingdiv">
              <a target="_blank">
                <Typography
                  variant="h5"
                  gutterBottom
                  className="detailcardheading"
                >
                  {element.title}
                </Typography>
              </a>
              <div className="detailicondiv">
                <Typography
                  variant="body2"
                  color="text.tertiary"
                  className="detailicondiv_pdate"
                >
                  {formatData(element?.createdAt)}
                </Typography>
                <Tooltip title="Share" arrow classes="tooltip">
                  <Button
                    variant="outlined"
                    onClick={(e) => handleShareClick(e)}
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
            <div className="contentdiv">
              <div className="contentdiv_left">
                <div className="detail_list_item">
                  <img
                    className="detailimages"
                    src="/icons/location.png"
                    alt=""
                    style={{ paddingRight: "6px" }}
                  />
                  <Typography fontWeight="lg">
                    {element.sectorNumber}
                  </Typography>
                </div>
                <div className="detail_list_item">
                  <img
                    className="detailimages"
                    src="/icons/area.png"
                    alt=""
                    style={{ paddingRight: "6px" }}
                  />
                  <Typography fontWeight="lg">
                    {element.size} Sq. Yd.
                  </Typography>
                </div>
                <div className="detail_list_item">
                  <img
                    className="detailimages"
                    src="/icons/home.png"
                    alt=""
                    style={{ paddingRight: "6px" }}
                  />

                  <Typography fontWeight="lg">
                    {element.accommodation}
                  </Typography>
                </div>
                <div className="detail_list_item">
                  <img
                    className="detailimages"
                    src="/icons/compass.png"
                    alt=""
                    style={{ paddingRight: "6px" }}
                  />
                  <Typography fontWeight="lg">{element.facing}</Typography>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="px-6 my-4">
            <p className="text-lg">Available floors:</p>
            <div className="flex items-center flex-wrap gap-6 ">
              {floors?.map(
                (item) =>
                  item.price && (
                    <div
                      className="flex flex-wrap gap-1 items-center font-medium text-white mt-2 cursor-pointer p-2 rounded-md bg-[#006D77] hover:shadow-lg"
                      onClick={() =>
                        handleFloorClick(
                          item.floor,
                          item.possession,
                          item.price
                        )
                      }
                    >
                      <GiStairs className="w-6 h-6" />
                      {item.floor}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </CardActionArea>
      {showOptions && renderOptions()}
    </Card>
  );
}
