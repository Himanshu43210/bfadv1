export const generatePropertyUrl = (property, floor, possession, price) => {
  return `/${property?.title?.replaceAll(
    " ",
    "_"
  )}-${property?.sectorNumber?.replaceAll(" ", "_")}-${
    property?.size
  }SQYD-${floor?.replaceAll(" ", "_")}-${property?.accommodation?.replaceAll(
    " ",
    "_"
  )}-${property?.facing}_FACING-${
    property?.parkFacing === "YES" ? "park-" : ""
  }${property?.corner === "YES" ? "corner-" : ""}${possession}-${price}-${
    property?._id
  }`;
};
