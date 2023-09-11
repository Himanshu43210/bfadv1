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

export default function SearchCard({
  element = {},
  apiType,
  onClickApi,
  onClickNavigate,
  classname,
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
        navigateTo(cardDetailUrl);
      }}
      className={classname}
    >
      <CardActionArea className="searchcardiv">
        <CardMedia
          component="img"
          height="100"
          // image={element.thumbnails?.[0]}
          src={element.thumbnails}
          // alt="Left_Image"
          alt={element.title}
        />
        <div>
          <CardContent>
            <div className="detailcardheadingdiv">
              <Typography
                variant="h5"
                gutterBottom
                className="detailcardheading"
              >
                {element.title}
              </Typography>
              <div className="detailicondiv">
                <FaShareAlt size={"23px"} onClick={handleShareClick} />
                <FaRegHeart size={"23px"} />
              </div>
            </div>
            <div>
              <div className="contentdiv">
                <div>
                  <img
                    className="detailimages"
                    src="https://builder-floor-flax.vercel.app/assets/imgs/icons/location.png"
                    alt=""
                  />
                  <Typography fontWeight="lg">
                    {element.sectorNumber}
                  </Typography>
                </div>
                <div>
                  <img
                    className="detailimages"
                    src="https://builder-floor-flax.vercel.app/assets/imgs/icons/home.png"
                    alt=""
                  />
                  <Typography fontWeight="lg">{element.size}</Typography>
                </div>
                <div>
                  <img
                    className="detailimages"
                    src="https://builder-floor-flax.vercel.app/assets/imgs/icons/check.png"
                    alt=""
                  />
                  <Typography fontWeight="lg">{element.possession}</Typography>
                </div>
                <div>
                  <img
                    className="detailimages"
                    src="https://builder-floor-flax.vercel.app/assets/imgs/icons/stairs.png"
                    alt=""
                  />
                  <Typography fontWeight="lg">{element.floor}</Typography>
                </div>
                <div>
                  <img
                    className="detailimages"
                    src="https://builder-floor-flax.vercel.app/assets/imgs/icons/home.png"
                    alt=""
                  />
                  <Typography fontWeight="lg">
                    {element.accommodation}
                  </Typography>
                </div>

                <div>
                  <img
                    className="detailimages"
                    src="https://builder-floor-flax.vercel.app/assets/imgs/icons/compass.png"
                    alt=""
                  />
                  <Typography fontWeight="lg">{element.facing}</Typography>
                </div>

                <div className="searchpagebuttondiv">
                  <ApiButton
                    apiType={apiType}
                    api={onClickApi}
                    buttonLabel={`₹ ${element.price / 10000000} Cr.`}
                    queryParams={{ id: element._id }}
                    navigate={cardDetailUrl}
                  />
                  <Typography fontWeight="lg"> View Details {">>"} </Typography>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}
