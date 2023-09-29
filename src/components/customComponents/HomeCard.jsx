import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import ApiButton from "./ApiButton";
import { convertToCr } from "../utils/HelperMethods";
import { useNavigate } from "react-router-dom";
import { GET } from "../utils/Const";

export default function HomeCard({
  element,
  onClickApi,
  onClickNavigate,
  classname,
  apiType = GET,
  disableOnClickNavigate = false,
}) {
  const navigateTo = useNavigate();
  return (
    <Card
      className={classname}
      onClick={() => {
        if (!disableOnClickNavigate)
          navigateTo(
            `${onClickNavigate}?title=${element.title?.replaceAll(
              " ",
              "-"
            )}&id=${element._id}`
          );
      }}
      sx={{
        maxWidth: "345px",
        width: "auto",
        minHeight: "auto",
        marginTop: "0px",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={element.thumbnails}
          // image = "https://builderfloors.s3.ap-south-1.amazonaws.com/upload/photos/A329ASL1/1st%20Floor/NORMAL/THUMBNAIL.jpg"
          alt={element.title}
        />
        <CardMedia
          // image = "https://builderfloors.s3.ap-south-1.amazonaws.com/upload/photos/A329ASL1/1st%20Floor/NORMAL/THUMBNAIL.jpg"
          component="img"
          image={
            "https://www.builderfloor.com/assets/imgs/icons/360-degrees.png"
          }
          className="360-image-icon"
          alt={"360-image-icon"}
        />
        <CardContent style={{ flexDirection: "column", alignItems: "center" }}>
          <Typography gutterBottom variant="h6" component="div">
            {element?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {element?.sectorNumber}
          </Typography>
          <div>
            <div>
              <img
                src="https://builder-floor-flax.vercel.app/assets/imgs/icons/home.svg"
                alt="img"
                className="homecardicon"
                height="20px"
                width="20px"
              />
              <Typography variant="body2" className="homecardtext">
                {element?.accommodation}{" "}
              </Typography>
            </div>
            <div>
              <img
                src="https://builder-floor-flax.vercel.app/assets/imgs/page/homepage5/floor.svg"
                alt="img"
                className="homecardicon"
                height="20px"
                width="20px"
              />
              <Typography variant="body2">{element?.floor}</Typography>
            </div>
            <div>
              <img
                src="https://builder-floor-flax.vercel.app/assets/imgs/icons/area-svg.svg"
                alt="img"
                className="homecardicon"
                height="20px"
                width="20px"
              />
              <Typography variant="body2">{element?.size}Sq.Yd.</Typography>
            </div>
          </div>
        </CardContent>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            paddingInline: "16px",
          }}
        >
          <Rating
            name="home-card-fixed-rating"
            value={element?.raiting || 5}
            precision={1}
            readOnly
          />
          <ApiButton
            apiType={apiType}
            api={onClickApi}
            buttonLabel={`₹ ${convertToCr(element?.price)} Cr.`}
            queryParams={{ id: element?._id }}
            navigate={!disableOnClickNavigate && `${onClickNavigate}?title=${element?.title?.replaceAll(
              " ",
              "-"
            )}&id=${element._id}`}
          />
        </div>
      </CardActionArea>
    </Card>
  );
}
