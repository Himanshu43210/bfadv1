import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ApiButton from "./ApiButton";
import { FaShareAlt, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GET } from "../utils/Const";
import Tooltip from '@mui/material/Tooltip';
import { generatePropertyUrl } from "../utils/propertyUtils.js";

export default function SearchCard({
  element = {},
  apiType = GET,
  onClickApi,
  onClickNavigate,
  classname,
  disableOnClickNavigate = false,
  showOptions = false,
}) {
  const cardDetailUrl = generatePropertyUrl(element);
  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share !== undefined) {
      navigator.share({
        title: "WebShare",
        url: cardDetailUrl,
      });
    }
  };
  const navigateTo = useNavigate();

  const renderOptions = () => {
    return (
      <div className="sc_options_wrapper">
        <ul className="options_list">
          <li className="option_item">
            <input type="radio" id={`${element._id}-1`} className="radio_input" name={element._id} />
            <label htmlFor={`${element._id}-1`} className="radio_label">Yes, I have finalized</label>
          </li>
          <li className="option_item">
            <input type="radio" id={`${element._id}-2`} className="radio_input" name={element._id} />
            <label htmlFor={`${element._id}-2`} className="radio_label">Not visited yet</label>
          </li>
          <li className="option_item">
            <input type="radio" id={`${element._id}-3`} className="radio_input" name={element._id} />
            <label htmlFor={`${element._id}-3`} className="radio_label">Property sold out</label>
          </li>
          <li className="option_item">
            <input type="radio" id={`${element._id}-4`} className="radio_input" name={element._id} />
            <label htmlFor={`${element._id}-4`} className="radio_label">Asked brokerage</label>
          </li>
          <li className="option_item">
            <input type="radio" id={`${element._id}-5`} className="radio_input" name={element._id} />
            <label htmlFor={`${element._id}-5`} className="radio_label">Rejected/Didn't like</label>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Card className={`search_card ${classname}`}
    >
      <CardActionArea className="searchcardiv">
        <CardMedia
          component="img"
          height="100"
          // image={element.thumbnails?.[0]}
          src={Array.isArray(element.thumbnails) ? element.thumbnails[0] : element.thumbnails}
          // alt="Left_Image"
          alt={element.title}
          className="thumbnail"
          onClick={() => {
            if (!disableOnClickNavigate) {
              window.open(cardDetailUrl, "_blank");
              // navigateTo(cardDetailUrl);
            }
          }}
        />
        <CardContent className="card_details">
          <div className="detailcardheadingdiv">
            <a href={cardDetailUrl} className="property_link" target="_blank">
              <Typography variant="h5" gutterBottom className="detailcardheading">
                {element.title}
              </Typography>
            </a>
            <div className="detailicondiv">
              <Tooltip title="Share" arrow classes="tooltip">
                <Button variant="outlined" onClick={e => handleShareClick(e)} className="btn sc_btn sc_share_btn">
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
                <Typography fontWeight="lg">{element.sectorNumber}</Typography>
              </div>
              <div className="detail_list_item">
                <img
                  className="detailimages"
                  src="/icons/area.png"
                  alt=""
                  style={{ paddingRight: "6px" }}
                />
                <Typography fontWeight="lg">{element.size} Sq. Yd.</Typography>
              </div>
              <div className="detail_list_item">
                <img
                  className="detailimages"
                  src="/icons/check.png"
                  alt=""
                  style={{ paddingRight: "6px" }}
                />
                <Typography fontWeight="lg">{element.possession}</Typography>
              </div>
              <div className="detail_list_item">
                <img
                  className="detailimages"
                  src="/icons/stairs.png"
                  alt=""
                  style={{ paddingRight: "6px" }}
                />
                <Typography fontWeight="lg">{element.floor}</Typography>
              </div>
              <div className="detail_list_item">
                <img
                  className="detailimages"
                  src="/icons/home.png"
                  alt=""
                  style={{ paddingRight: "6px" }}
                />
                <Typography fontWeight="lg">{element.accommodation}</Typography>
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
            <div className="searchpagebuttondiv">
              <ApiButton
                apiType={apiType}
                api={onClickApi}
                buttonLabel={`₹ ${element.price / 10000000} Cr.`}
                queryParams={{ id: element._id }}
                // navigate={!disableOnClickNavigate ? cardDetailUrl : null}
                btnClass={`btn price_btn`}
                newTab={true}
              />
              <Typography className="view_details" fontWeight="lg" onClick={() => {
                if (!disableOnClickNavigate) {
                  window.open(cardDetailUrl, "_blank");
                  // navigateTo(cardDetailUrl);
                }
              }}>View Details {">>"}</Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      {showOptions && renderOptions()}
    </Card>
  );
}
