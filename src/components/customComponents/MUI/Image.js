import React from "react";

const Image = ({ label, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input accept="image/*" type="file" onChange={onChange} multiple={true} />
    </div>
  );
};

export default Image;
