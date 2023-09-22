import {
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

export default function SearchCard({
  element = {},
  apiType = GET,
  onClickApi,
  onClickNavigate,
  classname,
  disableOnClickNavigate = false,
}) {
  const cardDetailUrl = `${onClickNavigate}?title=${element.title?.replaceAll(
    " ",
    "-"
  )}&id=${element._id}`;
  const handleShareClick = () => {
    navigator.share({
      title: "WebShare",
      url: cardDetailUrl,
    });
  };
  const navigateTo = useNavigate();
  return (
    <Card
      onClick={() => {
        if (!disableOnClickNavigate) navigateTo(cardDetailUrl);
      }}
      className={classname}
    >
      <CardActionArea className="searchcardiv" style={{ display: "flex" }}>
        <CardMedia
          component="img"
          height="100"
          // image={element.thumbnails?.[0]}
          src={element.thumbnails}
          // alt="Left_Image"
          alt={element.title}
        />
        <CardContent style={{ flex: 1, width: "100%" }}>
          <div className="detailcardheadingdiv">
            <Typography variant="h5" gutterBottom className="detailcardheading">
              {element.title}
            </Typography>
            <div className="detailicondiv">
              <FaShareAlt size={"23px"} onClick={handleShareClick} />
              <FaRegHeart size={"23px"} />
            </div>
          </div>
          <div
            className="contentdiv"
            style={{ justifyContent: "space-between" }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                paddingRight: "16%",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  className="detailimages"
                  src="https://builder-floor-flax.vercel.app/assets/imgs/icons/location.png"
                  alt=""
                  style={{ paddingRight: "6px" }}
                />
                <Typography fontWeight="lg">{element.sectorNumber}</Typography>
              </div>
              <div style={{ display: "flex" }}>
                <img
                  className="detailimages"
                  src="https://builder-floor-flax.vercel.app/assets/imgs/icons/home.png"
                  alt=""
                  style={{ paddingRight: "6px" }}
                />
                <Typography fontWeight="lg">{element.size}</Typography>
              </div>
              <div style={{ display: "flex" }}>
                <img
                  className="detailimages"
                  src="https://builder-floor-flax.vercel.app/assets/imgs/icons/check.png"
                  alt=""
                  style={{ paddingRight: "6px" }}
                />
                <Typography fontWeight="lg">{element.possession}</Typography>
              </div>
              <div style={{ display: "flex" }}>
                <img
                  className="detailimages"
                  src="https://builder-floor-flax.vercel.app/assets/imgs/icons/stairs.png"
                  alt=""
                  style={{ paddingRight: "6px" }}
                />
                <Typography fontWeight="lg">{element.floor}</Typography>
              </div>
              <div style={{ display: "flex" }}>
                <img
                  className="detailimages"
                  src="https://builder-floor-flax.vercel.app/assets/imgs/icons/home.png"
                  alt=""
                  style={{ paddingRight: "6px" }}
                />
                <Typography fontWeight="lg">{element.accommodation}</Typography>
              </div>
              <div style={{ display: "flex" }}>
                <img
                  className="detailimages"
                  src="https://builder-floor-flax.vercel.app/assets/imgs/icons/compass.png"
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
                navigate={cardDetailUrl}
              />
              <Typography fontWeight="lg">View Details {">>"}</Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
