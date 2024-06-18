import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const ListingForm = ({ ...props }) => {
  const [showSecondFloor, setShowSecondFloor] = useState(false);
  const [showThirdFloor, setShowThirdFloor] = useState(false);
  const [showFourthFloor, setShowFourthFloor] = useState(false);
  const [masterData, setMasterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setData] = useState({
    sectorNumber: "",
    plotNumber: "",
    accommodation: "",
    builderContact: "",
    builderName: "",
    city: "",
    contactId: "",
    corner: "",
    description: "",
    detailTitle: "",
    facing: "",
    needApprovalBy: "64e867d86a2061a0973a9a6c",
    parkFacing: "",
    size: "",
    state: "",
    title: "",
    possessionForFloorOne: "",
    priceForFloorOne: 0,
    possessionForFloorTwo: "",
    priceForFloorTwo: 0,
    possessionForFloorThree: "",
    priceForFloorThree: 0,
    possessionForFloorFour: "",
    priceForFloorFour: 0,
    thumbnailFile: "",
    normalImageFile: "",
    threeSixtyImages: "",
    layoutFile: "",
    videoFile: "",
    virtualFile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      let value = {
        ...formData,
      };
      if (value?.possessionForFloorOne?.length > 0) {
        value = {
          ...value,
          floor1: {
            floor: "1ST FLOOR",
            possession: value.possessionForFloorOne,
            price: value.priceForFloorOne,
          },
        };
      }
      if (value?.possessionForFloorTwo?.length > 0) {
        value = {
          ...value,
          floor2: {
            floor: "2ND FLOOR",
            possession: value.possessionForFloorTwo,
            price: value.priceForFloorTwo,
          },
        };
      }
      if (value?.possessionForFloorThree?.length > 0) {
        value = {
          ...value,
          floor3: {
            floor: "3RD FLOOR",
            possession: value.possessionForFloorThree,
            price: value.priceForFloorThree,
          },
        };
      }
      if (value?.possessionForFloorFour?.length > 0) {
        value = {
          ...value,
          floor4: {
            floor: "4TH FLOOR",
            possession: value.possessionForFloorFour,
            price: value.priceForFloorFour,
          },
        };
      }
      delete value.possessionForFloorOne;
      delete value.priceForFloorOne;
      delete value.possessionForFloorTwo;
      delete value.priceForFloorTwo;
      delete value.possessionForFloorThree;
      delete value.priceForFloorThree;
      delete value.possessionForFloorFour;
      delete value.priceForFloorFour;

      const bodyFormData = new FormData();
      for (const key in value) {
        bodyFormData.append(key, value[key]);
      }
      const response = await axios.post(
        "https://bfservices.trainright.fit/api/properties/v2/editProperty",
        value
      );
      console.log("Data submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://bfservices.trainright.fit/api/masters/getMasterDataOnHome"
      );
      setMasterData(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-10 flex-wrap">
        {" "}
        <label className="flex items-center gap-2">
          State:
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          >
            <option value="">Select State</option>
            {masterData?.state?.map((state, index) => (
              <option key={index} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          City:
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          >
            <option value="">Select City</option>
            {masterData?.city?.map((city, index) => (
              <option key={index} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          Location:
          <select
            name="sectorNumber"
            value={formData.location}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          >
            <option value="">Select Location</option>
            {masterData?.sectorNumber.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          Plot Number:
          <input
            type="text"
            name="plotNumber"
            value={formData.plotNumber}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          />
        </label>
        <label className="flex items-center gap-2">
          Size:
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          />
        </label>
        <label className="flex items-center gap-2">
          Accommodation:
          <select
            name="accommodation"
            value={formData.accommodation}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          >
            <option value="">Select Accommodation</option>
            {masterData?.accommodation.map((accommodation, index) => (
              <option key={index} value={accommodation.value}>
                {accommodation.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          Facing:
          <select
            name="facing"
            value={formData.facing}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          >
            <option value="">Select Facing</option>
            {masterData?.facing?.map((facing, index) => (
              <option key={index} value={facing.value}>
                {facing.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-2">
          Park Facing:
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="parkFacing"
              value="YES"
              checked={formData.parkFacing === "YES"}
              onChange={handleChange}
            />
            YES
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="parkFacing"
              value="NO"
              checked={formData.parkFacing === "NO"}
              onChange={handleChange}
            />
            NO
          </label>
        </div>
        <div className="flex items-center gap-2">
          Corner:
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="corner"
              value="YES"
              checked={formData.corner === "YES"}
              onChange={handleChange}
            />
            YES
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="corner"
              value="NO"
              checked={formData.corner === "NO"}
              onChange={handleChange}
            />
            NO
          </label>
        </div>
        <label className="flex items-center gap-2">
          Builder Name:
          <input
            type="text"
            name="builderName"
            value={formData.builderName}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          />
        </label>
        <label className="flex items-center gap-2">
          Builder Contact:
          <input
            type="text"
            name="builderContact"
            value={formData.builderContact}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          />
        </label>
        <label className="flex items-center gap-2">
          Owner Contact:
          <input
            type="text"
            name="contactId"
            value={formData.contactId}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          />
        </label>
        <label className="flex items-center gap-2">
          Title:
          {/* <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          /> */}
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          >
            <option value="">Select Title</option>
            {masterData?.title?.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          Secondary Title:
          <input
            type="text"
            name="detailTitle"
            value={formData.detailTitle}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          />
        </label>
      </div>
      <label className="flex items-start gap-2 my-10">
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 outline-none rounded-sm w-[90vh] h-36"
        />
      </label>
      <div className="">
        <h3 className="text-xl font-bold">Add Floor One</h3>
        <div className="flex gap-12 items-center">
          <label className="flex items-start gap-2 my-2">
            Possession:
            <select
              name="possessionForFloorOne"
              value={formData.possessionForFloorOne}
              onChange={handleChange}
              className="border-b border-gray-300 outline-none"
            >
              <option value="">Select Possession</option>
              {masterData?.possession.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-start gap-2">
            Price:
            <input
              type="text"
              name="priceForFloorOne"
              value={formData.priceForFloorOne}
              onChange={handleChange}
              className="border-b border-gray-300 outline-none"
            />
          </label>
          <button
            type="button"
            onClick={() => setShowSecondFloor(!showSecondFloor)}
            className="text-blue-600 underline"
          >
            {showSecondFloor ? "Hide Second Floor" : "Add Second Floor"}
          </button>
        </div>
      </div>
      {showSecondFloor && (
        <div>
          <h3 className="text-xl font-bold">Add Floor Two</h3>
          <div className="flex gap-12 items-center">
            <label className="flex items-start gap-2 my-2">
              Possession :
              <select
                name="possessionForFloorTwo"
                value={formData.possessionForFloorTwo}
                onChange={handleChange}
                className="border-b border-gray-300 outline-none"
              >
                <option value="">Select Possession</option>
                {masterData?.possession.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-start gap-2 my-2">
              Price:
              <input
                type="text"
                name="priceForFloorTwo"
                value={formData.priceForFloorTwo}
                onChange={handleChange}
                className="border-b border-gray-300 outline-none"
              />
            </label>
            <button
              type="button"
              onClick={() => setShowThirdFloor(!showThirdFloor)}
              className="text-blue-600 underline"
            >
              {showThirdFloor ? "Hide Third Floor" : "Add Third Floor"}
            </button>
          </div>
        </div>
      )}
      {showThirdFloor && (
        <div>
          <h3 className="text-xl font-bold">Add Floor Three</h3>
          <div>
            <div className="flex gap-12 items-center">
              <label className="flex items-start gap-2 my-2">
                Possession :
                <select
                  name="possessionForFloorThree"
                  value={formData.possessionForFloorThree}
                  onChange={handleChange}
                  className="border-b border-gray-300 outline-none"
                >
                  <option value="">Select Possession</option>
                  {masterData?.possession.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-start gap-2 my-2">
                Price:
                <input
                  type="text"
                  name="priceForFloorThree"
                  value={formData.priceForFloorThree}
                  onChange={handleChange}
                  className="border-b border-gray-300 outline-none"
                />
              </label>
              <button
                type="button"
                onClick={() => setShowFourthFloor(!showFourthFloor)}
                className="text-blue-600 underline"
              >
                {showFourthFloor ? "Hide Fourth Floor" : "Add Fourth Floor"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showFourthFloor && (
        <div>
          <h3 className="text-xl font-bold">Add Floor Four</h3>
          <div className="flex gap-12 items-center">
            <label className="flex items-start gap-2 my-2">
              Possession :
              <select
                name="possessionForFloorFour"
                value={formData.possessionForFloorFour}
                onChange={handleChange}
                className="border-b border-gray-300 outline-none"
              >
                <option value="">Select Possession</option>
                {masterData?.possession.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-start gap-2 my-2">
              Price:
              <input
                type="text"
                name="priceForFloorFour"
                value={formData.priceForFloorFour}
                onChange={handleChange}
                className="border-b border-gray-300 outline-none"
              />
            </label>
          </div>
        </div>
      )}
      <div className="flex items-center flex-wrap  mt-10">
        {" "}
        <div className="flex items-center gap-4">
          <label htmlFor="thumbnailFile" className="w-96">
            Please Add Thumbnail Image:
          </label>
          <input
            type="file"
            name="thumbnailFile"
            id="thumbnailFile"
            onChange={handleChange}
            className="w-full m-1 px-1 my-4"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="normalImageFile" className="w-96 ">
            Please Add Normal Image:
          </label>
          <input
            type="file"
            name="normalImageFile"
            id="normalImageFile"
            onChange={handleChange}
            className="w-full m-1 px-1 my-4"
          />
        </div>
        {/* <div className="flex items-center gap-4">
          <label htmlFor="threeSixtyImages" className="w-96 ">
            Please Add 360 Image:
          </label>
          <input
            type="file"
            name="threeSixtyImages"
            id="threeSixtyImages"
            onChange={handleChange}
            className="w-full m-1 px-1 my-4"
          />
        </div> */}
        <div className="flex items-center gap-4">
          <label htmlFor="layoutFile" className="w-96 ">
            Please Add Layout Image:
          </label>
          <input
            type="file"
            name="layoutFile"
            id="layoutFile"
            onChange={handleChange}
            className="w-full m-1 px-1 my-4"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="videoFile" className="w-96 ">
            Please Add Video File:
          </label>
          <input
            type="file"
            name="videoFile"
            id="videoFile"
            onChange={handleChange}
            className="w-full m-1 px-1 my-4"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="virtualFile" className="w-96 ">
            Please Add Virtual Image:
          </label>
          <input
            type="file"
            name="virtualFile"
            id="virtualFile"
            onChange={handleChange}
            className="w-full m-1 px-1 my-4"
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button
          className={`ol_open_btn signin_btn mt-10`}
          onClick={handleSubmit}
          variant="success"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ListingForm;
