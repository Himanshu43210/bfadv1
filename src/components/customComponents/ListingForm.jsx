import React, { useState } from "react";
// import FormLayout from "./FormLayout";
import Select from "./MUI/Select";
import { TextField } from "@mui/material";
import Switch from "./MUI/Switch";
import Autocomplete from "./MUI/Autocomplete";
import PriceBox from "./MUI/PriceBox";
import Image from "./MUI/Image";
import { Button } from "react-bootstrap";
import axios from "axios";
export const getFields = ({ formProps, list }) => {
  return [
    {
      span: 1,
      fullWidth: true,
      name: "state",
      label: "State",
      type: "select",
      Component: Select,
    },
    {
      span: 1,
      fullWidth: true,
      name: "city",
      label: "City",
      type: "select",
      variant: "outlined",
      Component: Select,
    },
    {
      span: 1,
      name: "sectorNumber",
      fullWidth: true,
      label: "Location",
      type: "select",
      variant: "outlined",
      Component: Select,
    },
    {
      span: 1,
      name: "plotNumber",
      fullWidth: true,
      label: "Plot Number",
      type: "select",
      variant: "standard",
      Component: TextField,
    },
    // {
    //   span: 1,
    //   name: "size",
    //   label: "Plot Number",
    //   fullWidth: true,
    //   type: "select",
    //   variant: "standard",
    //   Component: TextField,
    // },
    {
      span: 1,
      name: "accommodation",
      label: "Accommodation",
      type: "select",
      variant: "outlined",
      fullWidth: true,
      Component: Select,
    },
    {
      span: 1,
      name: "facing",
      label: "Facing",
      type: "select",
      variant: "outlined",
      fullWidth: true,
      Component: Select,
    },
    {
      span: 1.5 / 3,
      name: "parkFacing",
      label: "Park Facing",
      fullWidth: true,
      Component: Switch,
    },
    {
      span: 1.5 / 3,
      name: "corner",
      label: "Corner",
      fullWidth: true,
      Component: Switch,
    },
    {
      span: 2,
      Component: function () {
        return <></>;
      },
    },
    {
      span: 1,
      name: "builderName",
      label: "Builder Name",
      type: "select",
      fullWidth: true,
      variant: "standard",
      Component: TextField,
    },
    {
      span: 1,
      name: "builderContact",
      label: "Builder Contact",
      type: "number",
      variant: "standard",
      fullWidth: true,
      Component: TextField,
    },
    {
      span: 1,
      name: "ownerContact",
      label: "Owner Contact",
      type: "number",
      variant: "standard",
      fullWidth: true,
      Component: TextField,
    },
    {
      span: 1,
      name: "title",
      label: "Primary Title",
      type: "select",
      variant: "outlined",
      fullWidth: true,
      Component: Select,
    },
    {
      span: 1,
      name: "detailTitle",
      label: "Secondary Title",
      type: "select",
      variant: "standard",
      fullWidth: true,
      Component: TextField,
    },
    {
      span: 3,
      name: "description",
      label: "Description",
      type: "select",
      variant: "outlined",
      fullWidth: true,
      Component: TextField,
      multiline: true,
      rows: 6,
    },
    {
      span: 1,
      name: "floorOne",
      label: "Floor",
      type: "select",
      variant: "outlined",
      fullWidth: true,
      Component: Select,
    },
    {
      span: 1,
      name: "floorOnePrice",
      label: "Price",
      type: "number",
      variant: "outlined",
      fullWidth: true,
      Component: PriceBox,
    },
    {
      span: 1,
      name: "floorOne",
      label: "Possession",
      type: "select",
      variant: "outlined",
      fullWidth: true,
      fullWidth: true,
      Component: Select,
    },
    {
      span: 1,
      name: "floor2.floor",
      label: "Floor",
      type: "select",
      variant: "outlined",
      fullWidth: true,
      Component: Select,
    },
    {
      span: 1,
      name: "floor2.price",
      label: "Price",
      type: "number",
      variant: "outlined",
      fullWidth: true,
      Component: PriceBox,
    },
    {
      span: 1,
      name: "floor2.possession",
      label: "Possession",
      type: "select",
      variant: "outlined",
      fullWidth: true,
      fullWidth: true,
      Component: Select,
    },
    {
      span: 1,
      name: "floor3.floor",
      label: "Floor",
      type: "select",
      variant: "outlined",
      fullWidth: true,
      Component: Select,
    },
    {
      span: 1,
      name: "floor3.price",
      label: "Price",
      type: "number",
      variant: "outlined",
      fullWidth: true,
      Component: PriceBox,
    },
    {
      span: 1,
      name: "floor3.possession",
      label: "Possession",
      type: "select",
      variant: "outlined",
      fullWidth: true,
      fullWidth: true,
      Component: Select,
    },
    {
      span: 1,
      name: "floor4.floor",
      label: "Floor",
      type: "select",
      variant: "outlined",
      fullWidth: true,
      Component: Select,
    },
    {
      span: 1,
      name: "floor4.price",
      label: "Price",
      type: "number",
      variant: "outlined",
      fullWidth: true,
      Component: PriceBox,
    },
    {
      span: 1,
      name: "floor4.possession",
      label: "Possession",
      type: "select",
      variant: "outlined",
      fullWidth: true,
      fullWidth: true,
      Component: Select,
    },
    {
      span: 1,
      name: "thumbnailFile",
      label: "Front (Main) Image",
      Component: Image,
    },
    {
      span: 1,
      name: "normalImageFile",
      label: "More (Normal) Images",
      Component: Image,
    },
    {
      span: 1,
      name: "threeSixtyImages",
      label: "Only 360 Images",
      Component: Image,
    },
    {
      span: 1,
      name: "layoutFile",
      label: "Layout Plan",
      Component: Image,
    },
    {
      span: 1,
      name: "videoFile",
      label: "Load Videos",
      Component: Image,
    },
    {
      span: 1,
      name: "virtualFile",
      label: "Load Virtual Tour",
      Component: Image,
    },
  ];
};
const ListingForm = ({ ...props }) => {
  const [states] = useState(["Haryana"]);
  const [cities] = useState(["Gurgaon", "Chandigarh"]);
  const [facings] = useState([
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West",
    "Center",
  ]);
  const [accommodations] = useState(["1BHK", "2BHK", "3BHK", "4BHK", "5BHK"]);
  const [possessionOptions] = useState([
    "Ready",
    "1 month",
    "3 months",
    "6 months",
    "12 months",
  ]);
  const [showSecondFloor, setShowSecondFloor] = useState(false);

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
    needApprovalBy: "",
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      } else if (value?.possessionForFloorTwo?.length > 0) {
        value = {
          ...value,
          floor2: {
            floor: "2ND FLOOR",
            possession: value.possessionForFloorTwo,
            price: value.priceForFloorTwo,
          },
        };
      } else if (value?.possessionForFloorThree?.length > 0) {
        value = {
          ...value,
          floor3: {
            floor: "3RD FLOOR",
            possession: value.possessionForFloorThree,
            price: value.priceForFloorThree,
          },
        };
      } else if (value?.possessionForFloorFour?.length > 0) {
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

      // const formData = new FormData();
      //     for (const key in value) {
      //       formData.append(key, value[key]);
      //     }

      console.log(value, "arijit");

      return;
      const response = await axios.post(
        "https://bfservices.trainright.fit/api/properties/v2/createAndUpdateProperty",
        value
      );
      console.log("Data submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-10 flex-wrap"
    >
      <label className="flex items-center gap-2">
        State:
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="border-b border-gray-300 outline-none"
        >
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
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
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
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
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
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
          {accommodations.map((accommodation, index) => (
            <option key={index} value={accommodation}>
              {accommodation}
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
          {facings.map((facing, index) => (
            <option key={index} value={facing}>
              {facing}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2">
        Park Facing:
        <input
          type="checkbox"
          name="parkFacing"
          checked={formData.parkFacing}
          onChange={handleChange}
        />
      </label>
      <label className="flex items-center gap-2">
        Corner:
        <input
          type="checkbox"
          name="corner"
          checked={formData.corner}
          onChange={handleChange}
        />
      </label>
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
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border-b border-gray-300 outline-none"
        />
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
      <label className="flex items-start gap-2">
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 outline-none rounded-sm w-[100vh] h-36"
        />
      </label>
      <div className="flex gap-12 justify-between items-center">
        <h3>Floor One</h3>
        <label className="flex items-start gap-2">
          Possession:
          <select
            name="possessionForFloorOne"
            value={formData.possessionForFloorOne}
            onChange={handleChange}
            className="border-b border-gray-300 outline-none"
          >
            <option value="">Select Possession</option>
            {possessionOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
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
      {showSecondFloor && (
        <div className="flex gap-12 justify-between items-center">
          <h3>Floor Two</h3>
          <label className="">
            Possession :
            <select
              name="possession"
              value={formData.possessionForFloorTwo}
              onChange={handleChange}
              className="border-b border-gray-300 outline-none"
            >
              <option value="">Select Possession</option>
              {possessionOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="">
            Price:
            <input
              type="text"
              name="price"
              value={formData.priceForFloorTwo}
              onChange={handleChange}
              className="border-b border-gray-300 outline-none"
            />
          </label>
        </div>
      )}
      <Button
        className={`ol_open_btn signin_btn`}
        onClick={handleSubmit}
        variant="success"
      >
        Submit
      </Button>
    </form>
  );
};

export default ListingForm;
