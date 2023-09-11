/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Link, Rating } from "@mui/material";

const HomeBuildingCard = ({ reduxDataVar }) => {
  const dataVar = reduxDataVar;
  return (
    <>
      {
        <div data-wow-delay=".2s">
          <Link href={`/shop/${dataVar?._id}`}>
            <div className="relative">
              <a>
                <div className="product-img">
                  <img
                    className="object-fit translate-y-[-10px] xs:w-full  mt-[-31px] h-[190px] w-[280px] hover:w-[100%] rounded-tl-[4px] rounded-tr-[4px]"
                    src={
                      dataVar?.images?.length !== 0
                        ? dataVar?.thumbnails?.[0]
                        : "https://testerp1apis.nextsolutions.in/uploads/A329A-SL1/IMG_20221010_155607_00_merged.jpg"
                    }
                    alt="Product Image"
                  />
                </div>
                {dataVar && dataVar?.images && (
                  <div className="absolute top-3 right-4 ">
                    <img
                      src="/assets/imgs/icons/360-degrees.png"
                      alt="360-degrees icon"
                      className="w-[35px] h-[35px]"
                    />
                  </div>
                )}
              </a>
            </div>
          </Link>
          <div className="product-info px-2 pt-[10px] w-100">
            <Link href={`/shop/${dataVar?._id}`}>
              <a>
                <h3 className="text-body-lead color-gray-700  text-center">
                  {dataVar?.title}
                </h3>
              </a>
            </Link>
            <div className="d-flex mt-[0px]  justify-center pt-2 whitespace-normal px-2 ">
              <div className="box-prices">
                <span className=" font-medium  ">{dataVar?.sectorNumber}</span>
              </div>
            </div>
            <div>
              <div className="text-body-text icon-with-text dataVar-info color-gray-500  px-2 flex justify-center">
                <div className="flex items-center w-full ">
                  <img
                    className="propicon-2 mr-[8px] translate-y-[-1px]"
                    src="/assets/imgs/icons/home.svg"
                    alt="Builder Floor"
                  />
                  <span className="text-[13px]">{dataVar?.accommodation}</span>
                </div>
                <div className="flex items-center w-full  ">
                  <img
                    className="propicon-2 mr-[8px] translate-y-[-1px]"
                    src="/assets/imgs/page/homepage5/floor.svg"
                    alt="Builder Floor"
                  />
                  <span className="text-[13px]">{dataVar?.floor}</span>
                </div>
                <div className="flex items-center w-full ">
                  <img
                    className="propicon-2 mr-[8px] translate-y-[-1px]"
                    src="/assets/imgs/icons/area-svg.svg"
                    alt="Builder Floor"
                  />
                  <span className="text-[13px]">{dataVar?.size} Sq.Yd.</span>
                </div>
              </div>
              <div className="flex justify-between px-2 items-center">
                <div>
                  <Rating value={5} readOnly size="medium" />
                </div>
                <div>
                  <button
                    type=""
                    className="mt-1 px-3 py-2 font-medium bg-[#006D77] text-[#fff] rounded-lg"
                  >{`₹
                  
                            ${parseFloat(dataVar?.price)
                              .toExponential()
                              .toString()
                              .split("e")[0]
                              .slice(0, 4)}
                            Cr.`}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default HomeBuildingCard;
